import Link from "next/link";
import { Seo } from "@/components/seo";
import { profile } from "@/content/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AboutHero } from "@/components/about-hero";
import { SkillsGrid } from "@/components/skills-grid";
import { StatsCard } from "@/components/stats-card";

export default function AboutPage() {
  return (
    <>
      <Seo title="About" />

      <div className="space-y-12">
        {/* Hero Section */}
        <AboutHero />

        {/* Contact & Skills Section */}
        <section className="grid gap-4 animate-slideUp sm:grid-cols-2">
          <Card className="transition-all duration-300 hover:border-[hsl(var(--accent))] hover:shadow-lg">
            <CardHeader className="text-sm font-medium">Contact</CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-[hsl(var(--muted-foreground))]">
                {profile.email}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:border-[hsl(var(--accent))] hover:shadow-lg">
            <CardHeader className="text-sm font-medium">
              Quick Skills
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Expertise Section */}
        <SkillsGrid />

        {/* Stats & Achievements Section */}
        <StatsCard />

        {/* Bio Section */}
        <section className="space-y-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 animate-slideUp sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">About Me</h2>
          <div className="space-y-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            <p>
              I'm a frontend engineer passionate about creating delightful user
              experiences and sustainable design systems. With over 5 years of
              experience, I've worked on projects ranging from enterprise-level
              applications to open-source contributions.
            </p>
            <p>
              My focus areas include component architecture, performance
              optimization, and building scalable design systems. I believe in
              writing clean, maintainable code and fostering collaborative team
              environments.
            </p>
            <p>
              Beyond code, I'm enthusiastic about mentoring junior developers,
              sharing knowledge through tech talks, and staying updated with the
              latest web technologies. I'm always eager to learn, experiment,
              and push the boundaries of what's possible on the web.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
