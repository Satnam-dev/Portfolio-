"use client";

import { useContext } from "react";
import {
  PerformanceModeContext,
  type PerformanceMode,
} from "@/hooks/performanceModeContext";

export type { PerformanceMode };

export function usePerformanceMode(): PerformanceMode {
  return useContext(PerformanceModeContext);
}
