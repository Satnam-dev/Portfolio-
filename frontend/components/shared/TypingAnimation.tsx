"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  texts: string[];
  className?: string;
}

export function TypingAnimation({ texts, className }: TypingAnimationProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (display.length < current.length) {
            setDisplay(current.slice(0, display.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (display.length > 0) {
            setDisplay(display.slice(0, -1));
          } else {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, texts]);

  return (
    <span className={className}>
      {display}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-[1em] w-0.5 bg-primary align-middle"
      />
    </span>
  );
}
