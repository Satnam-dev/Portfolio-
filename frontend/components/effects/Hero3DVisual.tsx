"use client";

import { useEffect, useRef } from "react";

type Vec3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;

const RAW_VERTICES: Vec3[] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
];

const normalize = ([x, y, z]: Vec3): Vec3 => {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
};

const VERTICES = RAW_VERTICES.map(normalize);

const EDGES: [number, number][] = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9], [10, 11],
];

const rotate = ([x, y, z]: Vec3, ax: number, ay: number): Vec3 => {
  const cosY = Math.cos(ay);
  const sinY = Math.sin(ay);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;

  const cosX = Math.cos(ax);
  const sinX = Math.sin(ax);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return [x1, y2, z2];
};

const project = (
  [x, y, z]: Vec3,
  size: number,
  depth: number
): [number, number, number] => {
  const perspective = depth / (depth - z);
  return [x * perspective * size, y * perspective * size, z];
};

export function Hero3DVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let angleX = 0.35;
    let angleY = 0;
    let width = 0;
    let height = 0;
    let size = 0;
    let lastFrame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      size = Math.min(width, height) * 0.34;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);
      if (!visibleRef.current) return;
      if (time - lastFrame < 32) return;
      lastFrame = time;

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        size * 0.1,
        centerX,
        centerY,
        size * 1.1
      );
      glow.addColorStop(0, "rgba(255,255,255,0.12)");
      glow.addColorStop(0.45, "rgba(129,140,248,0.14)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const rotated = VERTICES.map((vertex) => rotate(vertex, angleX, angleY));
      const projected = rotated.map((vertex) => project(vertex, size, 4));

      const [sphereX, sphereY] = project([0, 0, 0], size * 0.42, 4);
      const sphereGradient = ctx.createRadialGradient(
        centerX + sphereX - 6,
        centerY + sphereY - 6,
        2,
        centerX + sphereX,
        centerY + sphereY,
        size * 0.32
      );
      sphereGradient.addColorStop(0, "rgba(129,140,248,0.95)");
      sphereGradient.addColorStop(0.55, "rgba(67,56,202,0.95)");
      sphereGradient.addColorStop(1, "rgba(15,23,42,0.9)");
      ctx.beginPath();
      ctx.arc(centerX + sphereX, centerY + sphereY, size * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      EDGES.forEach(([start, end]) => {
        const [x1, y1, z1] = projected[start];
        const [x2, y2, z2] = projected[end];
        const depth = (z1 + z2) / 2;
        const alpha = 0.25 + ((depth + 1) / 2) * 0.55;

        ctx.beginPath();
        ctx.moveTo(centerX + x1, centerY + y1);
        ctx.lineTo(centerX + x2, centerY + y2);
        ctx.strokeStyle = `rgba(226,232,240,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      angleY += 0.004;
      angleX = 0.35 + Math.sin(angleY * 0.7) * 0.06;
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-surface/30 p-6 backdrop-blur-sm md:p-8">
        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-border/50 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              Core Stack
            </p>
            <p className="mt-1 text-sm font-medium text-foreground/90">
              Python · Node.js · MongoDB
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["PYTHON", "AI/ML", "FULL-STACK"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-[10px] font-semibold tracking-wider text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
