import Link from "next/link";
import { Seo } from "@/components/seo";
import { portfolio, type PortfolioCategory } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const categories: PortfolioCategory[] = [
  "Data Cockpit",
  "Management System",
  "Portal Website",
  "Mini Program Page",
];

const categoryLabels: Record<PortfolioCategory, { description: string }> = {
  "Data Cockpit": {
    description: "Dashboard and analytics experiences for operational insight.",
  },
  "Management System": {
    description:
      "Enterprise management interfaces with workflow and permission control.",
  },
  "Portal Website": {
    description:
      "Public-facing websites that balance branding, content, and conversion.",
  },
  "Mini Program Page": {
    description:
      "Lightweight mini program experiences optimized for mobile scenarios.",
  },
};

const categoryColor = (category: PortfolioCategory) =>
  `--portfolio-${category.toLowerCase().replace(/\s+/g, "-")}`;

export default function PortfolioPage() {
  return (
    <>
      <Seo title="Portfolio" />

      <div className="space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--accent))]">
            Portfolio
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected projects by type
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Four project categories with distinct visual styles, interactive
            previews, and detailed case studies for dashboard, management,
            portal, and mini-program pages.
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
                    const colorVar = categoryColor(item.category);
                    return (
                      <Link
                        key={item.slug}
                        href={`/portfolio/${item.slug}`}
                        className="group"
                      >
                        <Card className="overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <div
                            className="h-48 bg-[length:220%] bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `linear-gradient(135deg, hsl(var(${colorVar})) 0%, hsla(var(${colorVar}), 0.18) 40%, transparent 100%)`,
                            }}
                          >
                            <div className="flex h-full flex-col justify-between p-5 text-white">
                              <span className="inline-flex rounded-full bg-black/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                {item.category}
                              </span>
                              <div className="space-y-2">
                                <p className="text-sm font-semibold leading-tight drop-shadow-sm">
                                  {item.title}
                                </p>
                                <p className="max-w-sm text-xs leading-5 text-white/80">
                                  {item.summary}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4 p-5">
                            <div className="flex items-center justify-between gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                              <span>{item.timeframe}</span>
                              <span className="rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 text-[hsl(var(--muted-foreground))]">
                                {item.role}
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
