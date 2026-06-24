import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[17px] font-normal transition-opacity duration-160 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  default:
    "rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-88",
  secondary:
    "rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:opacity-80",
  outline:
    "rounded-full border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]",
  ghost:
    "rounded-full bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]",
  link: "rounded-none bg-transparent p-0 text-[hsl(var(--link))] hover:underline hover:underline-offset-4",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-10 px-5",
  sm: "h-9 px-4 text-[14px]",
  lg: "h-11 px-6 text-[17px]",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        base,
        variants[variant],
        variant !== "link" && sizes[size],
        className,
      )}
      {...props}
    />
  );
}
