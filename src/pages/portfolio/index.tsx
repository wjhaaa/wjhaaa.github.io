import Link from "next/link";
import { Seo } from "@/components/seo";
import { portfolio, type PortfolioCategory } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const categories: PortfolioCategory[] = ["B2B", "B2C", "Other"];

export default function PortfolioPage() {
  return (
    <>
      <Seo title="Portfolio" />

      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Case studies grouped by category.
          </p>
        </header>

        <div className="space-y-8">
          {categories.map((cat) => {
            const items = portfolio.filter((p) => p.category === cat);
            return (
              <section key={cat} className="space-y-3">
                <h2 className="text-lg font-semibold tracking-tight">{cat}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((p) => (
                    <Card key={p.slug}>
                      <CardHeader className="space-y-2">
                        <Link
                          href={`/portfolio/${p.slug}`}
                          className="text-base font-semibold hover:underline hover:underline-offset-4"
                        >
                          {p.title}
                        </Link>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          {p.summary}
                        </p>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>
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

