declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY?: string;
    ENQUIRY_FROM_EMAIL?: string;
    ENQUIRY_TO_EMAIL?: string;
    GA_MEASUREMENT_ID?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
