import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getPortfolioImageSrc } from "@/lib/portfolio-image-src";
import type { PortfolioCategory, PortfolioItem } from "@/content/portfolio";
import {
  mockupForCategory,
  ScreenMockup,
  ScreenMockupCompact,
  type MockupVariant,
} from "@/components/screen-mockup";

function getCoverSrc(item: Pick<PortfolioItem, "images"> & { coverImage?: string }) {
  return item.coverImage ?? item.images?.[0] ?? "";
}

type PortfolioCoverProps = {
  item: Pick<PortfolioItem, "title" | "category" | "images"> & {
    coverImage?: string;
    mockup?: MockupVariant;
  };
  className?: string;
  priority?: boolean;
  variant?: "card" | "stage" | "thumb";
};

export function PortfolioCover({
  item,
  className,
  priority = false,
  variant = "card",
}: PortfolioCoverProps) {
  const src = getCoverSrc(item);
  const [hasError, setHasError] = useState(false);
  const mockup = item.mockup ?? mockupForCategory(item.category as PortfolioCategory);
  const showPlaceholder = !src || hasError;

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-[#1d1d1f] px-8 text-center",
          className,
        )}
      >
        <p className="text-[12px] uppercase tracking-[0.12em] text-[#86868b]">
          {item.category}
        </p>
        <p className="max-w-md text-[21px] font-semibold leading-tight text-white">
          {item.title}
        </p>
      </div>
    );
  }

  if (variant === "stage") {
    return (
      <div className={cn("w-full px-2 sm:px-4", className)}>
        <ScreenMockup
          src={src}
          alt={item.title}
          variant={mockup}
          priority={priority}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  if (variant === "thumb") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-[hsl(var(--border))]/80 bg-[#0a0a0a] transition-[transform,box-shadow] duration-300 group-hover:border-[hsl(var(--border))] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
          className,
        )}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={getPortfolioImageSrc(src, "thumb")}
            alt={item.title}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setHasError(true)}
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group", className)}>
      <ScreenMockupCompact
        src={src}
        alt={item.title}
        variant={mockup}
        priority={priority}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
