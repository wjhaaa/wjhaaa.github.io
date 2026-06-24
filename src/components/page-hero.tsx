import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { ParticleField } from "@/components/particle-field";

type PageHeroProps = PropsWithChildren<{
  className?: string;
  align?: "center" | "left";
}>;

export function PageHero({
  children,
  className,
  align = "center",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "page-bleed relative overflow-hidden",
        "bg-gradient-to-b from-[#07070d] via-[#030303] to-[hsl(var(--background))]",
        "pb-14 pt-10 lg:pb-20 lg:pt-14",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(41,151,255,0.14),transparent_58%)]"
      />
      <ParticleField className="opacity-80" />
      <div
        className={cn(
          "relative z-10",
          align === "center" && "mx-auto max-w-4xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}
