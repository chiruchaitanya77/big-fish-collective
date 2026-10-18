import { dashboardData, parseDashboardRange } from "@/lib/admin-data";
import { requireAdminApi } from "@/lib/admin-request";
import { isSuperAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const user = await requireAdminApi(request);
  if (user instanceof Response) return user;
  const range = parseDashboardRange(new URL(request.url).searchParams.get("range") || undefined);
  return Response.json(await dashboardData(range, isSuperAdmin(user)), { headers: { "Cache-Control": "private, max-age=30" } });
}
