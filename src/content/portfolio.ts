export type PortfolioCategory =
  | "Data Cockpit"
  | "Management System"
  | "Portal Website"
  | "Mini Program Page";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  summary: string;
  timeframe?: string;
  role?: string;
  impact?: string;
  tags: string[];
  techStack: string[];
  highlights: string[];
  retrospective: string[];
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
  coverColor: string;
  images?: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "data-cockpit-portal",
    title: "Intelligent Data Cockpit",
    category: "Data Cockpit",
    summary:
      "A dashboard for visualizing business metrics, KPI trends, and operational insights in real time.",
    timeframe: "2025",
    role: "Lead Frontend Engineer",
    impact:
      "Helped stakeholders spot anomalies 30% faster through dashboard clarity.",
    tags: ["ECharts", "React", "Analytics"],
    techStack: ["React", "TypeScript", "ECharts", "Tailwind CSS", "Vite"],
    highlights: [
      "Built modular dashboard cards with live data refresh",
      "Designed responsive data panels for desktop and tablet",
      "Created reusable visualization primitives for future dashboards",
    ],
    retrospective: [
      "留意数据密度与视觉层级，避免信息过载",
      "强化筛选与交互反馈，提升操作效率",
      "后续希望增加更多图表导出与自定义布局功能",
    ],
    details: {
      challenge:
        "该项目需要在一个页面内展示海量业务指标，同时确保信息层级清晰，避免用户迷失。",
      solution:
        "通过卡片化布局、渐进式加载和数据摘要视图，将关键指标优先展示，并用颜色/图形强化对比。",
      result:
        "最终产品获得客户认可，用户在关键指标页面的平均停留时间提升了 18%。",
    },
    coverColor: "portfolio-data-cockpit",
  },
  {
    slug: "management-system-suite",
    title: "Enterprise Management System",
    category: "Management System",
    summary:
      "A role-based admin system for operations, permissions, and business workflows.",
    timeframe: "2024",
    role: "Fullstack Frontend Engineer",
    impact: "简化审批路径，降低用户出错率 22%。",
    tags: ["RBAC", "Ant Design", "Workflow"],
    techStack: ["Vue 3", "TypeScript", "Taro", "Pinia", "Sass"],
    highlights: [
      "实现基于角色的菜单与权限控制",
      "搭建高复用表单和审批组件",
      "通过搜索与筛选提升数据检索效率",
    ],
    retrospective: [
      "在大型表单中保持字段一致性至关重要",
      "需要更早与产品对齐权限模型",
      "未来可引入低代码配置面板，减少维护成本",
    ],
    details: {
      challenge: "系统功能复杂，用户角色众多，权限与流程需求频繁变化。",
      solution:
        "采用统一的权限中台、可配置表单和抽象审批流组件，降低后续迭代成本。",
      result: "系统上线后，运维效率提升 25%，新角色配置时间缩短一半。",
    },
    coverColor: "portfolio-management-system",
  },
  {
    slug: "portal-website-redesign",
    title: "Portal Website Redesign",
    category: "Portal Website",
    summary:
      "A corporate landing portal with marketing pages, user journeys, and conversion flows.",
    timeframe: "2026",
    role: "Frontend Architect",
    impact: "提升关键页面转化率 12%，并显著优化首次加载体验。",
    tags: ["Next.js", "Performance", "SEO"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Markdown"],
    highlights: [
      "统一页面视觉体系与内容模块",
      "优化图片与动画，减少首屏加载成本",
      "搭建可复用页面模板，支持快速迭代",
    ],
    retrospective: [
      "使用组件化节省重复内容创建时间",
      "通过 Lighthouse 校准性能点比主观体验更稳定",
      "后续可做更多 A/B 测试来验证设计假设",
    ],
    details: {
      challenge: "需要兼顾品牌视觉与移动端转化，同时保证 SEO 与性能。",
      solution: "采用静态渲染模块化页面、渐进式图片加载与关键内容优先策略。",
      result: "页面平均加载时间下降 20%，用户转化率持续增长。",
    },
    coverColor: "portfolio-portal-website",
  },
  {
    slug: "mini-program-commerce",
    title: "Mini Program Commerce",
    category: "Mini Program Page",
    summary:
      "A lightweight WeChat mini program page for product promotion and quick ordering.",
    timeframe: "2025",
    role: "Frontend Developer",
    impact: "帮助业务端实现 1.5 倍转化率增长，页面体验更贴近小程序习惯。",
    tags: ["Taro", "Mini Program", "Mobile UX"],
    techStack: ["Taro", "React", "TypeScript", "CSS Modules", "WeChat API"],
    highlights: [
      "定制移动端交互与弹窗体验",
      "优化雪碧图与资源加载策略",
      "实现多渠道分享与跳转动作",
    ],
    retrospective: [
      "小程序页面需要兼顾流畅与体积控制",
      "注意触摸交互与视觉反馈的一致性",
      "后续可增加更多本地缓存优化和离线提示",
    ],
    details: {
      challenge: "这类页面对首屏速度和交互响应要求极高，页面空间有限。",
      solution: "采用轻量组件、复用 UI 规则，并优化资源请求，保证体验顺畅。",
      result: "页面加载时间控制在 1.2s 内，并获得业务侧好评。",
    },
    coverColor: "portfolio-mini-program",
  },
];
