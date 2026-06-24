import Link from "next/link";
import { Seo } from "@/components/seo";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";
import { AboutHero } from "@/components/about-hero";
import { SkillsGrid } from "@/components/skills-grid";

const focusSkills = [
  "React",
  "TypeScript",
  "ECharts",
  "Ant Design",
  "TailwindCSS",
  "Vue3",
  "Taro",
];

export default function AboutPage() {
  return (
    <>
      <Seo title="关于" description={siteConfig.description} />

      <div className="space-y-20 pb-16">
        <AboutHero />

        <section className="grid gap-8 border-t border-[hsl(var(--border))] pt-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">联系</h2>
            <p className="text-[17px] text-[hsl(var(--muted-foreground))]">
              {profile.email}
            </p>
            <div className="flex flex-wrap gap-4">
              {profile.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="apple-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                >
                  {link.label} ›
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">专注方向</h2>
            <p className="text-[17px] leading-[1.47] text-[hsl(var(--muted-foreground))]">
              数据可视化 · 企业级 React 中后台 · 大屏响应式适配
            </p>
            <div className="flex flex-wrap gap-2">
              {focusSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-[12px] text-[hsl(var(--foreground))]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <SkillsGrid />
      </div>
    </>
  );
}
