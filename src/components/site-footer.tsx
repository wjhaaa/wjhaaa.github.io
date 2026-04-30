export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-10 text-sm text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} wjhaaa. All rights reserved.</p>
        <p className="text-xs">
          Built with Next.js + Tailwind. Deployed on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}

