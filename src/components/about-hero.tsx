import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";

export function AboutHero() {
  return (
    <PageHero>
      <p className="text-headline text-[hsl(var(--muted-foreground))]">
        {siteConfig.titleZh}
      </p>
      <h1 className="text-hero mt-3 text-[hsl(var(--foreground))]">
        {profile.name}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-[21px] leading-[1.381] text-[hsl(var(--muted-foreground))]">
        擅长现代化 React 架构、TypeScript 以及数据可视化。专注企业级中后台、数据驾驶舱与跨端交付。
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href={siteConfig.resumePath} className="apple-link">
          Download resume ›
        </Link>
        <span className="text-[hsl(var(--border))]">|</span>
        <a
          href={siteConfig.github}
          className="apple-link"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub ›
        </a>
      </div>
    </PageHero>
  );
}
