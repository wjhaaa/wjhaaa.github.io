---
title: "Next.js static export on GitHub Pages"
date: "2026-04-30"
tags: ["nextjs", "github-pages"]
summary: "Notes for deploying a statically exported Next.js site to GitHub Pages."
---

## Key config

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`

## Local workflow

1. `pnpm build`
2. `pnpm export` (or build script that runs export)
3. Publish the generated `out/` directory to GitHub Pages.

