import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PortfolioImage } from "@/components/portfolio-image";

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
          <div className="space-y-2 bg-[hsl(var(--card))]">
            <h1 className="text-4xl mt-5 font-semibold tracking-tight sm:text-5xl">
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
              <Card>
                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                      Overview
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

              <Card>
                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                      Retrospective
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {item.retrospective.map((note) => (
                      <div
                        key={note}
                        className="rounded-3xl bg-[hsl(var(--muted))] p-4 text-sm text-[hsl(var(--foreground))]"
                      >
                        <div className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                          {note}
                        </div>
                      </div>
                    ))}
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

        <section className="space-y-4"></section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Visual preview
          </h2>
          <div className="py-2 space-y-4">
            {galleryItems.map((title, index) => (
              <div key={index} className="relative w-full aspect-video">
                <PortfolioImage
                  src={`${title}`}
                  alt={title}
                  fill={true}
                  priority={index === 0}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
