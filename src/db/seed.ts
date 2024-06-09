import { INITIAL_CONTENT } from "@/config/initial-content";
import { db } from "./drizzle";
import { fancyTextTable, userTable } from "./schema";

const main = async () => {
  // DEMO EXAMPLE SEEDING
  const user = await db.query.userTable.findFirst();

  const data = Array.from({ length: 200 }).map((_, i) => {
    return {
      name: `Template ${i + 1}`,
      userId: user?.id!,
      isPublic: i % 2 === 0,
      content: INITIAL_CONTENT,
    };
  });
  await db.insert(fancyTextTable).values(data).execute();
  console.log("✅    SEED SUCCESS");
};

main().finally(() => process.exit(0));
