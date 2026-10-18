import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminFromToken, adminCookieName } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function safeReturnTo(value: string | undefined) {
  return value && value.startsWith("/") && !value.startsWith("//") && value !== "/admin/login" ? value : "/admin";
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ return_to?: string }> }) {
  const returnTo = safeReturnTo((await searchParams).return_to);
  const token = (await cookies()).get(adminCookieName())?.value || null;
  if (await getAdminFromToken(token)) redirect(returnTo);
  return <main className="admin-auth-shell">
    <section className="admin-login-card">
      <p className="admin-eyebrow">Big Fish Collective</p>
      <h1>Admin access</h1>
      <p>Sign in to review enquiries, conversion signals and visitor trends.</p>
      <AdminLoginForm returnTo={returnTo} />
      <p className="admin-login-note">Access is restricted to staff accounts. Sessions expire automatically after 14 days.</p>
    </section>
  </main>;
}
