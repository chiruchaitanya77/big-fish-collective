import { env } from "cloudflare:workers";
import { getRawDb } from "@/db";

export type AdminRole = "admin" | "super_admin";

export type AdminPrincipal = {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
};

const SESSION_COOKIE = "__Host-bfc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;
const PASSWORD_ITERATIONS = 210_000;

type StoredUser = AdminPrincipal & {
  password_hash: string;
  password_salt: string;
  active: number;
};

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function cookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const prefix = `${name}=`;
  for (const item of cookieHeader.split(";")) {
    const value = item.trim();
    if (value.startsWith(prefix)) return value.slice(prefix.length);
  }
  return null;
}

function normaliseEmail(value: string) {
  return value.trim().toLowerCase();
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function hashValue(value: string) {
  const bytes = new TextEncoder().encode(value);
  return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
}

async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: PASSWORD_ITERATIONS },
    key,
    256,
  );
  return bytesToHex(new Uint8Array(bits));
}

function safeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let different = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    different |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return different === 0;
}

function secureToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function adminSessionCookie(token: string, expiresAt: number) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.max(0, expiresAt - Math.floor(Date.now() / 1000))}`;
}

export function clearAdminSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

/** Seeds only the initial core-developer account. Credentials stay in Worker secrets. */
export async function ensureBootstrapSuperAdmin() {
  const email = env.SUPER_ADMIN_EMAIL ? normaliseEmail(env.SUPER_ADMIN_EMAIL) : "";
  const password = env.SUPER_ADMIN_PASSWORD;
  if (!validEmail(email) || !password || password.length < 16) return;

  const db = getRawDb();
  const existing = await db.prepare("SELECT id FROM admin_users WHERE email = ?").bind(email).first<{ id: number }>();
  if (existing) {
    await db.prepare("UPDATE admin_users SET role = 'super_admin', active = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(existing.id).run();
    return;
  }

  const salt = secureToken();
  const hash = await passwordHash(password, salt);
  await db.prepare(`INSERT INTO admin_users (email, name, role, password_hash, password_salt, active)
    VALUES (?, ?, 'super_admin', ?, ?, 1)`).bind(email, "Core developer", hash, salt).run();
}

export async function authenticateAdmin(emailInput: string, password: string): Promise<AdminPrincipal | null> {
  await ensureBootstrapSuperAdmin();
  const email = normaliseEmail(emailInput);
  if (!validEmail(email) || password.length > 512) return null;
  const db = getRawDb();
  const user = await db.prepare(`SELECT id, email, name, role, password_hash, password_salt, active
    FROM admin_users WHERE email = ?`).bind(email).first<StoredUser>();
  if (!user || !user.active || (user.role !== "admin" && user.role !== "super_admin")) return null;
  const hash = await passwordHash(password, user.password_salt);
  if (!safeEqual(hash, user.password_hash)) return null;
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function createAdminSession(user: AdminPrincipal) {
  const token = secureToken();
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const db = getRawDb();
  await db.batch([
    db.prepare("INSERT INTO admin_sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)").bind(user.id, await hashValue(token), expiresAt),
    db.prepare("UPDATE admin_users SET last_login_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(user.id),
    db.prepare("INSERT INTO admin_audit_log (actor_id, action, target) VALUES (?, 'sign_in', ?)").bind(user.id, user.email),
  ]);
  return { token, expiresAt };
}

export async function getAdminFromToken(token: string | null): Promise<AdminPrincipal | null> {
  if (!token || token.length > 256) return null;
  const db = getRawDb();
  const user = await db.prepare(`SELECT u.id, u.email, u.name, u.role
    FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ? AND s.revoked_at IS NULL AND s.last_seen_at IS NOT NULL AND u.active = 1
    LIMIT 1`).bind(await hashValue(token), Math.floor(Date.now() / 1000)).first<AdminPrincipal>();
  if (!user || (user.role !== "admin" && user.role !== "super_admin")) return null;
  return user;
}

export async function getAdminFromRequest(request: Request) {
  return getAdminFromToken(cookieValue(request.headers.get("cookie"), SESSION_COOKIE));
}

export async function revokeRequestSession(request: Request) {
  const token = cookieValue(request.headers.get("cookie"), SESSION_COOKIE);
  if (!token) return;
  const db = getRawDb();
  await db.prepare("UPDATE admin_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE token_hash = ? AND revoked_at IS NULL")
    .bind(await hashValue(token)).run();
}

export async function writeAudit(actorId: number, action: string, target = "", metadata = "") {
  const db = getRawDb();
  await db.prepare("INSERT INTO admin_audit_log (actor_id, action, target, metadata) VALUES (?, ?, ?, ?)")
    .bind(actorId, action, target.slice(0, 256), metadata.slice(0, 1_000)).run();
}

export function isSuperAdmin(user: AdminPrincipal) {
  return user.role === "super_admin";
}

export function adminCookieName() {
  return SESSION_COOKIE;
}
