import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProfileAvatar } from "@/components/profile-avatar";
import { heroClients, portfolio } from "@/content/portfolio";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";

const aboutMetrics = [
  { label: "前端经验", value: "5+ 年" },
  { label: "交付项目", value: `${portfolio.length} 个` },
  { label: "头部客户", value: `${heroClients.length} 家` },
];

export function AboutHero() {
  return (
    <PageHero align="left" particleSubtle>
      <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
        <ProfileAvatar size="xl" priority />

        <div className="max-w-2xl">
          <p className="text-[14px] font-medium text-[hsl(var(--link))]">
            {siteConfig.titleZh} · {siteConfig.tagline}
          </p>
          <h1 className="text-hero mt-3 text-[hsl(var(--foreground))]">
            {siteConfig.nameZh}
          </h1>
          <p className="mt-1 text-[15px] text-[hsl(var(--muted-foreground))]">
            {profile.name}
          </p>
          <p className="mt-5 text-[17px] leading-[1.47] text-[hsl(var(--muted-foreground))]">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {aboutMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-[12px] uppercase tracking-[0.12em] text-[hsl(var(--muted-foreground))]">
                  {metric.label}
                </p>
                <p className="mt-1 text-[28px] font-semibold leading-none tracking-tight text-[hsl(var(--foreground))]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

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
