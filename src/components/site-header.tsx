import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/knowledge", label: "Knowledge" },
];

export function SiteHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b bg-[hsl(var(--background))]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          wjhaaa
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((item) => {
            const active =
              router.pathname === item.href ||
              (item.href !== "/" && router.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]",
                  active && "text-[hsl(var(--foreground))]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

