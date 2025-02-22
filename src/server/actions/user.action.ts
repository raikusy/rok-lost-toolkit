import { revalidateTag } from "next/cache";
import { UserService } from "../services/user.service";
import { cacheData } from "../../lib/cache-data";
import { KEY_CACHE } from "@/config/key-cache";
import { applyValidation } from "@/lib/validation";
import { UserCreateInput, UserCreateSchema } from "../validations/user.schema";

export const createUser = async (input: UserCreateInput) => {
  const data = applyValidation(UserCreateSchema, input);
  const user = await UserService.createUser(data);
  revalidateTag(KEY_CACHE.USERS.GET_ALL);
  return user;
};

export const getAllUsers = async () => {
  return cacheData(UserService.getAllUsers, [KEY_CACHE.USERS.GET_ALL])();
};
