import Link from "next/link";
import { Seo } from "@/components/seo";
import { profile } from "@/content/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <Seo title="About" />

      <div className="space-y-8">
        <section className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">{profile.title}</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {profile.location}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <Card>
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
                    className="text-sm underline underline-offset-4 hover:opacity-80"
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

          <Card>
            <CardHeader className="text-sm font-medium">Skills</CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Bio</h2>
          <p className="max-w-3xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">
            I care about building crisp UI, clear information hierarchy, and
            sustainable design systems. This site is a lightweight home for my
            work and learnings.
          </p>
        </section>
      </div>
    </>
  );
}

