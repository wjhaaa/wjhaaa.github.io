import Link from "next/link";
import { Seo } from "@/components/seo";
import { portfolio, type PortfolioCategory } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PortfolioImage } from "@/components/portfolio-image";

const categories: PortfolioCategory[] = [
  "Data Cockpit",
  "Management System",
  "Portal Website",
  "Mini Program Page",
];

const categoryLabels: Record<PortfolioCategory, { description: string }> = {
  "Data Cockpit": {
    description: "企业碳排放数据监控数据驾驶舱",
  },
  "Management System": {
    description:
      "企业管理系统管理系统，包括用户管理、角色管理、权限管理等功能。",
  },
  "Portal Website": {
    description: "企业门户网站，展示企业品牌、产品信息、客户案例等。",
  },
  "Mini Program Page": {
    description: "小程序/h5",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Seo title="Portfolio" />
      <div className="space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--accent))]">
            持续更新中...
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">项目合集</h1>
          <p className="max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            覆盖板块：数据驾驶舱、管理端、门户页、小程序页面等，涉及能源、制造、互联网等多个行业。
          </p>
        </header>

        <div className="space-y-10">
          {categories.map((category) => {
            const items = portfolio.filter(
              (item) => item.category === category,
            );
            if (!items.length) return null;
            return (
              <section key={category} className="space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {category}
                    </h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {categoryLabels[category].description}
                    </p>
                  </div>
                  <p className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                    {items.length} case studies
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => {
                    return (
                      <Link
                        key={item.slug}
                        href={`/portfolio/${item.slug}`}
                        className="group"
                      >
                        <Card className="overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <PortfolioImage
                            src={item?.images?.[0] || ""}
                            alt={item.title}
                            fill={true}
                            className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="space-y-4 p-5">
                            <div className="flex items-center justify-between gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                              <span>{item.timeframe}</span>
                              <span className="rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 text-[hsl(var(--muted-foreground))]">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                              {item.impact}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
