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
    title: "中国联通5G设备碳足迹评估体系驾驶舱",
    category: "Data Cockpit",
    summary:
      "A dashboard for visualizing business metrics, KPI trends, and operational insights in real time.",
    timeframe: "2025",
    role: "前端开发",
    impact:
      "直观展示业务模块统计数量，帮助客户快速了解业务数据，制定有效的决策。",
    tags: ["ECharts", "React", "TypeScript"],
    techStack: ["React", "TypeScript", "ECharts", "Tailwind CSS", "Vite"],
    highlights: [
      "搭建可模块化仪表板卡片并实现数据展示",
      "设计响应式数据面板，适应不同屏幕尺寸",
      "使用ECharts进行数据可视化展示",
    ],
    retrospective: [
      "留意数据密度与视觉层级，避免信息过载",
      "强化筛选与交互反馈，提升操作效率",
      "后续希望增加更多图表导出与自定义布局功能",
    ],
    details: {
      challenge:
        "该项目需要在一个页面展示业务统计个数，同时确保信息层级清晰，避免用户迷失。",
      solution:
        "通过卡片化布局、渐进式加载和数据摘要视图，将关键指标优先展示，并用颜色/图形强化对比。",
      result:
        "最终产品获得客户认可，用户在关键指标页面的平均停留时间提升了18%。",
    },
    coverColor: "portfolio-data-cockpit",
    images: ["/images/portfolio/5g.jpg", "/images/portfolio/5g01.jpg"],
  },
  {
    slug: "data-cockpit-analytics",
    title: "中煤碳排放管理平台驾驶舱",
    category: "Data Cockpit",
    summary:
      "帮助企业直观查看二级、三级、电力/化工等不同行业的碳排放管理数据。",
    timeframe: "2024",
    role: "前端开发",
    impact: "帮助企业直观查看二级、三级、电力/化工等不同行业的碳排放管理数据。",
    tags: ["ECharts", "React", "TypeScript"],
    techStack: ["Vue 3", "TypeScript", "D3.js", "Element Plus", "Vite"],
    highlights: [
      "构建多维数据分析模块，支持自定义报表",
      "实现实时数据流处理和可视化展示",
      "设计直观的数据钻取和筛选交互",
    ],
    retrospective: [
      "数据可视化需要平衡美观与准确性",
      "大数据量下的性能优化至关重要",
      "后续可以增加AI辅助分析功能",
    ],
    details: {
      challenge: "需要处理海量数据并提供实时分析，同时保证系统响应速度。",
      solution: "采用数据分层缓存、虚拟滚动和按需加载策略，优化前端渲染性能。",
      result: "系统查询响应时间从平均 3s 降低到 0.8s，用户满意度显著提升。",
    },
    coverColor: "portfolio-data-cockpit",
    images: ["/images/portfolio/china.jpg"],
  },
  {
    slug: "data-cockpit-monitoring",
    title: "投资公司碳资产数字化驾驶舱",
    category: "Data Cockpit",
    summary: "根据年度统计不同公司的 ccer、碳减排、绿证等碳资产数据。",
    timeframe: "2025",
    role: "前端开发",
    impact: "故障发现时间缩短 60%，系统稳定性大幅提升。",
    tags: ["ECharts", "React", "TypeScript", "AI"],
    techStack: ["React", "TypeScript", "WebSocket", "Ant Design", "Grafana"],
    highlights: [
      "实现实时数据推送和告警机制",
      "构建可自定义的监控面板",
      "支持历史数据回放和趋势分析",
    ],
    retrospective: [
      "实时数据更新需要处理好节流和防抖",
      "告警信息的展示需要避免视觉疲劳",
      "未来可以集成更多自动化运维功能",
    ],
    details: {
      challenge:
        "需要同时监控多个系统，数据量大且更新频繁，要求低延迟和高可靠性。",
      solution: "采用 WebSocket 实时推送、数据分片渲染和智能告警聚合技术。",
      result:
        "系统故障平均恢复时间从 45 分钟降低到 15 分钟，运维效率显著提高。",
    },
    coverColor: "portfolio-data-cockpit",
    images: [
      "/images/portfolio/cecc.jpg",
      "/images/portfolio/cecc/wechat_2026-05-06_223435_479.jpg",
    ],
  },
  {
    slug: "management-system-suite",
    title: "LVMH Beauty 碳数字化管理平台",
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
    images: ["/images/portfolio/lvmh01.jpg", "/images/portfolio/sinotrans.png"],
  },
  {
    slug: "management-system-mind",
    title: "曼德碳数字化运营平台",
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
    images: ["/images/portfolio/mind.jpg", "/images/portfolio/sinotrans.png"],
  },
  {
    slug: "management-system-5g",
    title: "中国联通5G设备碳足迹评估体系",
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
    images: ["/images/portfolio/unicom.jpg", "/images/portfolio/sinotrans.png"],
  },
  {
    slug: "mini-program-commerce",
    title: "碳阻迹碳账户",
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
    images: ["/images/portfolio/carbonstop/wechat_2026-05-06_202244_301.png"],
  },
  {
    slug: "mini-program-vip-carbon",
    title: "vip碳账户",
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
    images: ["/images/portfolio/vip/wechat_2026-05-06_203254_264.png"],
  },
  {
    slug: "mini-program-ysf",
    title: "云闪付碳账户",
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
    images: ["/images/portfolio/ysf/wechat_2026-05-06_205100_181.jpg"],
  },
];
