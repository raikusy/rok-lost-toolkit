"use client";

import Image from "next/image";
import Link from "next/link";

export function SponsorSection() {
  return (
    <section className="w-full py-12" id="features">
      <div className="container space-y-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-2xl dark:bg-gray-800 mb-8">
              Sponsors
            </div>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              No Sponsors :(
            </p>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              If you are interested in sponsoring this project, please contact
              me on{" "}
              <Link
                href="https://discordapp.com/users/307469953043398657"
                target="_blank"
                className="text-gray-900 hover:text-gray-900/90 underline"
              >
                Discord
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="space-x-4 flex justify-center">
          <a
            className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="https://patreon.com/raikusy"
          >
            Sponsor Me on Patreon
          </a>
          <a href="https://buymeacoffee.com/raiku" target="_blank">
            <Image
              width={180}
              height={60}
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              className="h-12"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
