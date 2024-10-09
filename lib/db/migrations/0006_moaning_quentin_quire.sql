ALTER TABLE "events" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "user_events" ADD COLUMN "deleted_at" timestamp;