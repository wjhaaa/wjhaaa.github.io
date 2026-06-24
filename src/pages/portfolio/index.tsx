import Link from "next/link";
import { Seo } from "@/components/seo";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-showcase";
import { portfolio, type PortfolioCategory } from "@/content/portfolio";
import { siteConfig } from "@/lib/site-config";

const categories: PortfolioCategory[] = [
  "Data Cockpit",
  "Management System",
  "Portal Website",
  "Mini Program Page",
];

const categoryLabels: Record<PortfolioCategory, string> = {
  "Data Cockpit": "企业碳排放与业务数据驾驶舱",
  "Management System": "企业级碳管理与中后台系统",
  "Portal Website": "品牌门户与产品官网",
  "Mini Program Page": "小程序与移动端碳账户",
};

export default function PortfolioPage() {
  return (
    <>
      <Seo title="作品集" description={siteConfig.description} />

      <div className="pb-16">
        <PageHero>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            Portfolio
          </p>
          <h1 className="text-hero mt-3">项目合集</h1>
          <p className="mx-auto mt-6 max-w-3xl text-[21px] leading-[1.381] text-[hsl(var(--muted-foreground))]">
            数据驾驶舱、管理端、门户页与小程序 — 覆盖能源、制造、金融与消费品牌等行业。
          </p>
        </PageHero>

        <div className="space-y-20">
          {categories.map((category) => {
            const items = portfolio.filter((item) => item.category === category);
            if (!items.length) return null;

            return (
              <section key={category} className="space-y-8">
                <div className="flex flex-col gap-2 border-t border-[hsl(var(--border))] pt-10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      {category}
                    </h2>
                    <p className="mt-2 text-[17px] text-[hsl(var(--muted-foreground))]">
                      {categoryLabels[category]}
                    </p>
                  </div>
                  <p className="text-[12px] text-[hsl(var(--muted-foreground))]">
                    {items.length} projects
                  </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  {items.map((item) => (
                    <ProjectCard key={item.slug} item={item} />
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
