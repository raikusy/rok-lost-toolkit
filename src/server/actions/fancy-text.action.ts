"use server";

import { JSONContent } from "@tiptap/react";
import { getCurrentUserSession } from "./auth.action";
import { FancyTextService } from "../services/fancy-text.service";
import { cacheData } from "@/lib/cache-data";
import { revalidateTag } from "next/cache";
import { KEY_CACHE } from "@/config/key-cache";

export const createFancyText = async (input: {
  name: string;
  content: JSONContent;
  isPublic: boolean;
}) => {
  const { user } = await getCurrentUserSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const [created] = await FancyTextService.createFancyText({
    userId: user.id,
    name: input.name,
    content: input.content,
    isPublic: input.isPublic,
  });

  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_PUBLIC);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_MINE(user.id));

  // revalidatePath(PAGES.PUBLIC_TEMPLATES);
  // revalidatePath(PAGES.PROFILE);

  return created;
};

export const updateFancyText = async (
  id: string,
  input: {
    name: string;
    content: JSONContent;
    isPublic: boolean;
  }
) => {
  const { user } = await getCurrentUserSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const [updated] = await FancyTextService.updateFancyText(id, {
    name: input.name,
    content: input.content,
    isPublic: input.isPublic,
  });
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_ONE(id));
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_PUBLIC);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_MINE(user.id));

  // revalidatePath(PAGES.PUBLIC_TEMPLATES);
  // revalidatePath(PAGES.PROFILE);
  // revalidatePath(PAGES.VIEW_TEMPLATE(id));
  return updated;
};

export const toggleFancyTextPublic = async (id: string, isPublic: boolean) => {
  const { user } = await getCurrentUserSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const [updated] = await FancyTextService.toggleFancyTextPublic(id, isPublic);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_ONE(id));
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_PUBLIC);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_MINE(user.id));

  // revalidatePath(PAGES.PUBLIC_TEMPLATES);
  // revalidatePath(PAGES.PROFILE);
  // revalidatePath(PAGES.VIEW_TEMPLATE(id));
  return updated;
};

export const duplicateFancyText = async (id: string) => {
  const { user } = await getCurrentUserSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const [duplicated] = await FancyTextService.duplicateFancyText(id, user.id);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_PUBLIC);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_MINE(user.id));
  return duplicated;
};

export const deleteFancyText = async (id: string) => {
  const { user } = await getCurrentUserSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const [deleted] = await FancyTextService.deleteFancyText(id, user.id);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_ONE(id));
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_PUBLIC);
  revalidateTag(KEY_CACHE.FANCY_TEXT.GET_MINE(user.id));

  return deleted;
};

export const getFancyTextById = async (id: string) => {
  return cacheData(FancyTextService.getFancyTextById, [
    KEY_CACHE.FANCY_TEXT.GET_ONE(id),
  ])(id);
};

export const getMyFancyTexts = async (params: {
  page?: number;
  search?: string;
}) => {
  const { user } = await getCurrentUserSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return cacheData(FancyTextService.getMyFancyTexts, [
    KEY_CACHE.FANCY_TEXT.GET_MINE(user.id),
  ])(user.id, params);
};

export const getPublicFancyTexts = cacheData(
  FancyTextService.getPublicFancyTexts,
  [KEY_CACHE.FANCY_TEXT.GET_PUBLIC]
);
