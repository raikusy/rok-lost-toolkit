import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env.mjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROK Mail Art - Rise of Kingdoms & Call of Dragons Tool",
  description:
    "Create beautiful Rise of Kingdoms & Call of Dragons event guides, KVK strategies, alliance and kingdom updates, MGE announcements with ease. Also browse hundreds of public mail templates created by other players.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`min-h-dvh ${inter.className}`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
      <GoogleTagManager gtmId={env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
