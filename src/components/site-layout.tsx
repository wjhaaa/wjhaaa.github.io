import type { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function SiteLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div className="min-h-dvh overflow-x-clip">
      <SiteHeader />
      <main className="mx-auto max-w-[1680px] px-6 lg:px-16">
        {children}
      </main>
      {!isHome ? <SiteFooter /> : null}
    </div>
  );
}
