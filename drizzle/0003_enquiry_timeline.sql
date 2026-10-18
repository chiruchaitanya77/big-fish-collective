CREATE TABLE IF NOT EXISTS `enquiry_events` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `enquiry_id` integer NOT NULL,
  `event_type` text NOT NULL,
  `from_status` text,
  `to_status` text,
  `actor_id` integer,
  `email_subject` text,
  `email_text` text,
  `email_status` text,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `enquiry_events_enquiry_created_idx` ON `enquiry_events` (`enquiry_id`, `created_at`);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `enquiry_events_transition_unique` ON `enquiry_events` (`enquiry_id`, `to_status`);
