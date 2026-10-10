# Big Fish Collective technical implementation

The existing public Site remains on Sites-managed Cloudflare Workers and D1. Its TypeScript, React, Next-compatible Vinext, Tailwind, shadcn components, logo, layout and worldwide positioning are retained. This implements the document's operational requirements without migrating production data or DNS to Vercel/Supabase. Those named platforms are recommended alternatives in the document; a hosting migration remains separate work. Authentication, payments, CMS and uploads remain optional future features.

## Enquiries

Both forms share Zod validation with the server. The API validates the origin, content type, body size while streaming, category, contact details, HTTP(S) links and consent. A honeypot discards automated submissions. Durable atomic limits allow 10 requests per IP per 15 minutes and 5 per email per hour. Rate-limit identities are hashed and expired records are removed on subsequent requests. No raw IP is stored. These basic protections reduce spam; they do not replace a managed bot challenge under sustained attack.

A client submission UUID and unique database constraint prevent duplicate records on retries. The database is written before sending email. Provider failures never discard a received enquiry. Existing records are preserved by additive migrations. No public route exposes enquiry data. Query databases only through authorized hosting administration.

## Activate enquiry emails

In the Site production environment, configure:

- `RESEND_API_KEY` as a secret, using a sending-only key for the verified domain.
- `ENQUIRY_FROM_EMAIL` as an address on the domain verified in Resend.
- `ENQUIRY_TO_EMAIL` as the internal destination mailbox confirmed by the owner.

Redeploy after configuration. Notifications go to this configured internal mailbox, with the applicant's address as Reply-To. They use a stable provider idempotency key and one retry for network/server failures. No automatic emails are sent to applicants. No credentials or recipient mailbox have been configured in this release; email notifications remain inactive until supplied.

`enquiries.notification_status` is `not_configured`, `pending`, `sent` or `failed`. `sent` means the provider accepted the request, not confirmed inbox delivery. There is no background queue or automatic replay of old enquiries. Review failed/pending records through authorized database access; retained records can be followed up manually. After activation, submit one agreed test enquiry and verify delivery in Resend before relying on notifications.

## Analytics

After a visitor chooses Allow analytics, first-party daily aggregate counts record known page paths and predefined CTA/form events in `analytics_daily`. No query strings, form values, email addresses, persistent visitor identifiers or external destinations are collected. Do Not Track is honored. Visitors can change the preference in the footer. Successful submissions are counted on the server as operational totals (including when browser analytics is declined). Analytics counters are approximate, not audited billing data, and include no unique visitor/session metric.

Optional `GA_MEASUREMENT_ID` enables Google Analytics after consent on redeployment. It is a public property ID, not a secret. GA receives predefined event names and clean page URLs only; do not enable automatic form interaction collection or user-provided-data collection in the GA property. No Google property is configured in this release. Form successes are client-reported to GA only after the API succeeds.

Example authorized database reports:

```sql
SELECT day, event, path, count FROM analytics_daily ORDER BY day DESC, event, path;
SELECT id, kind, created_at, notification_status FROM enquiries WHERE notification_status != 'sent' ORDER BY id DESC;
```

## Operations and security

Sites provides HTTPS, source versioning and publication. API errors use bounded, redacted operational logs, with notification reference IDs and no lead contents or API tokens. Error logs are available through Sites diagnostics; Sentry alerting is not connected. Store production secrets in Sites settings, never source files or browser variables. `.env.example` lists names only. Do not export live lead data in source archives.

Use a local environment for development and a separate staging Site/database for integration tests before production releases that affect live integrations. No separate staging Site, GitHub PR workflow, Vercel account, Supabase account or Sentry project was provisioned by this update. The production audience remains public. Any future GitHub or Vercel migration should preserve access rules and move data deliberately.

## Validation

Run `node tests/requirements.test.mjs`, `node node_modules/typescript/bin/tsc --noEmit --incremental false` and the Sites production build helper. Tests use a local SQLite database and mocked email delivery; they send no real messages and do not touch production data.
