import { apiFetch } from "./api";
import type { PortfolioInfo } from "@/types";

export async function getPortfolio(): Promise<PortfolioInfo> {
  return apiFetch<PortfolioInfo>("/portfolio");
}
