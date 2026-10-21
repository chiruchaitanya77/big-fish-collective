import { rateLimit } from "@/lib/request-security";

type OpsConfig = {
  RESEND_API_KEY?: string;
  ENQUIRY_FROM_EMAIL?: string;
  SUPER_ADMIN_EMAIL?: string;
};

/** Sends one deduplicated operational alert per category per 15 minutes. */
export async function notifySuperAdmin(db: D1Database, config: OpsConfig, category: string, message: string) {
  if (!config.RESEND_API_KEY || !config.ENQUIRY_FROM_EMAIL || !config.SUPER_ADMIN_EMAIL) return "not_configured";
  try {
    await rateLimit(db, "super-admin-alert", category, 1, 900);
  } catch {
    return "suppressed";
  }
  const subject = `Big Fish Collective alert — ${category}`;
  const text = [subject, "", message, "", `Time: ${new Date().toISOString()}`].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(6000),
      headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `ops-alert-${category}-${Math.floor(Date.now() / 900_000)}` },
      body: JSON.stringify({ from: config.ENQUIRY_FROM_EMAIL, to: [config.SUPER_ADMIN_EMAIL], subject, text }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
