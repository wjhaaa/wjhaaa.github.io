import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import Fuse from "fuse.js";

import { getAllKnowledgeMeta, type KnowledgeMeta } from "@/lib/knowledge";
import {
  knowledgeMenu,
  type KnowledgeMenuNode,
} from "@/content/knowledge-menu";
import { knowledgeSlugMap } from "@/content/knowledge-slug-map";
import { knowledgeTypes, type KnowledgePostType } from "@/content/knowledge-types";
import { KnowledgeTypeBadge } from "@/components/knowledge/type-badge";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = { posts: KnowledgeMeta[] };

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { posts: getAllKnowledgeMeta() } };
};

type MenuHit =
  | { kind: "group"; key: string; title: string; slugs: string[] }
  | { kind: "leaf"; key: string; title: string; slug: string };

function makeKey(path: string[]) {
  return path.join(" / ");
}

function collectLeafSlugs(node: KnowledgeMenuNode): string[] {
  if (node.slug) return [node.slug];
  if (!node.children?.length) return [knowledgeSlugMap[node.name] ?? node.name];
  return node.children.flatMap(collectLeafSlugs);
}

function flattenMenu(nodes: KnowledgeMenuNode[], path: string[] = []): MenuHit[] {
  const out: MenuHit[] = [];
  for (const n of nodes) {
    const nextPath = [...path, n.name];
    const key = makeKey(nextPath);
    if (n.children?.length) {
      out.push({
        kind: "group",
        key,
        title: n.name,
        slugs: collectLeafSlugs(n),
      });
      out.push(...flattenMenu(n.children, nextPath));
    } else {
      out.push({
        kind: "leaf",
        key,
        title: n.name,
        slug: n.slug ?? knowledgeSlugMap[n.name] ?? n.name,
      });
    }
  }
  return out;
}

export default function KnowledgeIndexPage({ posts }: Props) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [activeMenuKey, setActiveMenuKey] = React.useState<string>("__all__");
  const [activeType, setActiveType] = React.useState<KnowledgePostType | "all">(
    "all",
  );

  const postsBySlug = React.useMemo(
    () => new Map(posts.map((p) => [p.slug, p])),
    [posts],
  );
  const slugByTitle = React.useMemo(
    () => new Map(posts.map((p) => [p.title, p.slug])),
    [posts],
  );

  const menuHits = React.useMemo(() => flattenMenu(knowledgeMenu), []);
  const resolveSlug = React.useCallback(
    (maybeNameOrSlug: string) => {
      if (postsBySlug.has(maybeNameOrSlug)) return maybeNameOrSlug;
      return slugByTitle.get(maybeNameOrSlug) ?? null;
    },
    [postsBySlug, slugByTitle],
  );
  const menuFilter = React.useMemo(() => {
    if (activeMenuKey === "__all__") return null;
    const hit = menuHits.find((h) => h.key === activeMenuKey);
    if (!hit) return null;
    if (hit.kind === "leaf") {
      const resolved = resolveSlug(hit.slug);
      return resolved ? new Set([resolved]) : new Set<string>();
    }

    const resolved = hit.slugs
      .map((s) => resolveSlug(s))
      .filter((s): s is string => Boolean(s));
    return new Set(resolved);
  }, [activeMenuKey, menuHits, resolveSlug]);

  const baseSet = React.useMemo(() => {
    let base = posts;
    if (menuFilter) base = base.filter((p) => menuFilter.has(p.slug));
    if (activeType !== "all") base = base.filter((p) => p.type === activeType);
    return base;
  }, [posts, menuFilter, activeType]);

  const fuse = React.useMemo(
    () =>
      new Fuse(baseSet, {
        keys: ["title", "summary", "tags", "type"],
        threshold: 0.35,
      }),
    [baseSet],
  );

  const results = React.useMemo(() => {
    const query = q.trim();
    if (!query) return baseSet;
    return fuse.search(query).map((r) => r.item);
  }, [baseSet, fuse, q]);

  const typeCounts = React.useMemo(() => {
    const counts = new Map<KnowledgePostType, number>();
    for (const p of posts) {
      counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
    }
    return counts;
  }, [posts]);

  const activeMenuTitle = React.useMemo(() => {
    if (activeMenuKey === "__all__") return "All";
    const hit = menuHits.find((h) => h.key === activeMenuKey);
    return hit?.title ?? "All";
  }, [activeMenuKey, menuHits]);

  function onMenuClick(hit: MenuHit) {
    if (hit.kind === "leaf") {
      const resolved = resolveSlug(hit.slug);
      if (resolved) void router.push(`/knowledge/${resolved}`);
      return;
    }
    setActiveMenuKey(hit.key);
  }

  return (
    <>
      <Seo title="Knowledge" />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)]">
          <Card className="h-full overflow-hidden">
            <CardHeader className="space-y-1">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Knowledge menu
              </p>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {activeMenuTitle}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {menuFilter ? `${baseSet.length} items` : `${posts.length} items`}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setActiveMenuKey("__all__")}
                >
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-92px)] overflow-auto pr-2">
              <nav className="space-y-1">
                <Button
                  type="button"
                  variant={activeMenuKey === "__all__" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveMenuKey("__all__")}
                >
                  All
                </Button>
                {menuHits.map((hit) => {
                  const depth = hit.key.split(" / ").length - 1;
                  const isActive = activeMenuKey === hit.key;
                  const padded = { paddingLeft: `${12 + depth * 12}px` };

                  const disabled =
                    hit.kind === "group" && hit.slugs.length === 0
                      ? true
                      : hit.kind === "leaf" && !postsBySlug.has(hit.slug);

                  return (
                    <Button
                      key={hit.key}
                      type="button"
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      style={padded}
                      disabled={disabled}
                      onClick={() => onMenuClick(hit)}
                      title={hit.title}
                    >
                      <span className="truncate">{hit.title}</span>
                    </Button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-6">
          <header className="space-y-3">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              A searchable knowledge base for retros, pitfalls, snippets and more.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <h1 className="text-balance text-4xl font-semibold tracking-tight">
                  Knowledge
                </h1>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Filter: <span className="font-medium">{activeMenuTitle}</span>
                </p>
              </div>
              <div className="w-full sm:w-[360px]">
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search title / tag / summary…"
                  aria-label="Search knowledge posts"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                type="button"
                size="sm"
                variant={activeType === "all" ? "secondary" : "ghost"}
                onClick={() => setActiveType("all")}
              >
                All types
                <span className="ml-2 text-xs text-[hsl(var(--muted-foreground))]">
                  {posts.length}
                </span>
              </Button>
              {(
                Object.keys(knowledgeTypes) as Array<keyof typeof knowledgeTypes>
              ).map((t) => {
                const count = typeCounts.get(t) ?? 0;
                if (!count) return null;
                const active = activeType === t;
                return (
                  <Button
                    key={t}
                    type="button"
                    size="sm"
                    variant={active ? "secondary" : "ghost"}
                    onClick={() => setActiveType(active ? "all" : t)}
                    className="gap-2"
                  >
                    <KnowledgeTypeBadge type={t} />
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {count}
                    </span>
                  </Button>
                );
              })}
            </div>
          </header>

          <div className="grid gap-4">
            {results.map((p) => (
              <Card key={p.slug} className="group">
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={`/knowledge/${p.slug}`}
                      className="text-base font-semibold tracking-tight hover:underline hover:underline-offset-4"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {p.date || "—"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <KnowledgeTypeBadge type={p.type} />
                    {p.tags.slice(0, 6).map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {p.summary ? (
                    <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                      {p.summary}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ))}

            {!results.length ? (
              <Card>
                <CardContent className="py-10 text-sm text-[hsl(var(--muted-foreground))]">
                  No results. Try another keyword or reset filters.
                </CardContent>
              </Card>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}
