"use client";

import { useEffect, useRef, useState } from "react";

export function CursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 769px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const syncEnabled = () => {
      setEnabled(
        desktop.matches && !reducedMotion.matches && !coarsePointer.matches
      );
    };

    syncEnabled();
    desktop.addEventListener("change", syncEnabled);
    reducedMotion.addEventListener("change", syncEnabled);
    coarsePointer.addEventListener("change", syncEnabled);

    return () => {
      desktop.removeEventListener("change", syncEnabled);
      reducedMotion.removeEventListener("change", syncEnabled);
      coarsePointer.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor");

    let x = -500;
    let y = -500;
    let lastX = x;
    let lastY = y;
    let frameId = 0;
    let idleTimer = 0;

    const setWillChange = (active: boolean) => {
      const value = active ? "transform" : "auto";
      glowRef.current?.style.setProperty("will-change", value);
      dotRef.current?.style.setProperty("will-change", value);
    };

    const paint = () => {
      frameId = 0;
      if (Math.abs(x - lastX) < 0.5 && Math.abs(y - lastY) < 0.5) {
        return;
      }
      lastX = x;
      lastY = y;
      const transform = `translate3d(${x}px, ${y}px, 0)`;
      glowRef.current?.style.setProperty("transform", transform);
      dotRef.current?.style.setProperty("transform", transform);
    };

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      setWillChange(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setWillChange(false), 150);
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
      setWillChange(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.clearTimeout(idleTimer);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow pointer-events-none" aria-hidden />
      <div ref={dotRef} className="cursor-dot pointer-events-none" aria-hidden />
    </>
  );
}
