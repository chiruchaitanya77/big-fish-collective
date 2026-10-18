export const pagePaths = ["/", "/about", "/talent", "/partners", "/services", "/process", "/contact", "/find-talent", "/hyderabad", "/faq"];
export const eventNames = ["page_view", "join_collective_click", "find_talent_click", "contact_click", "email_click", "talent_form_start", "partner_form_start", "talent_form_success", "partner_form_success", "talent_form_error", "partner_form_error"];
export async function recordEvent(db: D1Database, event: string, path: string) {
  const day = new Date().toISOString().slice(0, 10);
  await db.prepare(`INSERT INTO analytics_daily (key, day, event, path, count) VALUES (?, ?, ?, ?, 1)
    ON CONFLICT(key) DO UPDATE SET count = count + 1`)
    .bind(`${day}:${event}:${path}`, day, event, path).run();
}

export async function recordVisitor(db: D1Database, visitorId: string) {
  const day = new Date().toISOString().slice(0, 10);
  const visitorHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(visitorId));
  const hash = Array.from(new Uint8Array(visitorHash), (byte) => byte.toString(16).padStart(2, "0")).join("");
  await db.prepare(`INSERT INTO analytics_visitors (visitor_hash, first_seen_day, last_seen_day, visit_count) VALUES (?, ?, ?, 1)
    ON CONFLICT(visitor_hash) DO UPDATE SET last_seen_day = ?, visit_count = visit_count + 1`)
    .bind(hash, day, day, day).run();
}
