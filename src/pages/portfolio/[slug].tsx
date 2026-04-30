import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Props = { item: PortfolioItem };

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
  return (
    <>
      <Seo title={item.title} description={item.summary} />

      <div className="space-y-6">
        <div className="space-y-2">
          <Link
            href="/portfolio"
            className="text-sm text-[hsl(var(--muted-foreground))] hover:underline hover:underline-offset-4"
          >
            ← Back to portfolio
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {item.category}
            {item.timeframe ? ` · ${item.timeframe}` : ""}
          </p>
          <p className="max-w-3xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">
            {item.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-base font-semibold tracking-tight">
              Highlights
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

