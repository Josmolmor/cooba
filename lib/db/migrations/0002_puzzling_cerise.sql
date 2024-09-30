ALTER TABLE "expenses" ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "currency" text DEFAULT 'EUR' NOT NULL;