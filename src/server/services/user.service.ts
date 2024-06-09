import "server-only";

import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { UserCreateInput } from "../validations/user.schema";

export const UserService = {
  createUser: async (data: UserCreateInput) => {
    const [user] = await db
      .insert(userTable)
      .values(data)
      .returning()
      .execute();

    return user;
  },
  getAllUsers: async () => {
    return db.query.userTable.findMany();
  },
};
