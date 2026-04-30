import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownContent } from "@/components/markdown-content";
import {
  getAllKnowledgeMeta,
  getKnowledgePost,
  type KnowledgePost,
} from "@/lib/knowledge";

type Props = { post: KnowledgePost };

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
  return { props: { post } };
};

export default function KnowledgeDetailPage({ post }: Props) {
  return (
    <>
      <Seo title={post.title} description={post.summary} />

      <div className="space-y-6">
        <div className="space-y-2">
          <Link
            href="/knowledge"
            className="text-sm text-[hsl(var(--muted-foreground))] hover:underline hover:underline-offset-4"
          >
            ← Back to knowledge
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {post.date || "—"}
          </p>
          {post.tags.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <Card>
          <CardContent>
            <MarkdownContent html={post.contentHtml} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

