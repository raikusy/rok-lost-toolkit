import { PAGES } from "@/config/pages";
import { getCurrentUserSession } from "@/server/actions/auth.action";

import Link from "next/link";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { user, session } = await getCurrentUserSession();
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        {/* <Link className="flex items-center justify-center" href="#">
          <Logo className="h-12 w-12" />
          <span className="sr-only">Full-stack Next.js Starter</span>
        </Link> */}
        <nav className="mx-auto flex space-x-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href={PAGES.CREATE_TEMPLATE}
          >
            Create Fancy Mail
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href={`${PAGES.HOME}#public`}
          >
            Public Mails
          </Link>
          {session && user ? (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href={PAGES.PROFILE}
            >
              My Mails
            </Link>
          ) : (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href={PAGES.LOGIN}
            >
              Login
            </Link>
          )}
        </nav>
      </header>
      <main className="container flex flex-col flex-1 h-full">{children}</main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <a
            className="hover:underline underline-offset-4"
            href="https://raikusy.dev/"
          >
            @raikusy
          </a>{" "}
          All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/privacy"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
