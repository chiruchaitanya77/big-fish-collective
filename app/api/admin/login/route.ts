import { authenticateAdmin, adminSessionCookie, createAdminSession } from "@/lib/admin-auth";
import { noStoreJson, validAdminOrigin } from "@/lib/admin-request";
import { getRawDb } from "@/db";
import { rateLimit } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!validAdminOrigin(request)) return noStoreJson({ error: "Invalid sign-in request." }, 403);
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") return noStoreJson({ error: "Invalid sign-in request." }, 415);
  let body: { email?: unknown; password?: unknown };
  try { body = await request.json(); } catch { return noStoreJson({ error: "Invalid sign-in request." }, 400); }
  if (typeof body.email !== "string" || typeof body.password !== "string" || body.email.length > 254 || body.password.length > 512) {
    return noStoreJson({ error: "Invalid email or password." }, 400);
  }
  try {
    await rateLimit(getRawDb(), "admin-login", request.headers.get("cf-connecting-ip") || "unknown", 8, 900);
  } catch {
    return noStoreJson({ error: "Too many sign-in attempts. Please try again later." }, 429);
  }
  const user = await authenticateAdmin(body.email, body.password);
  if (!user) return noStoreJson({ error: "Invalid email or password." }, 401);
  const session = await createAdminSession(user);
  const response = noStoreJson({ ok: true, role: user.role });
  response.headers.append("Set-Cookie", adminSessionCookie(session.token, session.expiresAt));
  return response;
}
