"use client";

import { createContext } from "react";

export type PerformanceMode = "full" | "lite";

export const PerformanceModeContext = createContext<PerformanceMode>("lite");
