import Link from "next/link";
import { Seo } from "@/components/seo";
import { AiDashboardPromo } from "@/components/ai-dashboard-promo";
import { HomeHero } from "@/components/home-hero";
import { CaseStudyCard } from "@/components/project-showcase";
import {
  getHeroPortfolio,
  getHomeCaseStudies,
  portfolio,
} from "@/content/portfolio";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const hero = getHeroPortfolio();
  const caseStudies = getHomeCaseStudies();

  return (
    <>
      <Seo
        title={siteConfig.titleZh}
        description={siteConfig.description}
        image={siteConfig.ogImage}
      />

      {hero ? <HomeHero featured={hero} /> : null}

      <section className="border-y border-[hsl(var(--border))] py-8">
        <p className="text-center text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
          服务客户
        </p>
        <ul className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-2 px-4">
          {siteConfig.clients.map((client) => (
            <li
              key={client}
              className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-3.5 py-1.5 text-[13px] font-medium text-[hsl(var(--foreground))]"
            >
              {client}
            </li>
          ))}
        </ul>
      </section>

      <AiDashboardPromo />

      <section className="py-16 lg:py-24">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            代表作品
          </h2>
          <p className="mt-3 max-w-xl text-[17px] text-[hsl(var(--muted-foreground))]">
            挑战 · 方案 · 结果 — 用交付细节说话
          </p>
        </div>
        <div className="space-y-10">
          {caseStudies.map((item, index) => (
            <CaseStudyCard
              key={item.slug}
              item={item}
              priority={index === 0}
              metric={
                item.slug === siteConfig.heroSlug
                  ? siteConfig.heroMetric
                  : undefined
              }
            />
          ))}
        </div>
        <p className="mt-12 text-[17px] text-[hsl(var(--muted-foreground))]">
          共交付 {portfolio.length} 个项目 ·{" "}
          <Link href="/portfolio" className="apple-link">
            查看全部 ›
          </Link>
        </p>
      </section>
    </>
  );
}
