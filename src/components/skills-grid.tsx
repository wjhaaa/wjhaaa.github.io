import { profile } from "@/content/profile";
import {
  Zap,
  Package,
  BarChart3,
  Palette,
  Wrench,
  Lightbulb,
} from "lucide-react";

const iconMap = {
  Zap,
  Package,
  BarChart3,
  Palette,
  Wrench,
  Lightbulb,
};

export function SkillsGrid() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Expertise</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          A comprehensive overview of my technical skills and specializations
        </p>
      </div>

      <div className="grid gap-6 animate-stagger md:grid-cols-2 lg:grid-cols-3">
        {profile.expertise.map((exp) => {
          const Icon = iconMap[exp.icon as keyof typeof iconMap];
          const colorVar = `--${exp.color}`;

          return (
            <div
              key={exp.category}
              className="group relative overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:border-[hsl(var(--accent))] hover:shadow-lg"
            >
              {/* Gradient background on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                style={{
                  background: `linear-gradient(135deg, hsl(var(${colorVar})) 0%, transparent 100%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">
                    {exp.category}
                  </h3>
                  {Icon && (
                    <div
                      className="rounded-lg p-2 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `hsl(var(${colorVar}) / 0.1)`,
                        color: `hsl(var(${colorVar}))`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200"
                      style={{
                        backgroundColor: `hsl(var(${colorVar}) / 0.1)`,
                        color: `hsl(var(${colorVar}))`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {exp.tags.length > 3 && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                      +{exp.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
