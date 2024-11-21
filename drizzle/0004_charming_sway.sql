ALTER TABLE "expenses" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "budget" numeric(12, 2);