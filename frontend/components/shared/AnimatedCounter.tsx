"use client";

import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    const valueNode = valueRef.current;
    if (!node || !valueNode || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = progress < 1 ? Math.floor(value * progress) : value;
          valueNode.textContent = `${current}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, suffix]);

  return (
    <div ref={ref} className="panel-card perf-surface rounded-2xl p-6 text-center">
      <div className="text-3xl font-bold gradient-text md:text-4xl">
        <span ref={valueRef}>
          0
          {suffix}
        </span>
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
