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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-[hsl(var(--muted))] flex items-center justify-center",
          fill ? "absolute inset-0" : "",
          className,
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
          Image not available
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[hsl(var(--muted))]",
        fill ? "w-full h-full" : "",
        className,
      )}
      style={!fill ? { width, height } : undefined}
    >
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--muted))] via-[hsl(var(--card))] to-[hsl(var(--muted))] bg-[length:200%_100%] animate-pulse" />
      )}

      {/* Image */}
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
