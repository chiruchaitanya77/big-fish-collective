import { env } from "cloudflare:workers";
import { getRawDb } from "@/db";
import { buildStatusEmail, enquiryContext, sendEnquiryStatusEmail, type EnquiryStatus } from "@/lib/enquiry-email";
import { writeAudit } from "@/lib/admin-auth";
import { noStoreJson, requireAdminApi, validAdminOrigin } from "@/lib/admin-request";

const transitions: Record<string, EnquiryStatus | null> = { new: "in_review", in_review: "closed", closed: null };

function enquiryIdFrom(value: string) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function statusContext(status: string) {
  return status === "new" ? "Received" : status === "in_review" ? "Responding" : "Closed";
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireAdminApi(request);
  if (user instanceof Response) return user;
  const id = enquiryIdFrom((await context.params).id);
  if (!id) return noStoreJson({ error: "Invalid enquiry." }, 400);
  const db = getRawDb();
  const enquiry = await db.prepare(`SELECT id, kind, name, email, phone, company, location, category, links, message,
    status, submission_id AS submissionId, notification_status AS notificationStatus, created_at AS createdAt
    FROM enquiries WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!enquiry) return noStoreJson({ error: "Enquiry not found." }, 404);
  let events: { results: unknown[] };
  try {
    events = await db.prepare(`SELECT id, event_type AS eventType, from_status AS fromStatus, to_status AS toStatus,
      actor_id AS actorId, email_subject AS emailSubject, email_text AS emailText, email_status AS emailStatus, created_at AS createdAt
      FROM enquiry_events WHERE enquiry_id = ? ORDER BY created_at ASC, id ASC`).bind(id).all();
  } catch {
    return noStoreJson({ error: "The enquiry timeline migration is not applied yet. Run the production D1 migrations, then reload." }, 503);
  }
  const kind = enquiry.kind === "talent" ? "talent" : "partner";
  const currentStatus = String(enquiry.status);
  const nextStatus = transitions[currentStatus];
  const preview = nextStatus ? buildStatusEmail({ kind, name: String(enquiry.name), email: String(enquiry.email), submissionId: String(enquiry.submissionId || enquiry.id) }, nextStatus) : null;
  const timeline = events.results.length ? events.results : [{ id: 0, eventType: "received", fromStatus: null, toStatus: "new", actorId: null, emailSubject: null, emailText: null, emailStatus: "not_applicable", createdAt: String(enquiry.createdAt) }];
  return noStoreJson({
    enquiry: {
      ...enquiry,
      kindContext: enquiryContext(kind),
      statusContext: statusContext(currentStatus),
      timeline,
      nextStatus,
      nextStatusContext: nextStatus ? statusContext(nextStatus) : null,
      emailPreview: preview,
    },
  });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!validAdminOrigin(request)) return noStoreJson({ error: "Invalid update request." }, 403);
  const user = await requireAdminApi(request);
  if (user instanceof Response) return user;
  const id = enquiryIdFrom((await context.params).id);
  if (!id) return noStoreJson({ error: "Invalid enquiry." }, 400);
  let body: { status?: unknown; expectedStatus?: unknown };
  try { body = await request.json(); } catch { return noStoreJson({ error: "Invalid status update." }, 400); }
  const status = body.status;
  const expectedStatus = body.expectedStatus;
  if ((status !== "in_review" && status !== "closed") || (expectedStatus !== "new" && expectedStatus !== "in_review") || transitions[expectedStatus] !== status) {
    return noStoreJson({ error: "Enquiry statuses can only move forward: new to in review, then closed." }, 409);
  }
  const db = getRawDb();
  const enquiry = await db.prepare(`SELECT id, kind, name, email, submission_id AS submissionId, status
    FROM enquiries WHERE id = ?`).bind(id).first<{ id: number; kind: "talent" | "partner"; name: string; email: string; submissionId: string; status: string }>();
  if (!enquiry) return noStoreJson({ error: "Enquiry not found." }, 404);
  if (enquiry.status !== expectedStatus) return noStoreJson({ error: "This enquiry has already moved forward. Refresh the drawer to see its current status." }, 409);
  try {
    await db.prepare("SELECT 1 FROM enquiry_events LIMIT 1").first();
  } catch {
    return noStoreJson({ error: "The enquiry timeline migration is not applied yet. Run the production D1 migrations before changing status." }, 503);
  }
  const template = buildStatusEmail({ ...enquiry, submissionId: enquiry.submissionId || String(id) }, status);
  const emailStatus = await sendEnquiryStatusEmail({ ...enquiry, submissionId: enquiry.submissionId || String(id) }, status, env);
  if (emailStatus !== "sent") return noStoreJson({ error: "The status was not changed because the confirmation email could not be sent. Check email configuration and try again.", emailStatus }, 503);
  const changed = await db.prepare("UPDATE enquiries SET status = ? WHERE id = ? AND status = ? RETURNING id, status")
    .bind(status, id, expectedStatus).first<{ id: number; status: string }>();
  if (!changed) return noStoreJson({ error: "This enquiry has already moved forward. Refresh the drawer to see its current status." }, 409);
  await db.prepare(`INSERT INTO enquiry_events
    (enquiry_id, event_type, from_status, to_status, actor_id, email_subject, email_text, email_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'sent') RETURNING id`).bind(id, status === "in_review" ? "responding" : "closed", expectedStatus, status, user.id, template.subject, template.text).first<{ id: number }>();
  await writeAudit(user.id, "enquiry_status_changed", String(id), JSON.stringify({ from: expectedStatus, to: status, emailStatus }));
  return noStoreJson({ ok: true, emailStatus, enquiry: changed });
}
