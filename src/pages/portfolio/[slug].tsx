import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { PageHero } from "@/components/page-hero";
import { PortfolioCover } from "@/components/portfolio-cover";
import {
  portfolio,
  categoryLabels,
  getClientNameForSlug,
  getPortfolioNeighbors,
  type PortfolioItem,
} from "@/content/portfolio";

type Props = {
  item: PortfolioItem;
  prev: PortfolioItem | null;
  next: PortfolioItem | null;
};

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

  const { prev, next } = getPortfolioNeighbors(slug);

  return { props: { item, prev, next } };
};

export default function PortfolioDetailPage({ item, prev, next }: Props) {
  const galleryImages = item.images ?? [];
  const clientName = getClientNameForSlug(item.slug);

  return (
    <>
      <Seo
        title={item.title}
        description={item.summary}
        image={item.coverImage ?? item.images?.[0]}
      />

      <div className="space-y-16 pb-16">
        <PageHero align="left" particleSubtle>
          <Link href="/portfolio" className="apple-link text-[14px]">
            ← 作品集
          </Link>
          <p className="mt-6 text-caption uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            {clientName ? `${clientName} · ` : ""}
            {categoryLabels[item.category]} · {item.timeframe}
          </p>
          <h1 className="text-hero mt-3 max-w-4xl text-balance">
            {item.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[21px] leading-[1.381] text-[hsl(var(--muted-foreground))]">
            {item.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            {item.role ? (
              <p className="text-[hsl(var(--muted-foreground))]">
                <span className="text-[hsl(var(--foreground))]">角色</span>
                {" · "}
                {item.role}
              </p>
            ) : null}
            {item.impact ? (
              <p className="max-w-2xl text-[hsl(var(--muted-foreground))]">
                <span className="text-[hsl(var(--foreground))]">成果</span>
                {" · "}
                {item.impact}
              </p>
            ) : null}
          </div>
        </PageHero>

        <section className="page-bleed bg-[#000] py-12 sm:py-16">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
            <PortfolioCover item={item} priority variant="stage" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            { label: "挑战", value: item.details.challenge },
            { label: "方案", value: item.details.solution },
            { label: "结果", value: item.details.result },
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

        <section className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">项目亮点</h2>
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

          <div className="space-y-3 border-t border-[hsl(var(--border))] pt-8">
            <p className="text-caption uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
              技术栈
            </p>
            <p className="text-[15px] leading-[1.6] text-[hsl(var(--muted-foreground))]">
              {item.techStack.join(" · ")}
            </p>
          </div>
        </section>

        {galleryImages.length > 1 ? (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">更多截图</h2>
            <div className="grid gap-10">
              {galleryImages.slice(1).map((src) => (
                <div key={src} className="page-bleed bg-[#000] py-8">
                  <div className="mx-auto max-w-[1000px] px-6 lg:px-16">
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

        {prev || next ? (
          <nav
            className="flex flex-col gap-4 border-t border-[hsl(var(--border))] pt-10 sm:flex-row sm:items-center sm:justify-between"
            aria-label="同品类项目导航"
          >
            {prev ? (
              <Link href={`/portfolio/${prev.slug}`} className="group max-w-md">
                <p className="text-[12px] uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))]">
                  上一个 · {categoryLabels[item.category]}
                </p>
                <p className="mt-1 text-[17px] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--link))]">
                  ← {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/portfolio/${next.slug}`}
                className="group max-w-md sm:text-right"
              >
                <p className="text-[12px] uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))]">
                  下一个 · {categoryLabels[item.category]}
                </p>
                <p className="mt-1 text-[17px] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--link))]">
                  {next.title} →
                </p>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>
    </>
  );
}
