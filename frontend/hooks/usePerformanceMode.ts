"use client";

import { useEffect, useState } from "react";

export type PerformanceMode = "full" | "lite";

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>("lite");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const touch =
      "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
    const lowPower =
      "hardwareConcurrency" in navigator && navigator.hardwareConcurrency <= 4;

    setMode(
      reducedMotion || mobile || (touch && lowPower) ? "lite" : "full"
    );
  }, []);

  return mode;
}
