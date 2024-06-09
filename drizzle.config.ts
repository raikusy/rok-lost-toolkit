import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: [".env", ".env.local"],
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/**/**.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
