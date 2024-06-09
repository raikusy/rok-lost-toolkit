import { userTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const UserCreateSchema = createInsertSchema(userTable);

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
