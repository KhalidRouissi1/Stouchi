import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});
const db = drizzle(migrationClient);
await migrate(db, { migrationsFolder: "./drizzle" });

console.log("Migration complete");
