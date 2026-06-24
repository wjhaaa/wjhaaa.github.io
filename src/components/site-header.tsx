import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-[hsl(var(--nav-background))] backdrop-blur-xl supports-[backdrop-filter]:bg-[hsl(var(--nav-background))]">
      <div className="mx-auto flex h-11 max-w-[1680px] items-center justify-between px-6 lg:px-[90px]">
        <Link
          href="/"
          className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {siteConfig.nav.map((item) => {
            const active =
              router.pathname === item.href ||
              router.pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] transition-opacity duration-160",
                  active
                    ? "text-[hsl(var(--foreground))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={siteConfig.resumePath}
            className="hidden rounded-full px-3 py-1.5 text-[12px] text-[hsl(var(--link))] hover:underline sm:inline"
          >
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
