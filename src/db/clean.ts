import { pool } from "./drizzle";

const main = async () => {
  const client = await pool.connect();
  console.info("🌱    CLEANING STARTED");

  try {
    // Clear full DB
    await client.query("BEGIN");

    // Retrieve all table names in the current database
    const resTables = await client.query(`
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public';
    `);

    // Drop each table
    for (const row of resTables.rows) {
      await client.query(`DROP TABLE IF EXISTS "${row.tablename}" CASCADE;`);
    }

    // Retrieve all enum types in the current database
    const resEnums = await client.query(`
        SELECT enumtypid::regtype::text AS enum_type
        FROM pg_enum
        GROUP BY enumtypid;
    `);

    // Drop each enum type
    for (const row of resEnums.rows) {
      await client.query(`DROP TYPE IF EXISTS "${row.enum_type}" CASCADE;`);
    }

    // Retrieve all sequence names in the current database
    const resSequences = await client.query(`
        SELECT sequence_name
        FROM information_schema.sequences
        WHERE sequence_schema = 'public';
    `);

    // Drop each sequence
    for (const row of resSequences.rows) {
      await client.query(
        `DROP SEQUENCE IF EXISTS "${row.sequence_name}" CASCADE;`
      );
    }

    await client.query("COMMIT");
    console.info("✅    DROP SUCCESS");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error clearing database:", error);
  } finally {
    client.release();
  }
};

main().finally(() => process.exit(0));
