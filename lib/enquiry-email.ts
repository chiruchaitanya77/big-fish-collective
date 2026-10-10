import type { z } from "zod";
import type { enquirySchema } from "./enquiry-schema";
type EmailConfig = { RESEND_API_KEY?: string; ENQUIRY_FROM_EMAIL?: string; ENQUIRY_TO_EMAIL?: string };
export async function sendEnquiryEmail(value: z.infer<typeof enquirySchema>, config: EmailConfig, send: typeof fetch = fetch) {
  if (!config.RESEND_API_KEY || !config.ENQUIRY_FROM_EMAIL || !config.ENQUIRY_TO_EMAIL) return "not_configured";
  const text = [
    `New ${value.kind === "talent" ? "talent application" : "project brief"}`,
    `Reference: ${value.submissionId}`, `Name: ${value.name}`, `Email: ${value.email}`,
    `Phone: ${value.phone || "Not supplied"}`, `Company / representation: ${value.company || "Not supplied"}`,
    `Location: ${value.location}`, `Category: ${value.category}`, `Links: ${value.links || "Not supplied"}`, "", value.message,
  ].join("\n");
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(6000),
        headers: {Authorization: `Bearer ${config.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `enquiry-${value.submissionId}`},
        body: JSON.stringify({from: config.ENQUIRY_FROM_EMAIL, to: [config.ENQUIRY_TO_EMAIL], reply_to: value.email,
          subject: `Big Fish Collective — ${value.kind === "talent" ? "Talent application" : "Project brief"}`, text}),
      });
      if (response.ok) return "sent";
      if (response.status < 500) break;
    } catch { /* Retry once with the same provider idempotency key. */ }
  }
  console.error("Enquiry notification failed", {reference: value.submissionId});
  return "failed";
}
