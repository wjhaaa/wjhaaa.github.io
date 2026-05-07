import { profile } from "@/content/profile";
import { useEffect, useState } from "react";

export function AboutHero() {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "擅长长现代化React架构、TypeScript以及设计系统。坚持持续学习、持续开发、持续产品交付。";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index)); // 使用 charAt 确保字符有效
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

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
          {typedText}
        </p>
      </div>
    </section>
  );
}
