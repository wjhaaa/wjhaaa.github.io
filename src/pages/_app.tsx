import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteLayout } from "@/components/site-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </ThemeProvider>
  );
}

