"use client";

import { useEffect, useState } from "react";
import {
  PerformanceModeContext,
  type PerformanceMode,
} from "@/hooks/performanceModeContext";

export function PerformanceModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PerformanceMode>("lite");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const mobile = window.matchMedia("(max-width: 768px)");

    const sync = () => {
      const touch =
        "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
      const lowPower =
        "hardwareConcurrency" in navigator &&
        navigator.hardwareConcurrency <= 4;

      setMode(
        reducedMotion.matches || mobile.matches || (touch && lowPower)
          ? "lite"
          : "full"
      );
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);

  return (
    <PerformanceModeContext.Provider value={mode}>
      {children}
    </PerformanceModeContext.Provider>
  );
}
