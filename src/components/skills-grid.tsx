const focusExpertise = [
  {
    category: "React 与企业级中后台",
    description:
      "React 18 + TypeScript 函数式开发，Ant Design / Formily 中后台交付，组件化与性能优化。",
    stack: "React · TypeScript · Ant Design · Vite · Redux Toolkit",
  },
  {
    category: "数据可视化与驾驶舱",
    description:
      "ECharts / AntV 多维图表与大屏布局，地图下钻、响应式 scale 适配多分辨率展示。",
    stack: "ECharts · AntV G6 · 数据驾驶舱 · 大屏自适应",
  },
  {
    category: "跨端与工程化",
    description:
      "Vue3 / Taro 小程序与 H5 跨端，Vite 工程化与 ESLint 规范，Jenkins CI/CD 部署实践。",
    stack: "Vue3 · Taro · 微信小程序 · ESLint · Jenkins",
  },
] as const;

export function SkillsGrid() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
          技术专长
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          核心交付方向
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {focusExpertise.map((exp) => (
          <div
            key={exp.category}
            className="rounded-2xl surface-tertiary p-6"
          >
            <h3 className="text-[19px] font-semibold text-[hsl(var(--foreground))]">
              {exp.category}
            </h3>
            <p className="mt-3 text-[17px] leading-[1.47] text-[hsl(var(--muted-foreground))]">
              {exp.description}
            </p>
            <p className="mt-4 text-[13px] leading-[1.6] text-[hsl(var(--muted-foreground))]">
              {exp.stack}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
