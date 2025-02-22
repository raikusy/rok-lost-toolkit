import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Google } from "arctic";
import { Lucia, User } from "lucia";

import { sessionTable, userTable } from "@/db/schema";
import { env } from "@/env.mjs";
import { db } from "@/db/drizzle";
import { cache } from "react";
import { cookies } from "next/headers";
import { Session } from "lucia";
import type { Role } from "@/config/roles";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      name: attributes.name,
      image: attributes.image,
      googleId: attributes.googleId,
      role: attributes.role,
    };
  },
});

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI
);

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
  googleId: string;
  role: Role;
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);
