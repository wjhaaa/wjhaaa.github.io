import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { PageHero } from "@/components/page-hero";
import { PortfolioCover } from "@/components/portfolio-cover";
import { portfolio, type PortfolioItem } from "@/content/portfolio";

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
  const galleryImages = item.images ?? [];

  return (
    <>
      <Seo title={item.title} description={item.summary} />

      <div className="space-y-16 pb-16">
        <PageHero>
          <Link href="/portfolio" className="apple-link text-[14px]">
            ← Portfolio
          </Link>
          <p className="mt-6 text-caption uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            {item.category} · {item.timeframe}
          </p>
          <h1 className="text-hero mx-auto mt-3 max-w-4xl text-balance">
            {item.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[21px] leading-[1.381] text-[hsl(var(--muted-foreground))]">
            {item.summary}
          </p>
        </PageHero>

        <section className="page-bleed bg-[#000] py-12 sm:py-16">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <PortfolioCover item={item} priority variant="stage" />
          </div>
        </section>

        <section className="grid gap-8 border-t border-[hsl(var(--border))] pt-12 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-caption uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
              Role
            </p>
            <p className="text-[19px] font-semibold">{item.role}</p>
          </div>
          <div className="space-y-3 lg:col-span-2">
            <p className="text-caption uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
              Impact
            </p>
            <p className="text-[19px] leading-[1.47] text-[hsl(var(--foreground))]">
              {item.details.result}
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            { label: "Challenge", value: item.details.challenge },
            { label: "Solution", value: item.details.solution },
            { label: "Result", value: item.details.result },
          ].map((block) => (
            <div key={block.label} className="rounded-2xl surface-tertiary p-6">
              <p className="text-caption uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
                {block.label}
              </p>
              <p className="mt-4 text-[17px] leading-[1.47] text-[hsl(var(--foreground))]">
                {block.value}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Highlights
            </h2>
            <ul className="space-y-4">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="border-b border-[hsl(var(--border))] pb-4 text-[17px] leading-[1.47] text-[hsl(var(--muted-foreground))]"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-[12px] text-[hsl(var(--foreground))]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {galleryImages.length > 1 ? (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Visual Preview
            </h2>
            <div className="grid gap-10">
              {galleryImages.slice(1).map((src) => (
                <div key={src} className="page-bleed bg-[#000] py-8">
                  <div className="mx-auto max-w-[1000px] px-6">
                    <PortfolioCover
                      item={{ ...item, images: [src], coverImage: src }}
                      variant="stage"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
