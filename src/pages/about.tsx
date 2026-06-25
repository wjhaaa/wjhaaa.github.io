import Link from "next/link";
import { Seo } from "@/components/seo";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";
import { AboutHero } from "@/components/about-hero";
import { SkillsGrid } from "@/components/skills-grid";

export default function AboutPage() {
  return (
    <>
      <Seo title="关于" description={siteConfig.description} />

      <div className="space-y-14 pb-16">
        <AboutHero />

        <SkillsGrid />

        <section className="border-t border-[hsl(var(--border))] pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">联系</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {profile.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="apple-link text-[15px]"
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
            <Link href={siteConfig.resumePath} className="apple-link text-[15px]">
              下载简历 ›
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
