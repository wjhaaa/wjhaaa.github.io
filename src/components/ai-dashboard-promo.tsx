import Link from "next/link";
import { BrainCircuit, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function AiDashboardPromo() {
  const { aiDashboard } = siteConfig;

  return (
    <section className="page-bleed border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-14 lg:py-16">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-16">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-[hsl(var(--link))]">
            <Sparkles className="size-3.5" aria-hidden />
            AI 差异化
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {aiDashboard.title}
          </h2>
          <p className="mt-3 text-[17px] leading-[1.47] text-[hsl(var(--muted-foreground))]">
            {aiDashboard.description}
          </p>
        </div>
        <Link
          href={aiDashboard.href}
          className="group inline-flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-4 transition-colors hover:border-[hsl(var(--link))]/40"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-[hsl(var(--link))]/10 text-[hsl(var(--link))]">
            <BrainCircuit className="size-5" aria-hidden />
          </span>
          <span>
            <span className="block text-[15px] font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--link))]">
              体验 Demo
            </span>
            <span className="block text-[13px] text-[hsl(var(--muted-foreground))]">
              Prompt → Schema → 可配置驾驶舱
            </span>
          </span>
          <span className="ml-auto text-[17px] text-[hsl(var(--link))]">›</span>
        </Link>
      </div>
    </section>
  );
}
