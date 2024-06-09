import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db, pool } from "./drizzle";

async function main() {
  console.info("🚀    MIGRATION STARTED");
  await migrate(db, {
    migrationsFolder: "src/db/migrations",
    migrationsTable: "my_migrations",
  });
  console.info("✅    MIGRATION COMPLETED");
  await pool.end();
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.info("👋    Closing process...");
    process.exit(0);
  });
