import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind", { enum: ["partner", "talent"] }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  company: text("company").notNull().default(""),
  location: text("location").notNull(),
  category: text("category").notNull(),
  links: text("links").notNull().default(""),
  message: text("message").notNull(),
  status: text("status", { enum: ["new", "in_review", "closed"] })
    .notNull()
    .default("new"),
  submissionId: text("submission_id").unique(),
  payloadHash: text("payload_hash"),
  notificationStatus: text("notification_status").notNull().default("not_configured"),
  applicantNotificationStatus: text("applicant_notification_status").notNull().default("not_configured"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const requestLimits = sqliteTable("request_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  expiresAt: integer("expires_at").notNull(),
});
export const analyticsDaily = sqliteTable("analytics_daily", {
  key: text("key").primaryKey(),
  day: text("day").notNull(),
  event: text("event").notNull(),
  path: text("path").notNull(),
  count: integer("count").notNull().default(0),
});

export const analyticsVisitors = sqliteTable("analytics_visitors", {
  visitorHash: text("visitor_hash").primaryKey(),
  firstSeenDay: text("first_seen_day").notNull(),
  lastSeenDay: text("last_seen_day").notNull(),
  visitCount: integer("visit_count").notNull().default(1),
});

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "super_admin"] }).notNull(),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  lastLoginAt: text("last_login_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const adminSessions = sqliteTable("admin_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: integer("expires_at").notNull(),
  lastSeenAt: text("last_seen_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  revokedAt: text("revoked_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const adminAuditLog = sqliteTable("admin_audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actorId: integer("actor_id"),
  action: text("action").notNull(),
  target: text("target").notNull().default(""),
  metadata: text("metadata").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const enquiryEvents = sqliteTable("enquiry_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  enquiryId: integer("enquiry_id").notNull(),
  eventType: text("event_type").notNull(),
  fromStatus: text("from_status"),
  toStatus: text("to_status"),
  actorId: integer("actor_id"),
  emailSubject: text("email_subject"),
  emailText: text("email_text"),
  emailStatus: text("email_status"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
