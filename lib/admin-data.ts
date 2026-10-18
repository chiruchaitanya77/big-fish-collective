import { getRawDb } from "@/db";

export type DashboardRange = 7 | 60 | 90;

export type DashboardData = {
  range: DashboardRange;
  summary: { visitors: number; uniqueVisitors: number; returningVisitors: number; leads: number; openLeads: number; conversionRate: number; totalLeads: number };
  traffic: Array<{ day: string; visitors: number; leads: number; clicks: number }>;
  topPages: Array<{ path: string; visitors: number }>;
  eventBreakdown: Array<{ event: string; count: number }>;
  enquiries: Array<{ id: number; kind: string; kindContext: string; name: string; email: string; category: string; status: string; createdAt: string }>;
  staff: Array<{ id: number; name: string; email: string; role: string; active: number; lastLoginAt: string | null; createdAt: string }>;
  activity: Array<{ id: number; action: string; target: string; createdAt: string; actorName: string | null }>;
};

export function parseDashboardRange(value: string | undefined): DashboardRange {
  return value === "7" ? 7 : value === "90" ? 90 : 60;
}

export async function dashboardData(range: DashboardRange, includeStaff: boolean): Promise<DashboardData> {
  const db = getRawDb();
  const startDay = new Date(Date.now() - (range - 1) * 86_400_000).toISOString().slice(0, 10);
  const statements = [
    db.prepare("SELECT COALESCE(SUM(count), 0) AS visitors FROM analytics_daily WHERE event = 'page_view' AND day >= ?").bind(startDay),
    db.prepare("SELECT COUNT(*) AS unique_visitors, SUM(CASE WHEN first_seen_day < ? THEN 1 ELSE 0 END) AS returning_visitors FROM analytics_visitors WHERE last_seen_day >= ?").bind(startDay, startDay),
    db.prepare("SELECT COUNT(*) AS leads, SUM(CASE WHEN status != 'closed' THEN 1 ELSE 0 END) AS open_leads, (SELECT COUNT(*) FROM enquiries) AS total_leads FROM enquiries WHERE created_at >= ?").bind(`${startDay} 00:00:00`),
    db.prepare(`SELECT day, SUM(CASE WHEN event = 'page_view' THEN count ELSE 0 END) AS visitors,
      SUM(CASE WHEN event IN ('talent_form_success', 'partner_form_success') THEN count ELSE 0 END) AS leads,
      SUM(CASE WHEN event LIKE '%_click' THEN count ELSE 0 END) AS clicks
      FROM analytics_daily WHERE day >= ? GROUP BY day ORDER BY day`).bind(startDay),
    db.prepare("SELECT path, SUM(count) AS visitors FROM analytics_daily WHERE event = 'page_view' AND day >= ? GROUP BY path ORDER BY visitors DESC LIMIT 8").bind(startDay),
    db.prepare("SELECT event, SUM(count) AS count FROM analytics_daily WHERE day >= ? AND event != 'page_view' GROUP BY event ORDER BY count DESC").bind(startDay),
    db.prepare("SELECT id, kind, name, email, category, status, created_at AS createdAt FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 12"),
  ];
  if (includeStaff) statements.push(
    db.prepare("SELECT id, name, email, role, active, last_login_at AS lastLoginAt, created_at AS createdAt FROM admin_users ORDER BY role DESC, created_at ASC"),
    db.prepare(`SELECT log.id, log.action, log.target, log.created_at AS createdAt, actor.name AS actorName
      FROM admin_audit_log log LEFT JOIN admin_users actor ON actor.id = log.actor_id
      ORDER BY log.created_at DESC, log.id DESC LIMIT 12`),
  );
  const results = await db.batch(statements);
  const visitorResult = results[0].results[0] as { visitors: number } | undefined;
  const uniqueVisitorResult = results[1].results[0] as { unique_visitors: number; returning_visitors: number | null } | undefined;
  const leadResult = results[2].results[0] as { leads: number; open_leads: number | null; total_leads: number } | undefined;
  const visitors = Number(visitorResult?.visitors || 0);
  const leads = Number(leadResult?.leads || 0);
  return {
    range,
    summary: {
      visitors,
      uniqueVisitors: Number(uniqueVisitorResult?.unique_visitors || 0),
      returningVisitors: Number(uniqueVisitorResult?.returning_visitors || 0),
      leads,
      openLeads: Number(leadResult?.open_leads || 0),
      totalLeads: Number(leadResult?.total_leads || 0),
      conversionRate: visitors ? Number(((leads / visitors) * 100).toFixed(2)) : 0,
    },
    traffic: (results[3].results as Record<string, unknown>[]).map((row) => ({ day: String(row.day), visitors: Number(row.visitors), leads: Number(row.leads), clicks: Number(row.clicks) })),
    topPages: (results[4].results as Record<string, unknown>[]).map((row) => ({ path: String(row.path), visitors: Number(row.visitors) })),
    eventBreakdown: (results[5].results as Record<string, unknown>[]).map((row) => ({ event: String(row.event), count: Number(row.count) })),
    enquiries: (results[6].results as Record<string, unknown>[]).map((row) => ({ id: Number(row.id), kind: String(row.kind), kindContext: row.kind === "talent" ? "Seeking to join the collective" : "Seeking talent for a production", name: String(row.name), email: String(row.email), category: String(row.category), status: String(row.status), createdAt: String(row.createdAt) })),
    staff: includeStaff && results[7] ? (results[7].results as Record<string, unknown>[]).map((row) => ({ id: Number(row.id), name: String(row.name), email: String(row.email), role: String(row.role), active: Number(row.active), lastLoginAt: row.lastLoginAt ? String(row.lastLoginAt) : null, createdAt: String(row.createdAt) })) : [],
    activity: includeStaff && results[8] ? (results[8].results as Record<string, unknown>[]).map((row) => ({ id: Number(row.id), action: String(row.action), target: String(row.target), createdAt: String(row.createdAt), actorName: row.actorName ? String(row.actorName) : null })) : [],
  };
}
