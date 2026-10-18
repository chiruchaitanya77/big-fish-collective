import type { z } from "zod";
import type { enquirySchema } from "./enquiry-schema";
type EmailConfig = {
  RESEND_API_KEY?: string;
  ENQUIRY_FROM_EMAIL?: string;
  ENQUIRY_TO_EMAIL?: string;
};
export type EnquiryStatus = "in_review" | "closed";

export type StatusEmail = { subject: string; text: string; html: string };

const emailLogo =
  "https://res.cloudinary.com/dodwea2yd/image/upload/v1792315763/big-fish-collective-logo_uq3snb.png";

const socialLinks = [
  [
    "YouTube",
    "https://www.youtube.com/@bigfishcollective",
    "https://res.cloudinary.com/dodwea2yd/image/upload/v1792316017/youtube_xjr04t.svg",
  ],
  [
    "X",
    "https://x.com/bigfishcollective",
    "https://res.cloudinary.com/dodwea2yd/image/upload/v1792316891/x_icxkkj.svg",
  ],
  [
    "WhatsApp",
    "https://wa.me/?text=Hello%20Big%20Fish%20Collective",
    "https://res.cloudinary.com/dodwea2yd/image/upload/v1792316016/whatsapp_cjx2us.svg",
  ],
  [
    "LinkedIn",
    "https://www.linkedin.com/company/big-fish-collective/",
    "https://res.cloudinary.com/dodwea2yd/image/upload/v1792316015/linkedin_tk8qli.svg",
  ],
  [
    "Instagram",
    "https://www.instagram.com/bigfishcollective/",
    "https://res.cloudinary.com/dodwea2yd/image/upload/v1792316514/instagram_kmvur1.svg",
  ],
  [
    "Facebook",
    "https://www.facebook.com/bigfishcollective/",
    "https://res.cloudinary.com/dodwea2yd/image/upload/v1792316015/facebook_eruvhl.svg",
  ],
] as const;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] || character,
  );
}

export function enquiryContext(kind: "talent" | "partner") {
  return kind === "talent"
    ? "seeking to join the collective"
    : "seeking talent for a production";
}

export function buildStatusEmail(
  value: {
    kind: "talent" | "partner";
    name: string;
    email: string;
    submissionId: string;
  },
  status: EnquiryStatus,
): StatusEmail {
  const subject =
    status === "in_review"
      ? `Big Fish Collective - We’re reviewing your ${value.kind === "talent" ? "application" : "project brief"}`
      : `Big Fish Collective - Your enquiry has been closed`;
  const text =
    status === "in_review"
      ? [
          `Hi ${value.name},`,
          "",
          `Thank you for ${enquiryContext(value.kind)} with Big Fish Collective. Our team is now reviewing the details you shared and will follow up by email.`,
          "",
          "There is nothing else you need to do right now. We’ll be in touch as soon as we have an update.",
          "",
          "Warmly,",
          "Big Fish Collective",
        ].join("\n")
      : [
          `Hi ${value.name},`,
          "",
          `Thank you for getting in touch about ${value.kind === "talent" ? "joining the collective" : "your production brief"}. We’re closing this enquiry for now.`,
          "",
          "If your plans change or you have a new brief, you’re welcome to contact us again with the latest details.",
          "",
          "Warmly,",
          "Team Big Fish Collective",
        ].join("\n");
  const safeName = escapeHtml(value.name);
  const isReview = status === "in_review";
  const heading = isReview
    ? "Your enquiry is being reviewed"
    : "Your enquiry has been closed";
  const intro = isReview
    ? `Thank you for ${enquiryContext(value.kind)} with Big Fish Collective. Our team is now reviewing the details you shared and will follow up by email.`
    : `Thank you for getting in touch about ${value.kind === "talent" ? "joining the collective" : "your production brief"}. We’re closing this enquiry for now.`;
  const next = isReview
    ? "There is nothing else you need to do right now. We’ll be in touch as soon as we have an update."
    : "If your plans change or you have a new brief, you’re welcome to contact us again with the latest details.";
  const socialMarkup = socialLinks
    .map(
      ([label, href, icon]) =>
        `<a href="${href}" aria-label="${label}" style="display:inline-block;margin:0 10px;text-decoration:none;"><img src="${icon}" width="22" height="22" alt="${label}" style="display:block;width:22px;height:22px;border:0;" /></a>`,
    )
    .join("");
  const html = `
    <!doctype html>
      <html>
        <body style="margin:0;background:#eeeeeb;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eeeeeb;">
            <tr>
              <td align="center" style="padding:28px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#000000;">
                  <tr>
                    <td style="background:#ffffff;padding:20px 28px;text-align:center;">
                      <img src="${emailLogo}" alt="Big Fish Collective" width="120" style="display:block;width:120px;max-width:72%;height:auto;margin:0 auto;border:0;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:42px 38px 38px;background:#000000;color:#ffffff;">
                      <h1 style="margin:0 0 22px;color:#ffffff;font-size:32px;line-height:1.08;font-weight:700;letter-spacing:-1px;">${heading}</h1>
                      <p style="margin:0 0 18px;color:#ffffff;font-size:16px;line-height:1.65;">Hi ${safeName},</p>
                      <p style="margin:0 0 18px;color:#ffffff;font-size:16px;line-height:1.65;">${intro}</p>
                      <p style="margin:0 0 30px;color:#ffffff;font-size:16px;line-height:1.65;">${next}</p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #373737;">
                        <tr>
                          <td style="padding-top:22px;color:#ffffff;font-size:15px;line-height:1.5;">Warmly,<br /><strong>Big Fish Collective</strong>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#000000;border-top:1px solid #373737;padding:22px 20px 28px;text-align:center;">
                      <div>${socialMarkup}</div>
                      <p style="margin:17px 0 0;color:#8f938d;font-size:11px;line-height:1.5;">Talent representation, casting and creative production partnerships.<br />Hyderabad · India · Worldwide</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`;
  return { subject, text, html };
}

export async function sendEnquiryEmail(
  value: z.infer<typeof enquirySchema>,
  config: EmailConfig,
  send: typeof fetch = fetch,
) {
  if (
    !config.RESEND_API_KEY ||
    !config.ENQUIRY_FROM_EMAIL ||
    !config.ENQUIRY_TO_EMAIL
  )
    return "not_configured";
  const text = [
    `New ${value.kind === "talent" ? "talent application" : "project brief"}`,
    `Reference: ${value.submissionId}`,
    `Name: ${value.name}`,
    `Email: ${value.email}`,
    `Phone: ${value.phone || "Not supplied"}`,
    `Company / representation: ${value.company || "Not supplied"}`,
    `Location: ${value.location}`,
    `Category: ${value.category}`,
    `Links: ${value.links || "Not supplied"}`,
    "",
    value.message,
  ].join("\n");
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(6000),
        headers: {
          Authorization: `Bearer ${config.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `enquiry-${value.submissionId}`,
        },
        body: JSON.stringify({
          from: config.ENQUIRY_FROM_EMAIL,
          to: [config.ENQUIRY_TO_EMAIL],
          reply_to: value.email,
          subject: `Big Fish Collective - ${value.kind === "talent" ? "Talent application" : "Project brief"}`,
          text,
        }),
      });
      if (response.ok) return "sent";
      if (response.status < 500) break;
    } catch {
      /* Retry once with the same provider idempotency key. */
    }
  }
  console.error("Enquiry notification failed", {
    reference: value.submissionId,
  });
  return "failed";
}

export async function sendEnquiryStatusEmail(
  value: {
    kind: "talent" | "partner";
    name: string;
    email: string;
    submissionId: string;
  },
  status: EnquiryStatus,
  config: EmailConfig,
  send: typeof fetch = fetch,
) {
  if (!config.RESEND_API_KEY || !config.ENQUIRY_FROM_EMAIL)
    return "not_configured";
  const template = buildStatusEmail(value, status);
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(6000),
      headers: {
        Authorization: `Bearer ${config.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `enquiry-status-${value.submissionId}-${status}`,
      },
      body: JSON.stringify({
        from: config.ENQUIRY_FROM_EMAIL,
        to: [value.email],
        reply_to: config.ENQUIRY_TO_EMAIL || config.ENQUIRY_FROM_EMAIL,
        subject: template.subject,
        text: template.text,
        html: template.html,
      }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
