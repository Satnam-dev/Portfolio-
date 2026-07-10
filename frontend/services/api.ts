import { API_BASE } from "@/lib/constants";
import type { ApiResponse } from "@/types";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    signal: AbortSignal.timeout(2000),
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}
