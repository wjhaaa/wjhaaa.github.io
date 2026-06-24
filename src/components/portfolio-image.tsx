import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PortfolioImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function PortfolioImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  fill = false,
}: PortfolioImageProps) {
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "surface-tertiary flex items-center justify-center",
          fill ? "absolute inset-0" : "",
          className,
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-caption text-[hsl(var(--muted-foreground))]">
          Preview coming soon
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden surface-tertiary",
        fill ? "h-full w-full" : "",
        className,
      )}
      style={!fill ? { width, height } : undefined}
    >
      {isLoading ? (
        <div className="absolute inset-0 animate-pulse bg-[hsl(var(--muted))]" />
      ) : null}

      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        loading={priority ? "eager" : "lazy"}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
}
