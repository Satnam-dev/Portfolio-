"use client";

import { useEffect, useMemo, useRef } from "react";

interface TypingTextProps {
  phrases: string[];
  className?: string;
}

export function TypingText({ phrases, className }: TypingTextProps) {
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
    let paused = false;
    let visible = true;

    const setText = (value: string) => {
      displayed = value;
      textNode.textContent = value;
    };

    const clearTimer = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = 0;
      }
    };

    const schedule = (fn: () => void, delay: number) => {
      clearTimer();
      timeoutId = window.setTimeout(() => {
        timeoutId = 0;
        fn();
      }, delay);
    };

    const tick = () => {
      if (paused || !visible) return;

      const current = safePhrases[phraseIndex] || "";
      const typingSpeed = isDeleting ? 45 : 85;
      const pauseAtEnd = 2400;

      if (!isDeleting && displayed === current) {
        schedule(() => {
          isDeleting = true;
          tick();
        }, pauseAtEnd);
        return;
      }

      if (isDeleting && displayed === "") {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % safePhrases.length;
        schedule(tick, typingSpeed);
        return;
      }

      const nextLength = isDeleting
        ? displayed.length - 1
        : displayed.length + 1;
      setText(current.slice(0, nextLength));
      schedule(tick, typingSpeed);
    };

    const resume = () => {
      if (paused || !visible) return;
      if (!timeoutId) tick();
    };

    const onVisibility = () => {
      paused = document.visibilityState === "hidden";
      if (paused) {
        clearTimer();
      } else {
        resume();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          clearTimer();
        } else {
          resume();
        }
      },
      { threshold: 0.05 }
    );

    setText("");
    observer.observe(textNode);
    document.addEventListener("visibilitychange", onVisibility);
    tick();

    return () => {
      clearTimer();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [safePhrases]);

  return (
    <span className={className}>
      <span ref={textRef} />
      <span className="typing-cursor ml-0.5 inline-block w-[3px] bg-primary align-middle" />
    </span>
  );
}
