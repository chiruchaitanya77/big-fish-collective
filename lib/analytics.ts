export const pagePaths = ["/", "/about", "/talent", "/partners", "/services", "/process", "/contact", "/find-talent", "/hyderabad", "/faq"];
export const eventNames = ["page_view", "join_collective_click", "find_talent_click", "contact_click", "email_click", "talent_form_start", "partner_form_start", "talent_form_success", "partner_form_success", "talent_form_error", "partner_form_error"];
export async function recordEvent(db: D1Database, event: string, path: string) {
  await db.prepare(`INSERT INTO analytics_daily (key, day, event, path, count) VALUES (?, ?, ?, ?, 1)
    ON CONFLICT(key) DO UPDATE SET count = count + 1`)
    .bind(`${new Date().toISOString().slice(0, 10)}:${event}:${path}`, new Date().toISOString().slice(0, 10), event, path).run();
}
