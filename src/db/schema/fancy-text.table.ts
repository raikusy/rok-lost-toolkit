import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.table";
import { JSONContent } from "@tiptap/react";
import { relations, sql } from "drizzle-orm";

export const fancyTextTable = pgTable(
  "fancy_text",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey(),
    name: text("name").notNull(),
    content: jsonb("content").$type<JSONContent>().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    isPublic: boolean("is_public").default(false).notNull(),
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
    deletedAt: timestamp("deleted_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => ({
    titleSearchIndex: index("name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.name})`
    ),
  })
);

export const fancyTextRelations = relations(fancyTextTable, ({ one }) => ({
  user: one(userTable, {
    fields: [fancyTextTable.userId],
    references: [userTable.id],
  }),
}));

export type FancyText = typeof fancyTextTable.$inferSelect & {
  user: typeof userTable.$inferSelect;
};
