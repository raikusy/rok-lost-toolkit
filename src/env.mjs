import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_REDIRECT_URI: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GA_ID: z.string().min(1),
    // NEXT_PUBLIC_VARIABLE: z.string(),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  // runtimeEnv: {
  //   NODE_ENV: process.env.NODE_ENV,
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  //   GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  // },
});
