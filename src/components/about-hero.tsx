import { profile } from "@/content/profile";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-gradient-hero px-6 py-12 sm:px-8 sm:py-16">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-gradient-to-br from-[hsl(var(--accent))] to-transparent opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 h-48 w-48 rounded-full bg-gradient-to-br from-[hsl(var(--success))] to-transparent opacity-10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 animate-fadeIn space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
          A passionate frontend engineer focused on building delightful user
          experiences. I specialize in modern React architecture, TypeScript,
          and design systems. Always learning, always building, always shipping.
        </p>
      </div>
    </section>
  );
}
