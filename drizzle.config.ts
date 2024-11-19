import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./server/db/schema.ts",

  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
