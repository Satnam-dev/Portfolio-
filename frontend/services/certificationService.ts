import { apiFetch } from "./api";
import type { Certification } from "@/types";

export async function getCertifications(): Promise<Certification[]> {
  return apiFetch<Certification[]>("/certifications");
}
