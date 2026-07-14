export const siteConfig = {
  name: "Jiahui Wang",
  nameZh: "王佳慧",
  domain: "wjhaaa.github.io",
  url: "https://wjhaaa.github.io",
  mirrorUrl: "https://workhrad.gitee.io/wjhaaa.github.io/",
  giteeRepo: "https://gitee.com/workhrad/wjhaaa.github.io",
  ogImage: "/images/portfolio/china.jpg",
  avatarPath: "/avatar.jpg" as string | undefined,
  title: "Frontend Engineer",
  titleZh: "前端工程师",
  tagline: "企业级 React · 数据可视化 · 大屏驾驶舱",
  description:
    "5 年+前端经验，专注数据驾驶舱与企业级中后台交付。服务金融、能源、零售等行业头部客户。",
  resumePath: "/resume.pdf",
  email: "17611285079@163.com",
  github: "https://github.com/wjhaaa",
  heroSlug: "data-cockpit-analytics" as const,
  heroMetric: {
    before: "3s",
    after: "0.8s",
    label: "集团驾驶舱查询响应",
  },
  gridSlugs: [
    "data-cockpit-portal",
    "data-cockpit-changan",
    "management-system-suite",
  ] as const,
  aiDashboard: {
    title: "AI 驾驶舱生成器",
    description:
      "把多年驾驶舱交付经验抽象成 schema + 模块库：用自然语言描述需求，快速生成可编辑的数据看板原型，展示 AI 时代的前端产品化思路。",
    href: "/ai-dashboard",
  },
  clients: [
    "LVMH Beauty",
    "微众银行",
    "中国联通",
    "中煤集团",
    "北京银行",
    "曼德电子",
  ],
  nav: [
    { href: "/portfolio", label: "作品集" },
    { href: "/about", label: "关于" },
  ] as const,
};
