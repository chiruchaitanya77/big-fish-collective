import { clearAdminSessionCookie, revokeRequestSession } from "@/lib/admin-auth";
import { noStoreJson, validAdminOrigin } from "@/lib/admin-request";

export async function POST(request: Request) {
  if (!validAdminOrigin(request)) return noStoreJson({ error: "Invalid sign-out request." }, 403);
  await revokeRequestSession(request);
  const response = noStoreJson({ ok: true });
  response.headers.append("Set-Cookie", clearAdminSessionCookie());
  return response;
}
