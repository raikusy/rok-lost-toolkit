import { revalidateTag } from "next/cache";
import { UserService } from "../services/user.service";
import { cacheData } from "../../lib/cache-data";
import { KEY_CACHE } from "@/config/key-cache";
import { applyValidation } from "@/lib/validation";
import { UserCreateInput, UserCreateSchema } from "../validations/user.schema";
import { getCurrentUserSession } from "./auth.action";
import { ROLES } from "@/config/roles";

export const createUser = async (input: UserCreateInput) => {
  const data = applyValidation(UserCreateSchema, input);
  const user = await UserService.createUser(data);
  revalidateTag(KEY_CACHE.USERS.GET_ALL);
  return user;
};

export const getAllUsers = async (params: {
  page?: number;
  search?: string;
  limit?: number;
}) => {
  const { user } = await getCurrentUserSession();
  if (!user || user.role !== ROLES.ADMIN) {
    throw new Error("Unauthorized");
  }
  return cacheData(UserService.getAllUsers, [KEY_CACHE.USERS.GET_ALL])(params);
};
