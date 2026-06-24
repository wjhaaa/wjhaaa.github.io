import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProfileAvatar } from "@/components/profile-avatar";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";

export function AboutHero() {
  return (
    <PageHero align="left" particleSubtle>
      <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
        <ProfileAvatar size="xl" priority />

        <div className="max-w-2xl">
          <p className="text-[14px] font-medium text-[hsl(var(--link))]">
            {siteConfig.titleZh}
          </p>
          <h1 className="text-hero mt-3 text-[hsl(var(--foreground))]">
            {siteConfig.nameZh}
          </h1>
          <p className="mt-1 text-[15px] text-[hsl(var(--muted-foreground))]">
            {profile.name}
          </p>
          <p className="mt-5 text-[19px] leading-[1.42] text-[hsl(var(--muted-foreground))]">
            擅长现代化 React 架构、TypeScript 以及数据可视化。专注企业级中后台、数据驾驶舱与跨端交付。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={siteConfig.resumePath} className="apple-link">
              下载简历 ›
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
        </div>
      </div>
    </PageHero>
  );
}
