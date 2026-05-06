import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/markdown-content";
import { KnowledgeTypeBadge } from "@/components/knowledge/type-badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAllKnowledgeMeta,
  getKnowledgePost,
  type KnowledgePost,
  type KnowledgeMeta,
} from "@/lib/knowledge";

type Props = {
  post: KnowledgePost;
  allPosts: KnowledgeMeta[];
  prevPost: KnowledgeMeta | null;
  nextPost: KnowledgeMeta | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllKnowledgeMeta();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug ?? "");
  const post = await getKnowledgePost(slug);
  const allPosts = getAllKnowledgeMeta();

  // Find current post index and adjacent posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return {
    props: {
      post,
      allPosts,
      prevPost,
      nextPost,
    },
  };
};

export default function KnowledgeDetailPage({
  post,
  prevPost,
  nextPost,
}: Props) {
  return (
    <>
      <Seo title={post.title} description={post.summary ?? undefined} />

      <div className="space-y-6">
        {/* Header with Back Navigation */}
        <div className="space-y-4">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            返回知识库
          </Link>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {post.date || "—"}
                </p>
                <div className="flex items-center gap-2">
                  <KnowledgeTypeBadge type={post.type} />
                </div>
              </div>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <MarkdownContent html={post.contentHtml} />
          </CardContent>
        </Card>

        {/* Navigation between posts */}
        <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t">
          {prevPost ? (
            <Link href={`/knowledge/${prevPost.slug}`}>
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start justify-start text-left hover:bg-muted"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <ChevronLeft className="w-3 h-3" />
                  上一篇
                </div>
                <p className="font-semibold truncate text-sm">
                  {prevPost.title}
                </p>
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={`/knowledge/${nextPost.slug}`}>
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start justify-start text-left hover:bg-muted"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  下一篇
                  <ChevronRight className="w-3 h-3" />
                </div>
                <p className="font-semibold truncate text-sm">
                  {nextPost.title}
                </p>
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}
