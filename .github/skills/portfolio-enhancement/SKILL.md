---
name: portfolio-enhancement
user-invocable: true
description: "Enhance portfolio and about pages with project category layouts, rich project cards, responsive visuals, and interactive animations."
applyTo:
  - "src/pages/portfolio/**"
  - "src/content/portfolio.ts"
  - "src/pages/about.tsx"
  - "src/styles/globals.css"
---

# Portfolio & About Page Enhancement Skill

## Use when

- 你要升级作品集页面为“数据驾驶舱 / 管理系统 / 门户网站 / 小程序页面”四类项目展示。
- 你要为作品集项目补充描述、技术栈、复盘心得、成果指标和详情页结构。
- 你要让 About 页面更丰富、更有动画、更有色彩、更具互动感。
- 你要复用今天的布局、颜色主题、卡片交互和响应式规则。

## What this skill helps with

- 设计 portfolio 数据模型和分类色彩
- 优化 `src/pages/portfolio/index.tsx` 的分类展示与交互卡片
- 丰富 `src/pages/portfolio/[slug].tsx` 的详情页结构与视觉预览
- 补强 `src/styles/globals.css` 的语义颜色、动画类和视觉变量
- 扩展 `src/content/portfolio.ts` 的项目字段
- 复用 About 页面改造方案、动效和色彩体系

## Reuse rules

- 新增 portfolio 项目时，保持数据对象字段：
  - `slug`, `title`, `category`, `summary`, `timeframe`, `role`, `impact`
  - `tags`, `techStack`, `highlights`, `retrospective`, `details`, `coverColor`
- 通过 `categoryColor(item.category)` 映射类别主题色
- 卡片交互用 `transition-transform duration-300 hover:-translate-y-1`
- 动画入口用 `animate-slideUp`, `animate-fadeIn`
- 标签和小块用 `Badge` 复用样式

## How to use

1. 在 VS Code 中打开本文件或 `portfolio-page.skill.md`。
2. 编辑 `src/content/portfolio.ts`，按现有结构新增项目。
3. 直接复用 `src/pages/portfolio/index.tsx` 和 `src/pages/portfolio/[slug].tsx` 中的布局思路。
4. 如果需要新增页面类型，先在 `globals.css` 添加对应颜色变量，并在 `categoryColor()` 中映射。
5. 运行 `pnpm build` 和 `pnpm dev`，访问 `/portfolio` 与 `/portfolio/[slug]`。

## Tips

- 如果你要增加真实作品截图，优先把图片放到 `public/images/portfolio/`，然后在项目数据中增加 `images` 字段。
- 需要更复杂的动画时，可在 `src/styles/globals.css` 中继续增加 `@keyframes` 并定义 `.animate-*` 类。
- 未来要扩展 About 页面，可复用现有 `AboutHero`、`SkillsGrid`、`StatsCard` 组件结构。
