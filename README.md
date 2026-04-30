Personal site powered by Next.js (static export) + Tailwind, deployed on GitHub Pages.

## Getting Started

Install deps and start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Routes

- `/about`: intro, skills, contact
- `/portfolio`: portfolio list + detail pages
- `/knowledge`: markdown knowledge base with search

## Static export

This repo uses Next.js static export:

```bash
pnpm build
```

The exported site will be generated to `out/`.

## Deployment (GitHub Pages)

Pushing to `main` triggers a GitHub Actions workflow that builds and deploys `out/` to GitHub Pages.

## Content

- Knowledge posts: `content/knowledge/*.md`

## Tech

- Next.js (Pages Router) + TypeScript
- Tailwind CSS
- Markdown: `gray-matter` + `unified`
- Search: `fuse.js`

---

UI is inspired by shadcn-ui: clean layout, design tokens, dark mode, and composable primitives.
