import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border))] surface-secondary">
      <div className="mx-auto max-w-[1680px] px-6 py-12 lg:px-[90px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              {siteConfig.name}
            </p>
            <p className="text-caption text-[hsl(var(--muted-foreground))]">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              Work
            </p>
            <ul className="space-y-2 text-caption text-[hsl(var(--muted-foreground))]">
              <li>
                <Link href="/portfolio" className="apple-link">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="apple-link">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              Connect
            </p>
            <ul className="space-y-2 text-caption text-[hsl(var(--muted-foreground))]">
              <li>
                <a href={siteConfig.github} className="apple-link" target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="apple-link">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-[hsl(var(--foreground))]">
              Resume
            </p>
            <Link href={siteConfig.resumePath} className="apple-link text-caption">
              Download PDF ›
            </Link>
          </div>
        </div>
        <p className="mt-10 border-t border-[hsl(var(--border))] pt-6 text-caption text-[hsl(var(--muted-foreground))]">
          Copyright © {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
