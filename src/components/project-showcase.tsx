import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";
import { PortfolioCover } from "@/components/portfolio-cover";

type ProjectShowcaseProps = {
  item: PortfolioItem;
  priority?: boolean;
};

export function ProjectShowcase({ item, priority = false }: ProjectShowcaseProps) {
  return (
    <section className="page-bleed bg-[#000] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-[1680px] px-6 text-center lg:px-[90px]">
        <p className="text-[14px] font-medium text-[#2997ff]">Featured Work</p>
        <h2 className="mx-auto mt-3 max-w-4xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">
          {item.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[19px] leading-[1.42] text-[#a1a1a6]">
          {item.details.result}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <Link
            href={`/portfolio/${item.slug}`}
            className="text-[17px] text-[#2997ff] hover:underline"
          >
            Learn more ›
          </Link>
          <Link
            href="/portfolio"
            className="text-[17px] text-[#2997ff] hover:underline"
          >
            View all projects ›
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1200px] px-6 lg:px-10">
        <PortfolioCover item={item} priority={priority} variant="stage" />
      </div>
    </section>
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
          {item.category}
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
