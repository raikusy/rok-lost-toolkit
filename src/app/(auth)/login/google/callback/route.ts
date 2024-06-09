import { cookies } from "next/headers";
import { google, lucia } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { PAGES } from "@/config/pages";
import { createUser } from "@/server/actions/user.action";

export interface GoogleAuthResponse {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

const loginSuccessRedirect = () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: PAGES.PROFILE,
    },
  });
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const user: GoogleAuthResponse = await response.json();

    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.googleId, user.sub),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return loginSuccessRedirect();
    }

    const dbUser = await createUser({
      googleId: user.sub,
      name: user.name,
      email: user.email,
      emailVerified: user.email_verified,
      image: user.picture,
    });

    const session = await lucia.createSession(dbUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return loginSuccessRedirect();
  } catch (e) {
    console.error(e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
