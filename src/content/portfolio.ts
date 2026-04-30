export type PortfolioCategory = "B2B" | "B2C" | "Other";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  summary: string;
  tags: string[];
  timeframe?: string;
  links?: { label: string; href: string }[];
  highlights: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "b2b-admin-console",
    title: "B2B Admin Console",
    category: "B2B",
    summary: "A role-based admin console with audit trails and analytics.",
    tags: ["Next.js", "RBAC", "Data table"],
    timeframe: "2025",
    highlights: [
      "Designed information architecture and navigation for complex workflows",
      "Built reusable table + filter primitives for consistency",
      "Improved perceived performance via streaming UX patterns",
    ],
  },
  {
    slug: "b2c-mobile-web",
    title: "B2C Mobile Web Experience",
    category: "B2C",
    summary: "A mobile-first consumer flow optimized for conversion.",
    tags: ["React", "Performance", "A/B testing"],
    timeframe: "2024",
    highlights: [
      "Reduced LCP by optimizing images and critical CSS",
      "Introduced design tokens and accessible components",
      "Instrumented funnels to identify drop-off points",
    ],
  },
  {
    slug: "design-system-starter",
    title: "Design System Starter",
    category: "Other",
    summary: "A shadcn-inspired component kit and conventions for teams.",
    tags: ["Tailwind", "Tokens", "DX"],
    timeframe: "2026",
    highlights: [
      "Defined spacing/typography scale and component API conventions",
      "Added dark mode parity across components",
      "Documented patterns for long-term maintainability",
    ],
  },
];

