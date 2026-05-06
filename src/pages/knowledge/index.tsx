import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import Fuse from "fuse.js";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Folder,
  FileText,
  Tag,
  Calendar,
} from "lucide-react";

import { getAllKnowledgeMeta, type KnowledgeMeta } from "@/lib/knowledge";

interface ExtendedKnowledgeMeta extends KnowledgeMeta {
  displayType?: KnowledgePostType;
}
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

function inferTypeFromTitle(title: string): KnowledgePostType {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("项目") || lowerTitle.includes("总结"))
    return "project";
  if (
    lowerTitle.includes("踩坑") ||
    lowerTitle.includes("问题") ||
    lowerTitle.includes("报错")
  )
    return "pitfall";
  if (
    lowerTitle.includes("技巧") ||
    lowerTitle.includes("方法") ||
    lowerTitle.includes("秘籍")
  )
    return "snippet";
  if (lowerTitle.includes("规范") || lowerTitle.includes("标准"))
    return "standard";
  if (
    lowerTitle.includes("指南") ||
    lowerTitle.includes("教程") ||
    lowerTitle.includes("安装")
  )
    return "guide";
  if (lowerTitle.includes("复盘") || lowerTitle.includes("回顾"))
    return "retro";

  return "note";
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

interface CollapsibleTreeMenuProps {
  nodes: KnowledgeMenuNode[];
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
  onMenuClick: (hit: MenuHit) => void;
  activeMenuKey: string;
  postsBySlug: Map<string, KnowledgeMeta>;
  depth?: number;
  parentPath?: string[];
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
}: CollapsibleTreeMenuProps) {
  return (
    <div className="space-y-0.5">
      {nodes.map((node: KnowledgeMenuNode) => {
        const nodePath = [...parentPath, node.name];
        const nodeKey = makeKey(nodePath);
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedKeys.has(nodeKey);
        const isActive = activeMenuKey === nodeKey;

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
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
              } ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              style={{ paddingLeft: `${depth * 16 + 12}px` }}
            >
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(nodeKey);
                  }}
                  className="flex items-center justify-center w-5 h-5 flex-shrink-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
              {!hasChildren && (
                <div className="w-5 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 opacity-50" />
                </div>
              )}
              <button
                onClick={() => !isDisabled && onMenuClick(nodeHit)}
                disabled={isDisabled}
                className="flex-1 text-left text-sm font-medium truncate hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors"
                title={node.name}
              >
                {node.name}
              </button>
              {!hasChildren && !isDisabled && (
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0.5 h-4"
                >
                  {inferTypeFromTitle(node.name) === "project" && "项目"}
                  {inferTypeFromTitle(node.name) === "pitfall" && "踩坑"}
                  {inferTypeFromTitle(node.name) === "snippet" && "技巧"}
                  {inferTypeFromTitle(node.name) === "guide" && "指南"}
                  {inferTypeFromTitle(node.name) === "standard" && "规范"}
                  {inferTypeFromTitle(node.name) === "retro" && "复盘"}
                  {inferTypeFromTitle(node.name) === "note" && "笔记"}
                </Badge>
              )}
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

  const results = React.useMemo((): ExtendedKnowledgeMeta[] => {
    const query = q.trim();
    let displayResults = baseSet;

    if (query) {
      displayResults = fuse.search(query).map((r) => r.item);
    }

    return displayResults.map((post) => ({
      ...post,
      displayType:
        post.type === "note" ? inferTypeFromTitle(post.title) : post.type,
    }));
  }, [baseSet, fuse, q]);

  const typeCounts = React.useMemo(() => {
    const counts = new Map<KnowledgePostType, number>();
    for (const p of posts) {
      counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
    }
    return counts;
  }, [posts]);

  const activeMenuTitle = React.useMemo(() => {
    if (activeMenuKey === "__all__") return "全部知识";
    const hit = menuHits.find((h) => h.key === activeMenuKey);
    return hit?.title ?? "全部知识";
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                    知识库
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {posts.length} 篇文章 · 持续更新中
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    value={q}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="搜索标题、标签、摘要..."
                    className="pl-10 h-10 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-6 lg:h-[calc(100vh-8rem)]">
              <Card className="h-full overflow-hidden flex flex-col border-slate-200 dark:border-slate-800 shadow-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <CardHeader className="space-y-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      知识导航
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      当前:{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {activeMenuTitle}
                      </span>
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {menuFilter ? `${baseSet.length}` : `${posts.length}`}
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="w-full h-8 text-xs"
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
                    重置筛选
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto py-4 px-3">
                  <nav className="space-y-1">
                    <div
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
                        activeMenuKey === "__all__"
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 cursor-pointer"
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
                      <Folder className="w-4 h-4" />
                      <span className="text-sm font-medium">全部知识</span>
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

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
              <div className="lg:hidden mb-4">
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardContent className="py-4 px-3">
                    <nav className="space-y-1 max-h-96 overflow-auto">
                      <div
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
                          activeMenuKey === "__all__"
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 cursor-pointer"
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
                        <Folder className="w-4 h-4" />
                        <span className="text-sm font-medium">全部知识</span>
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

            {/* Main Content */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Tag className="w-4 h-4" />
                <span>
                  筛选:{" "}
                  <span className="font-medium text-slate-900 dark:text-white">
                    {activeMenuTitle}
                  </span>
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span>
                  共{" "}
                  <span className="font-medium text-slate-900 dark:text-white">
                    {results.length}
                  </span>{" "}
                  篇
                </span>
              </div>

              <div className="grid gap-4">
                {results.map((p) => (
                  <Card
                    key={p.slug}
                    className="group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
                    onClick={() => void router.push(`/knowledge/${p.slug}`)}
                  >
                    <CardHeader className="space-y-3 pb-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <Link
                          href={`/knowledge/${p.slug}`}
                          className="text-base font-semibold tracking-tight text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:underline decoration-blue-500/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {p.title}
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{p.date || "—"}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <KnowledgeTypeBadge type={p.displayType || p.type} />
                        {p.tags.slice(0, 5).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {t}
                          </Badge>
                        ))}
                        {p.tags.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{p.tags.length - 5}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    {p.summary && (
                      <CardContent className="pt-0">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
                          {p.summary}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}

                {!results.length && (
                  <Card className="border-dashed border-slate-300 dark:border-slate-700 bg-white/30 dark:bg-slate-900/30">
                    <CardContent className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                            未找到相关内容
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            试试调整搜索关键词或筛选条件
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
