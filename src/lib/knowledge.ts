import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/markdown";

export type KnowledgeMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary?: string;
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

export function getAllKnowledgeMeta(): KnowledgeMeta[] {
  return listMarkdownFiles()
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        summary: data.summary ? String(data.summary) : undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getKnowledgePost(slug: string): Promise<KnowledgePost> {
  const fullPathMd = path.join(CONTENT_DIR, `${slug}.md`);
  const fullPathMdx = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: data.summary ? String(data.summary) : undefined,
    contentHtml: await markdownToHtml(content),
  };
}

