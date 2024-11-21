CREATE TABLE IF NOT EXISTS "budget" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "category" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "budget_user_id_idx" ON "budget" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN IF EXISTS "budget";