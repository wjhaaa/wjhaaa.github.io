import "@/styles/globals.css";

import { Inter } from "next/font/google";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteLayout } from "@/components/site-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} min-h-dvh antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </ThemeProvider>
    </div>
  );
}
