import type { PropsWithChildren } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <SiteHeader />
      <main className="mx-auto max-w-[1680px] px-6 lg:px-[90px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
