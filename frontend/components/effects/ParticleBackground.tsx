"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawStars = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 70; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 1.1 + 0.3;
        const alpha = Math.random() * 0.45 + 0.15;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
    };

    drawStars();
    window.addEventListener("resize", drawStars);
    return () => window.removeEventListener("resize", drawStars);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
