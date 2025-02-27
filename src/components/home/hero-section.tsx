"use client";

import { PAGES } from "@/config/pages";
import Image from "next/image";
import Link from "next/link";
import { DiscordIcon } from "../icons/discord";
import { Separator } from "../ui/separator";

export function HeroSection() {
  return (
    <section className="w-full h-full flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/logo.png"
            width={250}
            height={250}
            alt="Stylish & Colorful Mails - Rise of Kingdom & Call of Dragons"
          />
          {/* <Logo className="h-48 w-48" /> */}
          <span className="sr-only">
            Stylish & Colorful Mails - Rise of Kingdoms & Call of Dragons
          </span>
        </Link>
        <div className="space-y-2">
          <h1 className="my-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Stylish & Colorful Mails
          </h1>
          <h3 className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl lg:text-4xl">
            <small className="text-gray-500 text-md">for</small>
            <br />
            Rise of Kingdoms & Call of Dragons
          </h3>
          <Separator className="my-4" />
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Create beautiful Rise of Kingdoms & Call of Dragons mail for event
            guides, KVK strategies, alliance and kingdom updates, MGE
            announcements with ease. Create stylish Alliance Descriptions.
            Browse hundreds of public mail templates created by other players.
          </p>
        </div>

        <div className="space-x-4 flex flex-col md:flex-row">
          <Link
            className="inline-flex h-16 items-center justify-center rounded-md bg-gray-900 px-8 py-4 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href={PAGES.CREATE_TEMPLATE}
          >
            Write a Mail
          </Link>
          <Link
            className="inline-flex h-16 items-center justify-center rounded-md bg-white border-2 border-gray-900 px-8 py-4 text-lg font-medium text-gray-900 hover:text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href={PAGES.CREATE_TEMPLATE}
          >
            Public Templates
          </Link>
        </div>
        <div className="space-x-4 flex flex-col md:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="https://discord.gg/23FuzxykhN"
            target="_blank"
          >
            <DiscordIcon className="w-6 h-6 mr-2 text-white" fill="white" />
            Join Discord
          </Link>
        </div>
      </div>
    </section>
  );
}
