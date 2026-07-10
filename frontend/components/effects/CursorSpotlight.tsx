"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 769px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (!desktop.matches || reducedMotion.matches || coarsePointer.matches) {
      return;
    }

    document.body.classList.add("custom-cursor");

    let x = -500;
    let y = -500;
    let frameId = 0;

    const paint = () => {
      frameId = 0;
      const transform = `translate3d(${x}px, ${y}px, 0)`;
      glowRef.current?.style.setProperty("transform", transform);
      dotRef.current?.style.setProperty("transform", transform);
    };

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frameId) {
        frameId = requestAnimationFrame(paint);
      }
    };

    const leave = () => {
      x = -500;
      y = -500;
      if (!frameId) {
        frameId = requestAnimationFrame(paint);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow pointer-events-none" aria-hidden />
      <div ref={dotRef} className="cursor-dot pointer-events-none" aria-hidden />
    </>
  );
}
