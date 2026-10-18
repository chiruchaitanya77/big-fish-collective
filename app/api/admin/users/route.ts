import { getRawDb } from "@/db";
import { writeAudit } from "@/lib/admin-auth";
import { noStoreJson, requireAdminApi, validAdminOrigin } from "@/lib/admin-request";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = ["admin", "super_admin"] as const;

export async function GET(request: Request) {
  const user = await requireAdminApi(request, true);
  if (user instanceof Response) return user;
  const rows = await getRawDb().prepare("SELECT id, name, email, role, active, last_login_at AS lastLoginAt, created_at AS createdAt FROM admin_users ORDER BY role DESC, created_at ASC").all();
  return noStoreJson({ users: rows.results });
}

export async function POST(request: Request) {
  if (!validAdminOrigin(request)) return noStoreJson({ error: "Invalid account request." }, 403);
  const actor = await requireAdminApi(request, true);
  if (actor instanceof Response) return actor;
  let body: { name?: unknown; email?: unknown; password?: unknown; role?: unknown };
  try { body = await request.json(); } catch { return noStoreJson({ error: "Invalid account details." }, 400); }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = body.role;
  if (!name || name.length > 100 || !emailPattern.test(email) || password.length < 16 || password.length > 512 || !roles.includes(role as (typeof roles)[number])) {
    return noStoreJson({ error: "Use a name, a valid email, a 16+ character password, and a valid role." }, 400);
  }
  const bytes = new Uint8Array(24); crypto.getRandomValues(bytes);
  const salt = btoa(String.fromCharCode(...bytes));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: 100_000 }, key, 256);
  const hash = Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
  try {
    const created = await getRawDb().prepare(`INSERT INTO admin_users (name, email, role, password_hash, password_salt, active)
      VALUES (?, ?, ?, ?, ?, 1) RETURNING id, name, email, role, active`).bind(name, email, role, hash, salt).first();
    await writeAudit(actor.id, "admin_created", email, String(role));
    return noStoreJson({ user: created }, 201);
  } catch {
    return noStoreJson({ error: "An account with that email already exists." }, 409);
  }
}

export async function PATCH(request: Request) {
  if (!validAdminOrigin(request)) return noStoreJson({ error: "Invalid account request." }, 403);
  const actor = await requireAdminApi(request, true);
  if (actor instanceof Response) return actor;
  let body: { id?: unknown; active?: unknown; role?: unknown };
  try { body = await request.json(); } catch { return noStoreJson({ error: "Invalid account update." }, 400); }
  const id = Number(body.id);
  if (!Number.isSafeInteger(id) || id === actor.id) return noStoreJson({ error: "You cannot change your own account here." }, 400);
  const updates: string[] = [];
  const values: unknown[] = [];
  if (typeof body.active === "boolean") { updates.push("active = ?"); values.push(body.active ? 1 : 0); }
  if (roles.includes(body.role as (typeof roles)[number])) { updates.push("role = ?"); values.push(body.role); }
  if (!updates.length) return noStoreJson({ error: "No valid account change supplied." }, 400);
  const db = getRawDb();
  const target = await db.prepare("SELECT id, email, role FROM admin_users WHERE id = ?").bind(id).first<{ id: number; email: string; role: string }>();
  if (!target) return noStoreJson({ error: "Account not found." }, 404);
  if (target.role === "super_admin" && body.active === false) {
    const activeSuperAdmins = await db.prepare("SELECT COUNT(*) AS count FROM admin_users WHERE role = 'super_admin' AND active = 1").first<{ count: number }>();
    if (Number(activeSuperAdmins?.count || 0) <= 1) return noStoreJson({ error: "Keep at least one active super admin." }, 400);
  }
  values.push(id);
  await db.prepare(`UPDATE admin_users SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).bind(...values).run();
  if (body.active === false) await db.prepare("UPDATE admin_sessions SET revoked_at = CURRENT_TIMESTAMP WHERE user_id = ? AND revoked_at IS NULL").bind(id).run();
  await writeAudit(actor.id, "admin_updated", target.email, JSON.stringify({ active: body.active, role: body.role }));
  return noStoreJson({ ok: true });
}
