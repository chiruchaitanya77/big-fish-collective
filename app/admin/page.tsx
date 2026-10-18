import { AdminDashboard } from "@/components/admin-dashboard";
import { adminCookieName, getAdminFromToken, isSuperAdmin } from "@/lib/admin-auth";
import { dashboardData, parseDashboardRange } from "@/lib/admin-data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const token = (await cookies()).get(adminCookieName())?.value || null;
  const user = await getAdminFromToken(token);
  if (!user) redirect("/admin/login?return_to=%2Fadmin");
  const range = parseDashboardRange((await searchParams).range);
  const data = await dashboardData(range, isSuperAdmin(user));
  return <AdminDashboard user={user} data={data} />;
}
