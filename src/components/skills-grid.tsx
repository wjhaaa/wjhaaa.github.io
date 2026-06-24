import { profile } from "@/content/profile";

const iconMap = {
  Zap: null,
  Package: null,
  BarChart3: null,
  Palette: null,
  Wrench: null,
  Lightbulb: null,
};

export function SkillsGrid() {
  return (
    <section className="space-y-10 border-t border-[hsl(var(--border))] pt-16">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          技术专长
        </h2>
        <p className="mt-3 text-[17px] text-[hsl(var(--muted-foreground))]">
          技术能力与项目交付方向
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profile.expertise.map((exp) => {
          void iconMap[exp.icon as keyof typeof iconMap];

          return (
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
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-caption text-[hsl(var(--muted-foreground))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
