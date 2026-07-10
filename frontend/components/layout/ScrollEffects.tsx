"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollManager";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeScroll(() => {
      const bar = barRef.current;
      if (!bar) return;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    });
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[60] h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent will-change-transform"
      aria-hidden
    />
  );
}

export function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    return subscribeScroll(() => {
      const show = window.scrollY > 500;
      button.hidden = !show;
      button.style.opacity = show ? "1" : "0";
      button.style.pointerEvents = show ? "auto" : "none";
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      hidden
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-lg transition-[opacity,border-color] duration-200 hover:border-primary/50 perf-surface"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      ↑
    </button>
  );
}
