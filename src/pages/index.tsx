import Link from "next/link";
import { Seo } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <Seo title="Home" />

      <div className="space-y-10">
        <section className="space-y-4">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Product-minded engineer · UI-focused · building with craft
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A calm, shadcn-style personal site for about, portfolio, and notes.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-[hsl(var(--muted-foreground))]">
            Explore who I am, what I build, and how I summarize project
            learnings.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/portfolio">Portfolio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/knowledge">Knowledge</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="text-sm font-medium">About</CardHeader>
            <CardContent className="text-sm text-[hsl(var(--muted-foreground))]">
              Intro, skills, and ways to reach me.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-sm font-medium">Portfolio</CardHeader>
            <CardContent className="text-sm text-[hsl(var(--muted-foreground))]">
              Case studies grouped by product category.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-sm font-medium">Knowledge</CardHeader>
            <CardContent className="text-sm text-[hsl(var(--muted-foreground))]">
              Retrospectives and reusable notes.
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

