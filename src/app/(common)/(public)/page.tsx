import Pages from "@/components/client/pages";
import SearchBox from "@/components/client/search";
import { TiptapPreview } from "@/components/client/tiptap-preview";
import { HeroSection } from "@/components/home/hero-section";
import { SponsorSection } from "@/components/home/sponsor-section";
import { TemplateCard } from "@/components/template-card";
import { PAGES } from "@/config/pages";
import { getPublicFancyTexts } from "@/server/actions/fancy-text.action";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search;
  const templates = await getPublicFancyTexts({ page, search });
  return (
    <>
      <HeroSection />

      <SponsorSection />

      {/* <section className="w-full py-12 md:py-24 lg:py-32" id="features">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-4xl dark:bg-gray-800 mb-16">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything you need to get started
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The Next.js Starter Mail comes packed with features to help
                you build your next project quickly and efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <RocketIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                <h3 className="text-lg font-bold">Fast and Scalable</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Built on Next.js, the React framework for production. Blazing
                fast performance and easy scaling.
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                <h3 className="text-lg font-bold">Highly Customizable</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tailwind CSS and Shadcn UI provide a flexible and customizable
                design system.
              </p>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <BoltIcon className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                <h3 className="text-lg font-bold">Developer Friendly</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Includes essential developer tools like ESLint, Prettier, and
                Husky for a smooth development experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        id="get-started"
      >
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Get started in minutes
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Follow the instructions in the README to set up your project and
              start building your next great application.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              View on GitHub
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32" id="resources">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Resources
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out our social media and community resources to stay up to
              date with the latest updates and get help from other developers.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              <TwitterIcon className="h-5 w-5 mr-2" />
              Twitter
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              <DiscordIcon className="h-5 w-5 mr-2" />
              Discord
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              <GithubIcon className="h-5 w-5 mr-2" />
              GitHub
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
}
