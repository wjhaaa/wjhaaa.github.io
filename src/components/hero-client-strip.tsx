import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type HeroClient = {
  name: string;
  slug: string;
};

type HeroClientStripProps = {
  clients: readonly HeroClient[];
  items: PortfolioItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function HeroClientStrip({
  clients,
  items,
  activeIndex,
  onSelect,
}: HeroClientStripProps) {
  const activeItem = items[activeIndex];

  return (
    <div className="mt-12 border-t border-[hsl(var(--border))]/60 pt-6 lg:mt-14">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <span className="shrink-0 text-[12px] uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))]">
            服务客户
          </span>
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            role="tablist"
            aria-label="服务客户"
          >
            {clients.map((client, i) => (
              <button
                key={client.slug}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-controls="hero-carousel-panel"
                onClick={() => onSelect(i)}
                className={cn(
                  "text-[14px] transition-colors",
                  i === activeIndex
                    ? "font-medium text-[hsl(var(--foreground))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                )}
              >
                {client.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-4 lg:justify-end">
          {activeItem ? (
            <p className="hidden min-w-0 truncate text-[13px] text-[hsl(var(--muted-foreground))] md:block lg:max-w-xs">
              <Link
                href={`/portfolio/${activeItem.slug}`}
                className="hover:text-[hsl(var(--foreground))]"
              >
                {activeItem.title}
              </Link>
            </p>
          ) : null}
          <Link href="/portfolio" className="apple-link shrink-0 text-[13px]">
            全部作品 ›
          </Link>
        </div>
      </div>
    </div>
  );
}
