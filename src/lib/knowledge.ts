import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/markdown";
import {
  normalizeKnowledgeType,
  type KnowledgePostType,
} from "@/content/knowledge-types";

export type KnowledgeMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  type: KnowledgePostType;
  summary: string | null;
};

export type KnowledgePost = KnowledgeMeta & {
  contentHtml: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "knowledge");

function listMarkdownFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

function parsePostFile(filename: string) {
  const fileSlug = filename.replace(/\.(md|mdx)$/, "");
  const fullPath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatterSlug = data.slug ? String(data.slug) : "";
  const slug = frontmatterSlug || fileSlug;

  return {
    filename,
    fullPath,
    raw,
    data,
    content,
    slug,
    fileSlug,
  };
}

export function getAllKnowledgeMeta(): KnowledgeMeta[] {
  return listMarkdownFiles()
    .map((filename) => {
      const { slug, data } = parsePostFile(filename);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        type: normalizeKnowledgeType(data.type),
        summary: data.summary ? String(data.summary) : null,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getKnowledgePost(slug: string): Promise<KnowledgePost> {
  const filename =
    listMarkdownFiles()
      .map((f) => parsePostFile(f))
      .find((p) => p.slug === slug)?.filename ?? null;

  if (!filename) {
    throw new Error(`Knowledge post not found for slug: ${slug}`);
  }

  const parsed = parsePostFile(filename);
  const { data, content } = parsed;

  return {
    slug: parsed.slug,
    title: String(data.title ?? parsed.slug),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    type: normalizeKnowledgeType(data.type),
    summary: data.summary ? String(data.summary) : null,
    contentHtml: await markdownToHtml(content),
  };
}

