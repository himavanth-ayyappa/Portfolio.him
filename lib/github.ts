import { labExclude } from "@/data/lab";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

export async function fetchRepos(user: string): Promise<Repo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    // Optional: set GITHUB_TOKEN in Vercel env vars for a higher rate limit.
    if (process.env.GITHUB_TOKEN)
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`,
      { headers }
    );
    if (!res.ok) return [];
    const repos: Repo[] = await res.json();
    return repos
      .filter((r) => !r.fork && !labExclude.includes(r.name))
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .slice(0, 18);
  } catch {
    return [];
  }
}
