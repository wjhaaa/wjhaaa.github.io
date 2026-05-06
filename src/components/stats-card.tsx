import { profile } from "@/content/profile";
import { Calendar, Folder, GitBranch, Users } from "lucide-react";

const iconMap = {
  Calendar,
  Folder,
  GitBranch,
  Users,
};

export function StatsCard() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Achievements</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Quick overview of my professional journey and impact
        </p>
      </div>

      <div className="grid gap-4 animate-stagger sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((stat, index) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap];
          const colors = [
            {
              bg: "hsl(var(--skill-react))",
              light: "hsl(var(--skill-react) / 0.1)",
            },
            {
              bg: "hsl(var(--skill-vue))",
              light: "hsl(var(--skill-vue) / 0.1)",
            },
            {
              bg: "hsl(var(--skill-viz))",
              light: "hsl(var(--skill-viz) / 0.1)",
            },
            { bg: "hsl(var(--skill-ai))", light: "hsl(var(--skill-ai) / 0.1)" },
          ];
          const color = colors[index % colors.length];

          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:shadow-lg hover:border-[hsl(var(--accent))]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${color.light} 0%, transparent 100%)`,
              }}
            >
              {/* Icon */}
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: color.light }}
              >
                {Icon && (
                  <Icon className="h-5 w-5" style={{ color: color.bg }} />
                )}
              </div>

              {/* Value */}
              <div className="mb-2">
                <p
                  className="text-3xl font-bold tracking-tight"
                  style={{ color: color.bg }}
                >
                  {stat.value}
                </p>
              </div>

              {/* Label */}
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Highlights */}
      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <h3 className="mb-4 font-semibold text-[hsl(var(--foreground))]">
          Key Achievements
        </h3>
        <ul className="space-y-3">
          {profile.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-sm text-[hsl(var(--muted-foreground))]"
            >
              <span
                className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: "hsl(var(--accent))" }}
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
