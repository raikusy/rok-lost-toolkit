import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { fancyTextTable } from "./fancy-text.table";
import { ROLES, ROLE_LIST } from "@/config/roles";

export const userTable = pgTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  googleId: text("google_id"),
  role: text("role", { enum: ROLE_LIST }).default(ROLES.USER),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).$onUpdate(() => new Date()),
});

export const userTableRelations = relations(userTable, ({ many }) => ({
  fancyTexts: many(fancyTextTable),
}));
