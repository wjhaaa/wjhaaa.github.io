import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const sizeMap = {
  md: "size-24 text-[28px]",
  lg: "size-32 text-[36px] sm:size-36 sm:text-[40px]",
  xl: "size-40 text-[44px] sm:size-44 sm:text-[48px]",
} as const;

type ProfileAvatarProps = {
  className?: string;
  size?: keyof typeof sizeMap;
  priority?: boolean;
};

export function ProfileAvatar({
  className,
  size = "lg",
  priority = false,
}: ProfileAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const src = siteConfig.avatarPath;
  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full bg-gradient-to-br from-[#2997ff] via-[#5ac8fa] to-[#64d2ff] p-[3px] shadow-[0_20px_60px_-20px_rgba(41,151,255,0.55)]",
        sizeMap[size],
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-full bg-[#1d1d1f]">
        {showImage ? (
          <Image
            src={src}
            alt={siteConfig.nameZh}
            fill
            className="object-cover"
            priority={priority}
            onError={() => setHasError(true)}
          />
        ) : (
          <span
            className="flex size-full items-center justify-center font-semibold tracking-tight text-[hsl(var(--foreground))]"
            aria-hidden
          >
            JW
          </span>
        )}
      </div>
    </div>
  );
}
