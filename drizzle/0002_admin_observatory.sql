CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `role` text NOT NULL,
  `password_hash` text NOT NULL,
  `password_salt` text NOT NULL,
  `active` integer DEFAULT 1 NOT NULL,
  `last_login_at` text,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `admin_users_email_unique` ON `admin_users` (`email`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `admin_sessions` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` integer NOT NULL,
  `token_hash` text NOT NULL,
  `expires_at` integer NOT NULL,
  `last_seen_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `revoked_at` text,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `admin_sessions_token_hash_unique` ON `admin_sessions` (`token_hash`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `admin_sessions_expiry_idx` ON `admin_sessions` (`expires_at`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `admin_audit_log` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `actor_id` integer,
  `action` text NOT NULL,
  `target` text DEFAULT '' NOT NULL,
  `metadata` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `admin_audit_log_actor_created_idx` ON `admin_audit_log` (`actor_id`, `created_at`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `analytics_daily_event_day_path_idx` ON `analytics_daily` (`event`, `day`, `path`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `enquiries_created_status_idx` ON `enquiries` (`created_at`, `status`);
