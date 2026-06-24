import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
};

type ParticleFieldProps = {
  className?: string;
  density?: number;
  subtle?: boolean;
  edgeMask?: boolean;
};

function createParticles(
  width: number,
  height: number,
  density: number,
  subtle: boolean,
  edgeMask: boolean,
): Particle[] {
  const maxCount = subtle ? (edgeMask ? 36 : 48) : 110;
  const minCount = subtle ? (edgeMask ? 18 : 24) : 56;
  const count = Math.min(
    maxCount,
    Math.max(minCount, Math.floor((width * height) / density)),
  );

  const placeParticle = () => {
    if (!edgeMask) {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
      };
    }

    const band = 0.14;
    const side = Math.floor(Math.random() * 4);
    switch (side) {
      case 0:
        return { x: Math.random() * width, y: Math.random() * height * band };
      case 1:
        return {
          x: Math.random() * width,
          y: height - Math.random() * height * band,
        };
      case 2:
        return { x: Math.random() * width * band, y: Math.random() * height };
      default:
        return {
          x: width - Math.random() * width * band,
          y: Math.random() * height,
        };
    }
  };

  return Array.from({ length: count }, () => {
    const { x, y } = placeParticle();
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * (subtle ? 0.28 : 0.55),
      vy: (Math.random() - 0.5) * (subtle ? 0.28 : 0.55),
      radius: Math.random() * (subtle ? 1.1 : 1.6) + (subtle ? 0.7 : 1.1),
      alpha: Math.random() * (subtle ? 0.1 : 0.25) + (subtle ? 0.14 : 0.45),
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export function ParticleField({
  className,
  density = 7000,
  subtle = false,
  edgeMask = false,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pointer = { x: -1000, y: -1000, active: false };
    let startTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height, density, subtle, edgeMask);
    };

    const drawParticle = (x: number, y: number, radius: number, alpha: number) => {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
      glow.addColorStop(0, `rgba(120, 200, 255, ${alpha})`);
      glow.addColorStop(0.35, `rgba(41, 151, 255, ${alpha * 0.55})`);
      glow.addColorStop(1, "rgba(41, 151, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(210, 235, 255, ${Math.min(alpha + 0.15, 1)})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = (time - startTime) / 1000;
      const globalBreath = (Math.sin(elapsed * 0.9) + 1) / 2;

      for (const particle of particles) {
        const twinkle =
          (Math.sin(elapsed * 1.4 + particle.phase) + 1) / 2;
        const alpha =
          particle.alpha * (0.55 + globalBreath * 0.25 + twinkle * 0.2);

        particle.vx += Math.sin(elapsed * 0.6 + particle.phase) * 0.004;
        particle.vy += Math.cos(elapsed * 0.5 + particle.phase) * 0.004;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0) {
            const force = (160 - dist) / 160;
            particle.vx += (dx / dist) * force * 0.06;
            particle.vy += (dy / dist) * force * 0.06;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.992;
        particle.vy *= 0.992;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        drawParticle(particle.x, particle.y, particle.radius, alpha);
      }

      const lineBoost = 0.65 + globalBreath * 0.35;
      const maxLineDist = subtle ? (edgeMask ? 100 : 120) : 150;
      const lineStrength = subtle ? (edgeMask ? 0.14 : 0.2) : 0.28;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxLineDist) continue;
          const alpha = (1 - dist / maxLineDist) * lineStrength * lineBoost;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(41, 151, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      animationId = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const onPointerLeave = () => {
      pointer = { x: -1000, y: -1000, active: false };
    };

    resize();
    startTime = performance.now();
    animationId = window.requestAnimationFrame(draw);

    const parent = canvas.parentElement;
    const observer = new ResizeObserver(resize);
    if (parent) {
      observer.observe(parent);
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      if (parent) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [density, subtle, edgeMask]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        edgeMask &&
          "[mask-image:radial-gradient(ellipse_90%_80%_at_50%_42%,transparent_18%,black_70%)]",
        className,
      )}
    />
  );
}
