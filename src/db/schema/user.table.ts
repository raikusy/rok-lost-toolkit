import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { fancyTextTable } from "./fancy-text.table";

export const userTable = pgTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  googleId: text("google_id"),
});

export const userTableRelations = relations(userTable, ({ many }) => ({
  fancyTexts: many(fancyTextTable),
}));
