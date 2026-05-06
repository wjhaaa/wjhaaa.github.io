import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Props = { item: PortfolioItem };

const categoryColor = (category: string) =>
  `--portfolio-${category.toLowerCase().replace(/\s+/g, "-")}`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: portfolio.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug ?? "");
  const item = portfolio.find((p) => p.slug === slug);
  if (!item) return { notFound: true };
  return { props: { item } };
};

export default function PortfolioDetailPage({ item }: Props) {
  const colorVar = categoryColor(item.category);
  const galleryItems = item.images ?? [item.title, item.title, item.title];

  return (
    <>
      <Seo title={item.title} description={item.summary} />

      <div className="space-y-8">
        <div className="space-y-3">
          <Link
            href="/portfolio"
            className="text-sm text-[hsl(var(--muted-foreground))] hover:underline hover:underline-offset-4"
          >
            ← Back to portfolio
          </Link>
          <div className="space-y-2 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                {item.category}
              </span>
              <span className="rounded-full bg-[hsl(var(--primary))] px-3 py-1 text-xs font-medium text-[hsl(var(--primary-foreground))]">
                {item.timeframe}
              </span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              {item.summary}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                  Role
                </p>
                <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                  {item.role}
                </p>
              </div>
              <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                  Impact
                </p>
                <p className="mt-2 text-sm font-medium text-[hsl(var(--foreground))]">
                  {item.impact}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div
                  className="h-72 bg-size-[220%] bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsl(var(${colorVar})) 0%, hsla(var(${colorVar}), 0.25) 35%, transparent 100%)`,
                  }}
                >
                  <div className="flex h-full flex-col justify-end p-6">
                    <div className="rounded-3xl bg-black/20 p-4 text-white backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                        Project Snapshot
                      </p>
                      <p className="mt-2 text-xl font-semibold leading-tight">
                        Visual communication and interactive detail panels.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                      Overview
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                      {item.summary}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl bg-[hsl(var(--muted))] p-4 text-sm text-[hsl(var(--foreground))]">
                      <p className="font-semibold">Challenge</p>
                      <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                        {item.details.challenge}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-[hsl(var(--muted))] p-4 text-sm text-[hsl(var(--foreground))]">
                      <p className="font-semibold">Solution</p>
                      <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                        {item.details.solution}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-[hsl(var(--muted))] p-4 text-sm text-[hsl(var(--foreground))]">
                      <p className="font-semibold">Result</p>
                      <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                        {item.details.result}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                    Tech stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                    Highlights
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Retrospective
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Lessons learned, optimization points, and future improvements.
              </p>
            </div>
            <div className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
              {item.category}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {item.retrospective.map((note) => (
              <Card
                key={note}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="p-6 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {note}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Visual preview
          </h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {galleryItems.map((title, index) => (
              <div
                key={`${title}-${index}`}
                className="min-w-75 shrink-0 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(var(${colorVar}), 0.2) 0%, transparent 100%)`,
                }}
              >
                <div className="mb-4 h-40 rounded-3xl bg-[hsl(var(--muted))]" />
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                  {item.title}
                </p>
                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  Preview card for project illustration and mobile-friendly
                  layout.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
