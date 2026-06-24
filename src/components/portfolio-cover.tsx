import { useState } from "react";
import { cn } from "@/lib/utils";
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
  variant?: "card" | "stage";
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
      <div className={cn("px-2 sm:px-4", className)}>
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
