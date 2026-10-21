import { env } from "cloudflare:workers";
import { getRawDb } from "@/db";
import { enquirySchema } from "@/lib/enquiry-schema";
import { sendApplicantEnquiryEmail, sendEnquiryEmail } from "@/lib/enquiry-email";
import { notifySuperAdmin } from "@/lib/ops-alerts";
import { digest, rateLimit, readJson, requestFailure, validateRequest, RequestError } from "@/lib/request-security";
import { recordEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    validateRequest(request);
    const raw = await readJson(request);
    // Silently discard bots without saving a lead or sending mail.
    if (raw && typeof raw.website === "string" && raw.website.length) return Response.json({ok: true}, {status: 201});
    const payload = enquirySchema.safeParse(raw);
    if (!payload.success) return Response.json({error: "Please check your details and try again.", fields: payload.error.flatten().fieldErrors}, {status: 400});
    const value = payload.data;
    const db = getRawDb();
    const fingerprint = await digest(JSON.stringify({...value, submissionId: undefined}));
    // A lost response can be retried safely without creating another lead.
    const existing = await db.prepare("SELECT payload_hash FROM enquiries WHERE submission_id = ?").bind(value.submissionId).first<{payload_hash: string}>();
    if (existing) {
      if (existing.payload_hash !== fingerprint) throw new RequestError(409, "This submission changed. Please reload the page and try again.");
      return Response.json({ok: true}, {status: 200});
    }
    // CF supplies this address at the edge; never trust a user-supplied X-Forwarded-For.
    await rateLimit(db, "enquiry-ip", request.headers.get("cf-connecting-ip") || "unknown", 10, 900);
    await rateLimit(db, "enquiry-email", value.email, 5, 3600);
    const result = await db.prepare(`INSERT INTO enquiries
      (kind, name, email, phone, company, location, category, links, message, submission_id, payload_hash, notification_status, applicant_notification_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending') ON CONFLICT(submission_id) DO NOTHING RETURNING id`)
      .bind(value.kind, value.name, value.email, value.phone, value.company, value.location, value.category, value.links, value.message, value.submissionId, fingerprint).first();
    if (!result) {
      const raced = await db.prepare("SELECT payload_hash FROM enquiries WHERE submission_id = ?").bind(value.submissionId).first<{payload_hash: string}>();
      if (raced?.payload_hash !== fingerprint) throw new RequestError(409, "This submission changed. Please reload the page and try again.");
    }
    if (result) {
      try {
        await db.prepare("INSERT INTO enquiry_events (enquiry_id, event_type, to_status, email_status) VALUES (?, 'received', 'new', 'not_applicable')")
          .bind(result.id).run();
      } catch { console.error("Unable to record enquiry timeline", {reference: value.submissionId}); }
      // Lead storage succeeds independently of the email provider.
      const [notification, applicantNotification] = await Promise.all([
        sendEnquiryEmail(value, env),
        sendApplicantEnquiryEmail(value, env),
      ]);
      try {
        await db.prepare("UPDATE enquiries SET notification_status = ?, applicant_notification_status = ? WHERE submission_id = ?").bind(notification, applicantNotification, value.submissionId).run();
        await recordEvent(db, `${value.kind}_form_success`, "/contact");
      } catch { console.error("Unable to update enquiry delivery status", {reference: value.submissionId}); }
      if (notification !== "sent" || applicantNotification !== "sent") {
        await notifySuperAdmin(db, env, "email-delivery-failure", `Enquiry ${value.submissionId} was stored, but email delivery statuses were internal=${notification} and applicant=${applicantNotification}.`);
      }
    }
    return Response.json({ok: true, message: "Thank you. Your enquiry has been received."}, {status: 201, headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    try {
      const category = error instanceof RequestError && error.status === 429 ? "enquiry-rate-limit" : "enquiry-api-error";
      await notifySuperAdmin(getRawDb(), env, category, error instanceof Error ? error.message : "Unknown enquiry API failure");
    } catch { /* Alerting must never replace the original request response. */ }
    return requestFailure(error);
  }
}
