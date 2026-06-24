import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";
import { portfolio } from "@/content/portfolio";
import { HeroCarousel } from "@/components/hero-carousel";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

type HomeScreenProps = {
  featured: PortfolioItem;
  carouselItems: PortfolioItem[];
};

export function HomeScreen({ featured, carouselItems }: HomeScreenProps) {
  const { heroMetric, aiDashboard } = siteConfig;

  return (
    <PageHero
      align="left"
      particleSubtle
      particleEdgeMask
      className="flex min-h-[calc(100dvh-2.75rem)] flex-col pb-5 pt-6 lg:pb-6 lg:pt-8"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="min-w-0 max-w-xl">
            <p className="text-[13px] font-medium text-[hsl(var(--link))] sm:text-[14px]">
              {siteConfig.titleZh} · {siteConfig.tagline}
            </p>
            <h1 className="text-hero mt-3 text-balance text-[hsl(var(--foreground))] sm:mt-4">
              {siteConfig.nameZh}
            </h1>
            <p className="mt-4 line-clamp-3 text-balance text-[15px] leading-[1.42] text-[hsl(var(--muted-foreground))] sm:mt-5 sm:line-clamp-none sm:text-[17px] lg:text-[18px]">
              {siteConfig.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))] sm:text-[12px]">
                {heroMetric.label}
              </p>
              <p className="mt-1 flex items-baseline gap-3">
                <span className="text-[14px] text-[hsl(var(--muted-foreground))] line-through decoration-[hsl(var(--muted-foreground))]/50 sm:text-[15px]">
                  {heroMetric.before}
                </span>
                <span className="text-[36px] font-semibold leading-none tracking-tight text-[hsl(var(--foreground))] sm:text-[44px] lg:text-[48px]">
                  {heroMetric.after}
                </span>
              </p>
              <p className="mt-1 text-[12px] text-[hsl(var(--muted-foreground))] sm:text-[13px]">
                {featured.title}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Button asChild size="lg">
                <Link href="/portfolio">查看作品集</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={siteConfig.resumePath}>下载简历</Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0 w-full">
            <HeroCarousel items={carouselItems} />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-[hsl(var(--border))]/80 pt-5 lg:mt-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {siteConfig.clients.map((client) => (
              <li
                key={client}
                className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/80 px-2.5 py-1 text-[11px] font-medium text-[hsl(var(--foreground))] sm:px-3 sm:text-[12px]"
              >
                {client}
              </li>
            ))}
          </ul>
          <p className="shrink-0 text-[13px] text-[hsl(var(--muted-foreground))] sm:text-[14px]">
            <Link href={aiDashboard.href} className="apple-link text-[13px] sm:text-[14px]">
              AI 驾驶舱 Demo ›
            </Link>
            <span className="mx-2 text-[hsl(var(--border))]">·</span>
            共 {portfolio.length} 个项目 ·{" "}
            <Link href="/portfolio" className="apple-link text-[13px] sm:text-[14px]">
              查看全部 ›
            </Link>
          </p>
        </div>
      </div>
    </PageHero>
  );
}
