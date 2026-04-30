import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        variant === "default" &&
          "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        variant === "secondary" &&
          "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        variant === "outline" && "border-[hsl(var(--border))] text-inherit",
        className,
      )}
      {...props}
    />
  );
}

