import { fancyTextTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const FancyTextSchema = createInsertSchema(fancyTextTable, {
  name: z.string().min(3).max(255),
  isPublic: z.boolean(),
}).pick({
  name: true,
  content: true,
  isPublic: true,
});

export type FancyTextInput = z.infer<typeof FancyTextSchema>;
