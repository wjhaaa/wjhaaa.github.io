export type KnowledgePostType =
  | "retro"
  | "pitfall"
  | "snippet"
  | "guide"
  | "standard"
  | "project"
  | "note";

export type KnowledgeTypeConfig = {
  label: string;
  badgeClassName: string;
};

// Centralized mapping for type -> label + color.
// Only maintain colors here; UI consumes this mapping.
export const knowledgeTypes: Record<KnowledgePostType, KnowledgeTypeConfig> = {
  retro: {
    label: "复盘",
    badgeClassName:
      "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  pitfall: {
    label: "踩坑",
    badgeClassName:
      "border-transparent bg-rose-500/15 text-rose-700 dark:text-rose-300",
  },
  snippet: {
    label: "技巧",
    badgeClassName:
      "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  guide: {
    label: "指南",
    badgeClassName:
      "border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-300",
  },
  standard: {
    label: "规范",
    badgeClassName:
      "border-transparent bg-violet-500/15 text-violet-700 dark:text-violet-300",
  },
  project: {
    label: "项目",
    badgeClassName:
      "border-transparent bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
  },
  note: {
    label: "笔记",
    badgeClassName:
      "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
  },
};

export function normalizeKnowledgeType(value: unknown): KnowledgePostType {
  const v = String(value ?? "").trim();
  if (!v) return "note";
  if (v in knowledgeTypes) return v as KnowledgePostType;
  return "note";
}

