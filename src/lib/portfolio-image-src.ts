import thumbManifest from "@/generated/portfolio-thumbs.json";

const thumbs = thumbManifest as Record<string, string>;

export function getPortfolioThumbSrc(src: string) {
  return thumbs[src] ?? src;
}

export function getPortfolioImageSrc(
  src: string,
  variant: "card" | "stage" | "thumb",
) {
  if (variant === "stage") return src;
  return getPortfolioThumbSrc(src);
}
