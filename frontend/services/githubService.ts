import { SITE } from "@/lib/constants";
import type { GitHubRepo, GitHubUser } from "@/types";

export async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${SITE.githubUsername}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=6`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.fork);
}
