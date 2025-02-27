import "server-only";

import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { UserCreateInput } from "../validations/user.schema";
import { and, ilike, or, type SQLWrapper } from "drizzle-orm";

export const UserService = {
  createUser: async (data: UserCreateInput) => {
    const [user] = await db
      .insert(userTable)
      .values(data)
      .returning()
      .execute();

    return user;
  },
  getAllUsers: async (params: {
    page?: number;
    search?: string;
    limit?: number;
  }) => {
    const { page = 1, search = "", limit = 10 } = params;
    const offset = (page - 1) * limit;
    const where: SQLWrapper[] = [];
    if (search) {
      where.push(
        or(
          ilike(userTable.name, `%${search}%`),
          ilike(userTable.email, `%${search}%`)
        )!
      );
    }
    const result = await db.query.userTable.findMany({
      where: and(...where),
      limit,
      offset,
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
    const total = await db.$count(userTable, and(...where));
    return {
      data: result,
      total,
      page,
      limit,
    };
  },
};
