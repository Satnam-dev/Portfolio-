"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeScroll } from "@/lib/scrollManager";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeScroll(() => {
      const bar = barRef.current;
      if (!bar) return;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    });
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[60] h-0.5 w-0 bg-gradient-to-r from-primary to-accent"
      aria-hidden
    />
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return subscribeScroll(() => {
      const next = window.scrollY > 500;
      setVisible((prev) => (prev === next ? prev : next));
    });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-lg transition-colors hover:border-primary/50 perf-surface"
    >
      ↑
    </button>
  );
}
