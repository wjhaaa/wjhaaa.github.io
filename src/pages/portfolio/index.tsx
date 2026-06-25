import { Seo } from "@/components/seo";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-showcase";
import {
  portfolio,
  categoryLabels,
  categorySectionDescriptions,
  getClientNameForSlug,
  type PortfolioCategory,
} from "@/content/portfolio";
import { siteConfig } from "@/lib/site-config";

const categories: PortfolioCategory[] = [
  "Data Cockpit",
  "Management System",
  "Portal Website",
  "Mini Program Page",
];

export default function PortfolioPage() {
  return (
    <>
      <Seo title="作品集" description={siteConfig.description} />

      <div className="pb-16">
        <PageHero particleSubtle>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            作品集
          </p>
          <h1 className="text-hero mt-3">项目合集</h1>
          <p className="mx-auto mt-6 px-6 text-pretty text-[21px] leading-[1.381] text-[hsl(var(--muted-foreground))] lg:max-w-none lg:whitespace-nowrap lg:px-0">
            数据驾驶舱、管理端、门户页与小程序 — 覆盖能源、制造、金融与消费品牌等行业。
          </p>
        </PageHero>

        <div className="mt-12 space-y-14">
          {categories.map((category) => {
            const items = portfolio.filter(
              (item) => item.category === category,
            );
            if (!items.length) return null;

            return (
              <section key={category} className="space-y-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
                      {categoryLabels[category]}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      {categorySectionDescriptions[category]}
                    </h2>
                  </div>
                  <p className="text-[12px] text-[hsl(var(--muted-foreground))]">
                    {items.length} 个项目
                  </p>
                </div>

                <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <ProjectCard
                      key={item.slug}
                      item={item}
                      clientName={getClientNameForSlug(item.slug)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
