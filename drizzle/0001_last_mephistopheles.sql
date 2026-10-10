CREATE TABLE `analytics_daily` (
	`key` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`event` text NOT NULL,
	`path` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `request_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `submission_id` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `payload_hash` text;--> statement-breakpoint
ALTER TABLE `enquiries` ADD `notification_status` text DEFAULT 'not_configured' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `enquiries_submission_id_unique` ON `enquiries` (`submission_id`);