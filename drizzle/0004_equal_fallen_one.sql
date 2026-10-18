CREATE TABLE `analytics_visitors` (
	`visitor_hash` text PRIMARY KEY NOT NULL,
	`first_seen_day` text NOT NULL,
	`last_seen_day` text NOT NULL,
	`visit_count` integer DEFAULT 1 NOT NULL
);
