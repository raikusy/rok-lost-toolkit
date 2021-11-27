import "styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { IdProvider } from "@radix-ui/react-id";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />;
      </GeistProvider>
    </IdProvider>
  );
}

export default MyApp;
