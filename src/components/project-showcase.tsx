import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";
import {
  categoryLabels,
  getClientNameForSlug,
} from "@/content/portfolio";
import { PortfolioCover } from "@/components/portfolio-cover";

type ProjectCardProps = {
  item: PortfolioItem;
  priority?: boolean;
  clientName?: string;
};

export function ProjectCard({
  item,
  priority = false,
  clientName,
}: ProjectCardProps) {
  const client = clientName ?? getClientNameForSlug(item.slug);

  return (
    <Link href={`/portfolio/${item.slug}`} className="group block space-y-3">
      <PortfolioCover item={item} priority={priority} variant="card" />
      <div className="space-y-1 px-0.5">
        <p className="truncate text-[11px] uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">
          {client ? `${client} · ` : ""}
          {categoryLabels[item.category]}
        </p>
        <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--link))]">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}
