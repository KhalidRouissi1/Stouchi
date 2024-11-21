ALTER TABLE "expenses" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN IF EXISTS "category";