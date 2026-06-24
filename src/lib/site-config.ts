export const siteConfig = {
  name: "Jiahui Wang",
  nameZh: "王家辉",
  domain: "wjhaaa.github.io",
  title: "Frontend Engineer",
  titleZh: "前端工程师",
  tagline: "企业级 React · 数据可视化 · 大屏驾驶舱",
  description:
    "5 年+前端经验，专注数据驾驶舱与企业级中后台交付。曾服务 LVMH Beauty、微众银行、中国联通、中煤集团、北京银行等客户。",
  resumePath: "/resume.pdf",
  email: "17611285079@163.com",
  github: "https://github.com/wjhaaa",
  heroSlug: "data-cockpit-analytics" as const,
  gridSlugs: [
    "data-cockpit-portal",
    "data-cockpit-changan",
    "management-system-suite",
  ] as const,
  clients: [
    "LVMH Beauty",
    "微众银行",
    "中国联通",
    "中煤集团",
    "北京银行",
    "曼德电子",
  ],
  nav: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
  ] as const,
};
