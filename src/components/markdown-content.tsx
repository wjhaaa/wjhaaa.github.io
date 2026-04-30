import { cn } from "@/lib/utils";

export function MarkdownContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-sm leading-7",
        "[&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight",
        "[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight",
        "[&_p]:mt-4 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_code]:rounded [&_code]:bg-[hsl(var(--muted))] [&_code]:px-1 [&_code]:py-0.5",
        "[&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-[hsl(var(--muted))] [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

