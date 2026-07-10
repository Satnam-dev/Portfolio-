"use client";

import { useEffect, useMemo, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

interface TypingTextProps {
  phrases: string[];
  className?: string;
}

export function TypingText({ phrases, className }: TypingTextProps) {
  const mode = usePerformanceMode();
  const safePhrases = useMemo(
    () => (phrases.length > 0 ? phrases : ["Software Developer"]),
    [phrases]
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (mode === "lite") {
      setDisplayed(safePhrases[phraseIndex] || "");
      const timer = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % safePhrases.length);
      }, 3200);
      return () => clearInterval(timer);
    }

    const current = safePhrases[phraseIndex] || "";
    const typingSpeed = isDeleting ? 45 : 85;
    const pauseAtEnd = 2400;
    const pauseBeforeDelete = 2000;

    if (!isDeleting && displayed === current) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAtEnd);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % safePhrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      const nextLength = isDeleting ? displayed.length - 1 : displayed.length + 1;
      setDisplayed(current.slice(0, nextLength));
    }, isDeleting ? typingSpeed : displayed === current ? pauseBeforeDelete : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, mode, phraseIndex, safePhrases]);

  return (
    <span className={className}>
      {displayed}
      <span className="typing-cursor ml-0.5 inline-block w-[3px] bg-primary align-middle" />
    </span>
  );
}
