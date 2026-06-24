import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";
import { categoryLabels } from "@/content/portfolio";
import { PortfolioCover } from "@/components/portfolio-cover";

type CaseStudyCardProps = {
  item: PortfolioItem;
  priority?: boolean;
  metric?: { before: string; after: string; label: string };
};

export function CaseStudyCard({
  item,
  priority = false,
  metric,
}: CaseStudyCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <PortfolioCover item={item} priority={priority} variant="stage" />
      <div className="space-y-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">
              {categoryLabels[item.category]} · {item.timeframe}
            </p>
            <h3 className="mt-2 text-[24px] font-semibold leading-tight tracking-tight sm:text-[28px]">
              {item.title}
            </h3>
          </div>
          {metric ? (
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-right">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">
                {metric.label}
              </p>
              <p className="mt-1 flex items-baseline justify-end gap-2">
                <span className="text-[13px] text-[hsl(var(--muted-foreground))] line-through">
                  {metric.before}
                </span>
                <span className="text-[28px] font-semibold leading-none text-[hsl(var(--link))]">
                  {metric.after}
                </span>
              </p>
            </div>
          ) : null}
        </div>

        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">
              挑战
            </dt>
            <dd className="mt-2 text-[15px] leading-[1.47] text-[hsl(var(--foreground))]">
              {item.details.challenge}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">
              方案
            </dt>
            <dd className="mt-2 text-[15px] leading-[1.47] text-[hsl(var(--foreground))]">
              {item.details.solution}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">
              结果
            </dt>
            <dd className="mt-2 text-[15px] leading-[1.47] text-[hsl(var(--foreground))]">
              {item.details.result}
            </dd>
          </div>
        </dl>

        <Link
          href={`/portfolio/${item.slug}`}
          className="inline-flex text-[17px] text-[hsl(var(--link))] hover:underline"
        >
          查看项目详情 ›
        </Link>
      </div>
    </article>
  );
}

type ProjectCardProps = {
  item: PortfolioItem;
  priority?: boolean;
};

export function ProjectCard({ item, priority = false }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${item.slug}`} className="group block space-y-4">
      <PortfolioCover item={item} priority={priority} variant="card" />
      <div className="space-y-2 px-1">
        <p className="text-[12px] uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">
          {categoryLabels[item.category]}
        </p>
        <h3 className="text-[21px] font-semibold leading-tight text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--link))]">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-[14px] leading-[1.5] text-[hsl(var(--muted-foreground))]">
          {item.details.result}
        </p>
      </div>
    </Link>
  );
}
