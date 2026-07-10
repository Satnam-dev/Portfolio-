import { apiFetch } from "./api";
import type { Experience } from "@/types";

export async function getExperiences(): Promise<Experience[]> {
  return apiFetch<Experience[]>("/experiences");
}
