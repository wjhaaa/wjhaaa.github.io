import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { PortfolioItem } from "@/content/portfolio";
import { PortfolioCover } from "@/components/portfolio-cover";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5500;

type HeroCarouselProps = {
  items: PortfolioItem[];
};

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (!items.length) return;
      setIndex((next + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [items.length, paused, reducedMotion]);

  if (!items.length) return null;

  const active = items[index];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-4xl bg-[radial-gradient(ellipse_at_50%_50%,rgba(41,151,255,0.14),transparent_70%)] lg:-inset-6"
      />

      <div className="relative w-full overflow-hidden">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className={cn(
              "absolute inset-x-0 top-0 block origin-top transition-opacity duration-700 ease-out",
              i === index ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
            )}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
          >
            <PortfolioCover
              item={item}
              priority={i === 0}
              variant="stage"
              className="w-full [&_.mockup-display-lg]:max-w-full"
            />
          </Link>
        ))}
        {/* 占位高度：与首张 mockup 一致，避免轮播切换时布局跳动 */}
        <div className="invisible pointer-events-none" aria-hidden>
          <PortfolioCover
            item={items[0]}
            variant="stage"
            className="w-full [&_.mockup-display-lg]:max-w-full"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <p className="min-w-0 truncate text-[13px] text-[hsl(var(--muted-foreground))]">
          <Link
            href={`/portfolio/${active.slug}`}
            className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--link))]"
          >
            {active.title}
          </Link>
        </p>
        {items.length > 1 ? (
          <div
            className="flex shrink-0 items-center gap-1.5"
            role="tablist"
            aria-label="代表作品轮播"
          >
            {items.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${item.title}（${i + 1}/${items.length}）`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-5 bg-[hsl(var(--link))]"
                    : "w-1.5 bg-[hsl(var(--muted-foreground))]/40 hover:bg-[hsl(var(--muted-foreground))]/70",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
