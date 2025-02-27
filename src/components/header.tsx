"use client";

import { PAGES } from "@/config/pages";
import type { Session, User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { DiscordIcon } from "./icons/discord";

export function Header({
  session,
  user,
}: {
  session: Session | null;
  user: User | null;
}) {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center container mx-auto">
      <Link className="flex items-center justify-center" href="#">
        <Image
          src="/logo-horizontal.png"
          width={200}
          height={46}
          alt="Rok Mail Art"
        />
        <span className="sr-only">Rok Mail Art</span>
      </Link>
      <nav className="flex space-x-6 items-center ml-auto">
        <Link
          className="text-md font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-md font-medium hover:underline underline-offset-4"
          href="/public-templates"
        >
          Public Templates
        </Link>
        <Link
          className="text-md font-medium hover:underline underline-offset-4"
          href={PAGES.CREATE_TEMPLATE}
        >
          Write a Mail
        </Link>
        {session && user ? (
          <Link
            className="text-md font-medium hover:underline underline-offset-4"
            href={PAGES.PROFILE}
          >
            My Mails
          </Link>
        ) : (
          <Link
            className="text-md font-medium hover:underline underline-offset-4"
            href={PAGES.LOGIN}
          >
            Login
          </Link>
        )}
        <Link
          className="text-md font-medium hover:underline underline-offset-4 flex items-center gap-2"
          href="https://discord.gg/23FuzxykhN"
          target="_blank"
        >
          Join Discord
          <DiscordIcon className="w-6 h-6" fill="black" />
        </Link>
        {/* <a
          className="text-md font-medium hover:underline underline-offset-4"
          href="https://patreon.com/raikusy"
          target="_blank"
        >
          Support on Patreon
        </a>
        <a href="https://buymeacoffee.com/raiku" target="_blank">
          <Image
            width={160}
            height={60}
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            className="h-10"
          />
        </a> */}
      </nav>
    </header>
  );
}
