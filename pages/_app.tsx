import "styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { IdProvider } from "@radix-ui/react-id";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id="ga-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
      </Script>
      <IdProvider>
        <GeistProvider>
          <CssBaseline />
          <Component {...pageProps} />;
        </GeistProvider>
      </IdProvider>
    </>
  );
}

export default MyApp;
