import { apiFetch } from "./api";
import type { Project } from "@/types";

export async function getProjects(params?: {
  search?: string;
  technology?: string;
}): Promise<Project[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.technology) query.set("technology", params.technology);
  const qs = query.toString();
  return apiFetch<Project[]>(`/projects${qs ? `?${qs}` : ""}`);
}

export async function getProject(id: string): Promise<Project> {
  return apiFetch<Project>(`/projects/${id}`);
}
