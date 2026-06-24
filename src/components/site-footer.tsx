import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border))] surface-secondary">
      <div className="mx-auto max-w-[1680px] px-6 py-12 lg:px-[90px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              {siteConfig.nameZh}
            </p>
            <p className="text-caption text-[hsl(var(--muted-foreground))]">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              作品
            </p>
            <ul className="space-y-2 text-caption text-[hsl(var(--muted-foreground))]">
              <li>
                <Link href="/portfolio" className="apple-link">
                  作品集
                </Link>
              </li>
              <li>
                <Link href="/about" className="apple-link">
                  关于
                </Link>
              </li>
              <li>
                <Link href={siteConfig.aiDashboard.href} className="apple-link">
                  AI 驾驶舱 Demo
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              联系
            </p>
            <ul className="space-y-2 text-caption text-[hsl(var(--muted-foreground))]">
              <li>
                <a
                  href={siteConfig.github}
                  className="apple-link"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="apple-link">
                  邮箱
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              简历
            </p>
            <Link href={siteConfig.resumePath} className="apple-link text-caption">
              下载 PDF ›
            </Link>
          </div>
        </div>
        <p className="mt-10 border-t border-[hsl(var(--border))] pt-6 text-caption text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} {siteConfig.nameZh} · {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
