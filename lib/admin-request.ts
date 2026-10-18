import { getAdminFromRequest, isSuperAdmin, type AdminPrincipal } from "@/lib/admin-auth";

export async function requireAdminApi(request: Request, superAdminOnly = false): Promise<AdminPrincipal | Response> {
  const user = await getAdminFromRequest(request);
  if (!user) return Response.json({ error: "Your session has expired. Please sign in again." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  if (superAdminOnly && !isSuperAdmin(user)) return Response.json({ error: "Super-admin access is required." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  return user;
}

export function validAdminOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === new URL(request.url).origin && request.headers.get("sec-fetch-site") !== "cross-site");
}

export function noStoreJson(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
