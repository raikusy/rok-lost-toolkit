import "server-only";

import { db } from "@/db/drizzle";
import { fancyTextTable } from "@/db/schema";
import { JSONContent } from "@tiptap/react";
import { and, countDistinct, desc, eq, isNull, sql } from "drizzle-orm";

export interface FancyText {
  name: string;
  content: JSONContent;
  userId: string;
  isPublic: boolean;
}

export const FancyTextService = {
  createFancyText: async ({ userId, content, name, isPublic }: FancyText) => {
    const data = { userId, content, name, isPublic };
    return db.insert(fancyTextTable).values(data).returning().execute();
  },

  updateFancyText: async (
    id: string,
    { content, name, isPublic }: Partial<FancyText>
  ) => {
    const data = { content, name, isPublic };
    return db
      .update(fancyTextTable)
      .set(data)
      .where(eq(fancyTextTable.id, id))
      .returning()
      .execute();
  },

  toggleFancyTextPublic: async (id: string, isPublic: boolean) => {
    return db
      .update(fancyTextTable)
      .set({ isPublic })
      .where(eq(fancyTextTable.id, id))
      .returning()
      .execute();
  },

  duplicateFancyText: async (id: string, userId: string) => {
    const existing = await db.query.fancyTextTable.findFirst({
      where: and(eq(fancyTextTable.id, id), isNull(fancyTextTable.deletedAt)),
    });
    if (!existing) {
      throw new Error("Fancy text not found");
    }
    return FancyTextService.createFancyText({
      userId: userId,
      name: existing.name,
      content: existing.content,
      isPublic: existing.isPublic,
    });
  },

  deleteFancyText: async (id: string) => {
    return db
      .update(fancyTextTable)
      .set({ deletedAt: new Date() })
      .where(eq(fancyTextTable.id, id))
      .returning()
      .execute();
  },

  getFancyTextById: async (id: string) => {
    return db.query.fancyTextTable.findFirst({
      where: and(eq(fancyTextTable.id, id), isNull(fancyTextTable.deletedAt)),
      with: {
        user: true,
      },
    });
  },

  getMyFancyTexts: async (
    userId: string,
    params: { page?: number; search?: string }
  ) => {
    const page = params?.page ?? 1;
    const limit = 20;
    const search = params?.search ?? "";

    const where = [
      eq(fancyTextTable.userId, userId),
      isNull(fancyTextTable.deletedAt),
    ];

    if (search) {
      where.push(
        sql`to_tsvector('english', ${fancyTextTable.name}) @@ to_tsquery('english', ${search})`
      );
    }
    const [result, count] = await Promise.all([
      db.query.fancyTextTable.findMany({
        where: and(...where),
        orderBy: desc(fancyTextTable.createdAt),
        limit,
        offset: (page - 1) * limit,
      }),
      await db
        .select({ count: countDistinct(fancyTextTable.id) })
        .from(fancyTextTable)
        .where(and(...where))
        .execute(),
    ]);

    return {
      data: result,
      total: count[0].count,
    };
  },

  getPublicFancyTexts: async (params: { page?: number; search?: string }) => {
    const page = params.page ?? 1;
    const limit = 20;
    const search = params.search ?? "";
    const where = [
      eq(fancyTextTable.isPublic, true),
      isNull(fancyTextTable.deletedAt),
    ];

    if (search) {
      where.push(
        sql`to_tsvector('english', ${fancyTextTable.name}) @@ to_tsquery('english', ${search})`
      );
    }
    const [result, count] = await Promise.all([
      db.query.fancyTextTable.findMany({
        where: and(...where),
        with: {
          user: true,
        },
        orderBy: desc(fancyTextTable.createdAt),
        limit,
        offset: (page - 1) * limit,
      }),
      await db
        .select({ count: countDistinct(fancyTextTable.id) })
        .from(fancyTextTable)
        .where(and(...where))
        .execute(),
    ]);

    return {
      data: result,
      total: count[0].count,
    };
  },
};
