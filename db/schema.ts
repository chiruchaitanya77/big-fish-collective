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
