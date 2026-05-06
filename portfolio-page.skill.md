# Portfolio & About Page Enhancement Skill

## 适用场景
当你要为个人博客或作品集网站添加：
- 丰富内容展示（描述、技术栈、复盘、成果）
- 分类项目板块（数据驾驶舱、管理系统、门户网站、小程序页面）
- 响应式卡片布局
- 动画交互（hover、进入动画、渐变背景）
- 色彩区分与语义主题

## 今天完成的功能
1. `src/styles/globals.css`
   - 扩展色彩变量：`accent`、语义色、portfolio 分类色
   - 添加 CSS 动画类：`fadeIn`、`slideUp`、`slideInLeft`、`slideInRight`、`float`、`pulseGlow`
2. `src/content/profile.ts`
   - 扩展 expert 数据结构，支持多类别技能、描述、标签、节奏体验
   - 新增统计数据和亮点
3. `src/content/portfolio.ts`
   - 改造作品集数据模型，支持：`category`、`techStack`、`retrospective`、`details`、`role`、`impact`
   - 转换项目类别为：`Data Cockpit`、`Management System`、`Portal Website`、`Mini Program Page`
4. `src/pages/portfolio/index.tsx`
   - 分类型渲染作品集区块
   - 每个项目卡片支持封面色块、summary、role、技术标签、hover 动效
5. `src/pages/portfolio/[slug].tsx`
   - 详情页支持项目概述、Challenge / Solution / Result、技术栈、亮点、复盘心得、视觉预览
   - 支持横向滑动预览卡片和色彩主题映射

## 复用方式
### 1. 复用项目模板
以后新增项目时，先在 `src/content/portfolio.ts` 中按现有结构补充数据：
- `slug`
- `title`
- `category`
- `summary`
- `timeframe`
- `role`
- `impact`
- `tags`
- `techStack`
- `highlights`
- `retrospective`
- `details`
- `coverColor`

### 2. 复用页面组件逻辑
如果需要新增类似展示页：
- 继续使用 `Card`、`Badge` 组合
- 保持 `space-y-`、`grid`、`flex` 的响应式布局
- 通过 `categoryColor()` 绑定主题颜色变量

### 3. 复用动画和视觉规则
- 卡片入口动画用 `animate-slideUp` 或 `animate-fadeIn`
- 悬停放大用 `transition-transform duration-300 hover:-translate-y-1`
- 色块背景用 `linear-gradient` 加 `hsla(var(--category), 0.18)`
- 标签、卡片背景统一使用 `bg-[hsl(var(--muted))]` / `bg-[hsl(var(--card))]`

### 4. 验证流程
- 运行 `pnpm build` 确认页面编译通过
- 通过 `pnpm dev` 访问 `/portfolio` 和 `/portfolio/[slug]`
- 检查移动端布局、hover 动效和颜色区分

## 未来使用建议
- 新增页面时，可直接参考本 skill 的 `portfolio` 数据模型和页面布局
- 若要扩展单页展示，建议新增 `images` 字段并在详情页 `Visual preview` 区块中渲染真实截图
- 若要进一步增强动画，可在 `globals.css` 中继续添加 `@keyframes` 规则，并复用 `.animate-*` 类

## 如何使用
1. 打开 `portfolio-page.skill.md` 查看复用策略
2. 新增项目时，复制 `src/content/portfolio.ts` 中已有对象结构
3. 在页面中保持 `category` 颜色映射规则一致
4. 需要新的板块时，优先复用现有 `Card`/`Badge` 布局和 Tailwind 变量

> 这个 skill 主要是一个复用模板：你以后要更新作品集、升级 About 页面时，直接沿用今天的结构、数据字段和样式规则即可，避免重复从零设计。