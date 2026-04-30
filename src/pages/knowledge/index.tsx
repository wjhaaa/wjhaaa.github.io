import * as React from "react";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import Fuse from "fuse.js";

import { getAllKnowledgeMeta, type KnowledgeMeta } from "@/lib/knowledge";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = { posts: KnowledgeMeta[] };

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { posts: getAllKnowledgeMeta() } };
};

export default function KnowledgeIndexPage({ posts }: Props) {
  const [q, setQ] = React.useState("");

  const fuse = React.useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "summary", "tags"],
        threshold: 0.35,
      }),
    [posts],
  );

  const results = React.useMemo(() => {
    const query = q.trim();
    if (!query) return posts;
    return fuse.search(query).map((r) => r.item);
  }, [fuse, posts, q]);

  return (
    <>
      <Seo title="Knowledge" />

      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Knowledge</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Retrospectives and notes. Search by title, tags, or summary.
          </p>
          <div className="max-w-md">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              aria-label="Search knowledge posts"
            />
          </div>
        </header>

        <div className="grid gap-4">
          {results.map((p) => (
            <Card key={p.slug}>
              <CardHeader className="space-y-1">
                <Link
                  href={`/knowledge/${p.slug}`}
                  className="text-base font-semibold hover:underline hover:underline-offset-4"
                >
                  {p.title}
                </Link>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {p.date || "—"}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {p.summary ? (
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {p.summary}
                  </p>
                ) : null}
                {p.tags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
          {!results.length ? (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              No results.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

