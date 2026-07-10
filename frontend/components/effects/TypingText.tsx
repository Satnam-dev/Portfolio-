"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

interface TypingTextProps {
  phrases: string[];
  className?: string;
}

export function TypingText({ phrases, className }: TypingTextProps) {
  const mode = usePerformanceMode();
  const textRef = useRef<HTMLSpanElement>(null);
  const safePhrases = useMemo(
    () => (phrases.length > 0 ? phrases : ["Software Developer"]),
    [phrases]
  );

  useEffect(() => {
    const textNode = textRef.current;
    if (!textNode) return;

    let phraseIndex = 0;
    let displayed = "";
    let isDeleting = false;
    let timeoutId = 0;
    let intervalId = 0;
    let paused = false;
    let visible = true;

    const setText = (value: string) => {
      displayed = value;
      textNode.textContent = value;
    };

    const clearTimers = () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      timeoutId = 0;
      intervalId = 0;
    };

    const schedule = (fn: () => void, delay: number) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(fn, delay);
    };

    const tickFull = () => {
      if (paused || !visible) return;

      const current = safePhrases[phraseIndex] || "";
      const typingSpeed = isDeleting ? 45 : 85;
      const pauseAtEnd = 2400;

      if (!isDeleting && displayed === current) {
        schedule(() => {
          isDeleting = true;
          tickFull();
        }, pauseAtEnd);
        return;
      }

      if (isDeleting && displayed === "") {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % safePhrases.length;
        schedule(tickFull, typingSpeed);
        return;
      }

      const nextLength = isDeleting ? displayed.length - 1 : displayed.length + 1;
      setText(current.slice(0, nextLength));
      schedule(tickFull, typingSpeed);
    };

    const startLite = () => {
      setText(safePhrases[phraseIndex] || "");
      intervalId = window.setInterval(() => {
        if (paused || !visible) return;
        phraseIndex = (phraseIndex + 1) % safePhrases.length;
        setText(safePhrases[phraseIndex] || "");
      }, 3200);
    };

    const start = () => {
      clearTimers();
      if (mode === "lite") {
        startLite();
      } else {
        tickFull();
      }
    };

    const onVisibility = () => {
      paused = document.visibilityState === "hidden";
      if (!paused && visible) {
        if (mode === "lite") {
          if (!intervalId) startLite();
        } else if (!timeoutId) {
          tickFull();
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !paused) {
          if (mode === "lite") {
            if (!intervalId) startLite();
          } else if (!timeoutId) {
            tickFull();
          }
        } else {
          clearTimers();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(textNode);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      clearTimers();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode, safePhrases]);

  return (
    <span className={className}>
      <span ref={textRef} />
      <span className="typing-cursor ml-0.5 inline-block w-[3px] bg-primary align-middle" />
    </span>
  );
}
