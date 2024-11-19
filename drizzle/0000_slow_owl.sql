CREATE TABLE IF NOT EXISTS "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text,
	"amount" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "expenses" USING btree ("user_id");