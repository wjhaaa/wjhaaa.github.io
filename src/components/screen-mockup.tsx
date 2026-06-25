import Image from "next/image";
import { cn } from "@/lib/utils";
import { getPortfolioImageSrc } from "@/lib/portfolio-image-src";
import type { PortfolioCategory } from "@/content/portfolio";

export type MockupVariant = "display" | "browser" | "phone";

export function mockupForCategory(category: PortfolioCategory): MockupVariant {
  if (category === "Mini Program Page") return "phone";
  return "display";
}

type ScreenMockupProps = {
  src: string;
  alt: string;
  variant?: MockupVariant;
  priority?: boolean;
  imageVariant?: "card" | "stage";
  className?: string;
  onError?: () => void;
};

function MockupScreen({
  src,
  alt,
  priority,
  imageVariant = "stage",
  onError,
  className,
  objectPosition = "top",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  imageVariant?: "card" | "stage";
  onError?: () => void;
  className?: string;
  objectPosition?: "top" | "center";
}) {
  const resolvedSrc = getPortfolioImageSrc(src, imageVariant);

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#0a0a0a]", className)}>
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={onError}
        className={cn(
          "object-cover",
          objectPosition === "top" ? "object-top" : "object-center",
        )}
        sizes={
          imageVariant === "card"
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
        }
      />
    </div>
  );
}

function DisplayMockup({
  src,
  alt,
  priority,
  onError,
  className,
  size = "lg",
  imageVariant = "stage",
}: ScreenMockupProps & { size?: "lg" | "sm" }) {
  return (
    <div className={cn("mockup-stage", className)}>
      <div
        className={cn(
          "mockup-display",
          size === "sm" ? "mockup-display-sm" : "mockup-display-lg",
        )}
      >
        <div className="mockup-display-bezel">
          <MockupScreen
            src={src}
            alt={alt}
            priority={priority}
            imageVariant={imageVariant}
            onError={onError}
            className="aspect-[16/10]"
          />
        </div>
        <div className="mockup-display-chin" />
        <div className="mockup-display-stand" />
      </div>
    </div>
  );
}

function BrowserMockup({
  src,
  alt,
  priority,
  imageVariant = "stage",
  onError,
  className,
}: ScreenMockupProps) {
  return (
    <div className={cn("mockup-stage", className)}>
      <div className="mockup-browser">
        <div className="mockup-browser-toolbar">
          <div className="mockup-traffic-lights" aria-hidden>
            <span className="mockup-dot mockup-dot-red" />
            <span className="mockup-dot mockup-dot-yellow" />
            <span className="mockup-dot mockup-dot-green" />
          </div>
          <div className="mockup-browser-url">
            <span className="truncate">{alt}</span>
          </div>
        </div>
        <MockupScreen
          src={src}
          alt={alt}
          priority={priority}
          imageVariant={imageVariant}
          onError={onError}
          className="aspect-[16/10]"
        />
      </div>
    </div>
  );
}

function PhoneMockup({
  src,
  alt,
  priority,
  imageVariant = "stage",
  onError,
  className,
}: ScreenMockupProps) {
  return (
    <div className={cn("mockup-stage flex justify-center", className)}>
      <div className="mockup-phone">
        <div className="mockup-phone-island" aria-hidden />
        <MockupScreen
          src={src}
          alt={alt}
          priority={priority}
          imageVariant={imageVariant}
          onError={onError}
          className="aspect-[9/19.5]"
          objectPosition="top"
        />
        <div className="mockup-phone-home" aria-hidden />
      </div>
    </div>
  );
}

export function ScreenMockup({
  src,
  alt,
  variant = "display",
  priority,
  className,
  onError,
}: ScreenMockupProps) {
  if (variant === "browser") {
    return (
      <BrowserMockup
        src={src}
        alt={alt}
        priority={priority}
        onError={onError}
        className={className}
      />
    );
  }

  if (variant === "phone") {
    return (
      <PhoneMockup
        src={src}
        alt={alt}
        priority={priority}
        onError={onError}
        className={className}
      />
    );
  }

  return (
    <DisplayMockup
      src={src}
      alt={alt}
      priority={priority}
      onError={onError}
      className={className}
      size="lg"
    />
  );
}

export function ScreenMockupCompact(props: ScreenMockupProps) {
  const compactProps = { ...props, imageVariant: "card" as const };

  if (compactProps.variant === "phone") {
    return <PhoneMockup {...compactProps} />;
  }

  if (compactProps.variant === "browser") {
    return <BrowserMockup {...compactProps} />;
  }

  return <DisplayMockup {...compactProps} size="sm" />;
}
