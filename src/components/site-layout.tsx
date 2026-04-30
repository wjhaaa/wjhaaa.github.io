import type { PropsWithChildren } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

