import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";
import { PortfolioCover } from "@/components/portfolio-cover";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

type HomeHeroProps = {
  featured: PortfolioItem;
};

export function HomeHero({ featured }: HomeHeroProps) {
  const { heroMetric } = siteConfig;

  return (
    <PageHero align="left" particleSubtle particleEdgeMask>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="min-w-0 max-w-xl">
          <p className="text-[14px] font-medium text-[hsl(var(--link))]">
            {siteConfig.titleZh} · {siteConfig.tagline}
          </p>
          <h1 className="text-hero mt-4 text-balance text-[hsl(var(--foreground))]">
            {siteConfig.nameZh}
          </h1>
          <p className="mt-5 text-balance text-[19px] leading-[1.42] text-[hsl(var(--muted-foreground))]">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3">
            <div>
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
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/portfolio">查看作品集</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={siteConfig.resumePath}>下载简历</Link>
            </Button>
          </div>
        </div>

        <div className="relative min-w-0 w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-4xl bg-[radial-gradient(ellipse_at_50%_50%,rgba(41,151,255,0.14),transparent_70%)] md:-inset-6"
          />
          <PortfolioCover
            item={featured}
            priority
            variant="stage"
            className="w-full"
          />
        </div>
      </div>
    </PageHero>
  );
}
