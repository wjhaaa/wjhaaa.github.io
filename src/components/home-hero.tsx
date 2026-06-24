import Link from "next/link";
import { useCallback, useState } from "react";
import type { PortfolioItem } from "@/content/portfolio";
import { heroClients } from "@/content/portfolio";
import { HeroCarousel } from "@/components/hero-carousel";
import { HeroClientStrip } from "@/components/hero-client-strip";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const PAUSE_AFTER_SELECT_MS = 8000;

type HomeScreenProps = {
  featured: PortfolioItem;
  carouselItems: PortfolioItem[];
};

export function HomeScreen({ featured, carouselItems }: HomeScreenProps) {
  const { heroMetric, aiDashboard } = siteConfig;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const handleClientSelect = useCallback((index: number) => {
    setCarouselIndex(index);
    setCarouselPaused(true);
    window.setTimeout(() => setCarouselPaused(false), PAUSE_AFTER_SELECT_MS);
  }, []);

  return (
    <PageHero
      align="left"
      particleSubtle
      particleEdgeMask
      className="!pb-0 !pt-0"
    >
      <div className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-x-14">
          <div className="min-w-0 max-w-md lg:col-start-1 lg:self-center">
            <p className="text-[14px] font-medium text-[hsl(var(--link))]">
              {siteConfig.titleZh} · {siteConfig.tagline}
            </p>
            <h1 className="text-hero mt-4 text-balance text-[hsl(var(--foreground))]">
              {siteConfig.nameZh}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.47] text-[hsl(var(--muted-foreground))]">
              {siteConfig.description}
            </p>

            <div className="mt-8">
              <p className="text-[12px] uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))]">
                {heroMetric.label}
              </p>
              <p className="mt-1 flex items-baseline gap-3">
                <span className="text-[15px] text-[hsl(var(--muted-foreground))] line-through decoration-[hsl(var(--muted-foreground))]/50">
                  {heroMetric.before}
                </span>
                <span className="text-[40px] font-semibold leading-none tracking-tight text-[hsl(var(--foreground))] sm:text-[48px]">
                  {heroMetric.after}
                </span>
              </p>
              <p className="mt-1 text-[13px] text-[hsl(var(--muted-foreground))]">
                {featured.title}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button asChild size="lg">
                <Link href="/portfolio">查看作品集</Link>
              </Button>
              <Link
                href={siteConfig.resumePath}
                className="apple-link text-[15px]"
              >
                下载简历 ›
              </Link>
              <Link href={aiDashboard.href} className="apple-link text-[15px]">
                AI 驾驶舱 Demo ›
              </Link>
            </div>
          </div>

          <HeroCarousel
            items={carouselItems}
            variant="hero"
            index={carouselIndex}
            onIndexChange={setCarouselIndex}
            paused={carouselPaused}
            onPauseChange={setCarouselPaused}
          />
        </div>

        <HeroClientStrip
          clients={heroClients}
          items={carouselItems}
          activeIndex={carouselIndex}
          onSelect={handleClientSelect}
        />
      </div>
    </PageHero>
  );
}
