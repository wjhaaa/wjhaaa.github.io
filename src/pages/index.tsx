import Link from "next/link";
import { Seo } from "@/components/seo";
import { PageHero } from "@/components/page-hero";
import { ProjectCard, ProjectShowcase } from "@/components/project-showcase";
import { Button } from "@/components/ui/button";
import {
  getGridPortfolio,
  getHeroPortfolio,
  portfolio,
} from "@/content/portfolio";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const hero = getHeroPortfolio();
  const gridProjects = getGridPortfolio();

  return (
    <>
      <Seo title={siteConfig.titleZh} description={siteConfig.description} />

      <PageHero>
        <p className="text-[17px] text-[hsl(var(--muted-foreground))]">
          {siteConfig.titleZh} · {siteConfig.tagline}
        </p>
        <h1 className="text-hero mt-4 text-balance">{siteConfig.nameZh}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-[21px] leading-[1.381] text-[hsl(var(--muted-foreground))]">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/portfolio">查看作品集</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={siteConfig.resumePath}>下载简历</Link>
          </Button>
        </div>
      </PageHero>

      <section className="border-y border-[hsl(var(--border))] py-8">
        <p className="text-center text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
          服务客户
        </p>
        <ul className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {siteConfig.clients.map((client) => (
            <li
              key={client}
              className="text-[14px] font-medium text-[hsl(var(--foreground))]"
            >
              {client}
            </li>
          ))}
        </ul>
      </section>

      {hero ? <ProjectShowcase item={hero} priority /> : null}

      <section className="py-16 lg:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            精选项目
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[17px] text-[hsl(var(--muted-foreground))]">
            数据驾驶舱、企业管理系统与跨端应用
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {gridProjects.map((item, index) => (
            <ProjectCard key={item.slug} item={item} priority={index === 0} />
          ))}
        </div>
        <p className="mt-12 text-center text-[17px] text-[hsl(var(--muted-foreground))]">
          共交付 {portfolio.length} 个项目 ·{" "}
          <Link href="/portfolio" className="apple-link">
            查看全部 ›
          </Link>
        </p>
      </section>
    </>
  );
}
