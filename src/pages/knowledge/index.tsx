import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import Fuse from "fuse.js";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

import { getAllKnowledgeMeta, type KnowledgeMeta } from "@/lib/knowledge";
import {
  knowledgeMenu,
  type KnowledgeMenuNode,
} from "@/content/knowledge-menu";
import { knowledgeSlugMap } from "@/content/knowledge-slug-map";
import {
  knowledgeTypes,
  type KnowledgePostType,
} from "@/content/knowledge-types";
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

function flattenMenu(
  nodes: KnowledgeMenuNode[],
  path: string[] = [],
): MenuHit[] {
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

function CollapsibleTreeMenu({
  nodes,
  expandedKeys,
  onToggle,
  onMenuClick,
  activeMenuKey,
  postsBySlug,
  depth = 0,
  parentPath = [],
}: any) {
  return (
    <div className="space-y-1">
      {nodes.map((node: KnowledgeMenuNode) => {
        const nodePath = [...parentPath, node.name];
        const nodeKey = makeKey(nodePath);
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedKeys.has(nodeKey);
        const isActive = activeMenuKey === nodeKey;

        // Check if node is disabled
        const leafSlugs = collectLeafSlugs(node);
        const resolved = leafSlugs
          .map((s) => {
            if (postsBySlug.has(s)) return s;
            return null;
          })
          .filter(Boolean);
        const isDisabled = resolved.length === 0;

        const nodeHit: MenuHit = hasChildren
          ? {
              kind: "group",
              key: nodeKey,
              title: node.name,
              slugs: leafSlugs,
            }
          : {
              kind: "leaf",
              key: nodeKey,
              title: node.name,
              slug: node.slug ?? knowledgeSlugMap[node.name] ?? node.name,
            };

        return (
          <div key={nodeKey}>
            <div
              className={`flex items-center gap-1 rounded-md px-2 py-1.5 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(nodeKey);
                  }}
                  className="flex items-center justify-center w-4 h-4 flex-shrink-0 hover:bg-primary/10 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-4" />}
              <button
                onClick={() => !isDisabled && onMenuClick(nodeHit)}
                disabled={isDisabled}
                className="flex-1 text-left text-sm font-medium truncate hover:underline focus:outline-none focus:underline"
                title={node.name}
              >
                {node.name}
              </button>
            </div>

            {isExpanded && hasChildren && node.children && (
              <CollapsibleTreeMenu
                nodes={node.children}
                expandedKeys={expandedKeys}
                onToggle={onToggle}
                onMenuClick={onMenuClick}
                activeMenuKey={activeMenuKey}
                postsBySlug={postsBySlug}
                depth={depth + 1}
                parentPath={nodePath}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function KnowledgeIndexPage({ posts }: Props) {
  const router = useRouter();
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string>>(
    new Set(),
  );
  const [activeMenuKey, setActiveMenuKey] = React.useState<string>("__all__");
  const [activeType, setActiveType] = React.useState<KnowledgePostType | "all">(
    "all",
  );
  const [q, setQ] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Sync state with URL query parameters
  React.useEffect(() => {
    if (!router.isReady) return;

    const { menu, type, search } = router.query;
    if (menu) setActiveMenuKey(String(menu));
    if (type && type !== "all")
      setActiveType(String(type) as KnowledgePostType);
    if (search) setQ(String(search));
  }, [router.isReady, router.query]);

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
      if (resolved) {
        void router.push(`/knowledge/${resolved}`);
        setMobileMenuOpen(false);
      }
      return;
    }
    setActiveMenuKey(hit.key);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, menu: hit.key },
      },
      undefined,
      { shallow: true },
    );
  }

  const handleToggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleSearch = (value: string) => {
    setQ(value);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: value || undefined },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleTypeChange = (type: KnowledgePostType | "all") => {
    setActiveType(type);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, type: type === "all" ? undefined : type },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <Seo title="Knowledge" />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)]">
          <Card className="h-full overflow-hidden flex flex-col border shadow-sm">
            <CardHeader className="space-y-2 border-b bg-muted/30">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  菜单导航
                </p>
                <p className="text-sm font-medium text-foreground">
                  {activeMenuTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {menuFilter ? `${baseSet.length} 项` : `${posts.length} 项`}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setActiveMenuKey("__all__");
                  router.push(
                    {
                      pathname: router.pathname,
                      query: { ...router.query, menu: undefined },
                    },
                    undefined,
                    { shallow: true },
                  );
                }}
              >
                重置菜单
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto py-3 px-2">
              <nav className="space-y-1">
                <div
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                    activeMenuKey === "__all__"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground cursor-pointer"
                  }`}
                  onClick={() => {
                    setActiveMenuKey("__all__");
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { ...router.query, menu: undefined },
                      },
                      undefined,
                      { shallow: true },
                    );
                  }}
                >
                  <span className="text-sm font-medium">全部</span>
                </div>
                <CollapsibleTreeMenu
                  nodes={knowledgeMenu}
                  expandedKeys={expandedKeys}
                  onToggle={handleToggle}
                  onMenuClick={onMenuClick}
                  activeMenuKey={activeMenuKey}
                  postsBySlug={postsBySlug}
                />
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-between gap-2 mb-4">
          <h1 className="text-2xl font-bold">知识库</h1>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="gap-2"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-4 h-4" />
                隐藏菜单
              </>
            ) : (
              <>
                <Menu className="w-4 h-4" />
                显示菜单
              </>
            )}
          </Button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mb-4">
            <Card className="border shadow-sm">
              <CardContent className="py-3 px-2">
                <nav className="space-y-1 max-h-96 overflow-auto">
                  <div
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                      activeMenuKey === "__all__"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground cursor-pointer"
                    }`}
                    onClick={() => {
                      setActiveMenuKey("__all__");
                      setMobileMenuOpen(false);
                      router.push(
                        {
                          pathname: router.pathname,
                          query: { ...router.query, menu: undefined },
                        },
                        undefined,
                        { shallow: true },
                      );
                    }}
                  >
                    <span className="text-sm font-medium">全部</span>
                  </div>
                  <CollapsibleTreeMenu
                    nodes={knowledgeMenu}
                    expandedKeys={expandedKeys}
                    onToggle={handleToggle}
                    onMenuClick={onMenuClick}
                    activeMenuKey={activeMenuKey}
                    postsBySlug={postsBySlug}
                  />
                </nav>
              </CardContent>
            </Card>
          </div>
        )}

        <section className="space-y-6">
          <header className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                一个可搜索的知识库，包含回顾、踩坑、技巧等内容。
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <h1 className="text-balance text-4xl font-bold tracking-tight">
                    知识库
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    筛选:{" "}
                    <span className="font-semibold">{activeMenuTitle}</span>
                  </p>
                </div>
                <div className="w-full sm:w-[360px]">
                  <Input
                    value={q}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="搜索标题 / 标签 / 摘要…"
                    aria-label="搜索知识库文章"
                  />
                </div>
              </div>
            </div>

            {/* Type Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                type="button"
                size="sm"
                variant={activeType === "all" ? "default" : "outline"}
                onClick={() => handleTypeChange("all")}
                className="transition-colors"
              >
                全部类型
                <span className="ml-2 text-xs opacity-70">{posts.length}</span>
              </Button>
              {(
                Object.keys(knowledgeTypes) as Array<
                  keyof typeof knowledgeTypes
                >
              ).map((t) => {
                const count = typeCounts.get(t) ?? 0;
                if (!count) return null;
                const active = activeType === t;
                return (
                  <Button
                    key={t}
                    type="button"
                    size="sm"
                    variant={active ? "default" : "outline"}
                    onClick={() => handleTypeChange(active ? "all" : t)}
                    className="gap-2 transition-colors"
                  >
                    <KnowledgeTypeBadge type={t} />
                    <span className="text-xs opacity-70">{count}</span>
                  </Button>
                );
              })}
            </div>
          </header>

          {/* Results Grid */}
          <div className="grid gap-4">
            {results.map((p) => (
              <Card
                key={p.slug}
                className="group hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-primary/50"
                onClick={() => void router.push(`/knowledge/${p.slug}`)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <Link
                      href={`/knowledge/${p.slug}`}
                      className="text-lg font-semibold tracking-tight hover:text-primary transition-colors group-hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted-foreground flex-shrink-0">
                      {p.date || "—"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <KnowledgeTypeBadge type={p.type} />
                    {p.tags.slice(0, 6).map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                {p.summary && (
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {p.summary}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}

            {!results.length && (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    未找到结果。请尝试调整搜索或筛选条件。
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
