import { Octokit } from "@octokit/rest";
import { getCachedData } from "@/lib/cache";
import { PROJECTS, type Project } from "@/data/projects";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const username =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || "mohitmishra786";

/**
 * Extract "owner/name" from a GitHub URL, e.g.
 * "https://github.com/mohitmishra786/amILearningEnough" -> "mohitmishra786/amILearningEnough"
 */
function repoFromUrl(url: string): string | null {
    const match = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\/|\.|$)/);
    return match ? match[1] : null;
}

/**
 * Enrich the static PROJECTS list with live star/fork counts from GitHub.
 *
 * Designed to fail safe: if GITHUB_TOKEN is unset or the API errors, the
 * original PROJECTS (with their last-known manual star counts) are returned
 * unchanged so builds never break. Cached for 10 minutes to stay well within
 * rate limits.
 */
export async function getEnrichedProjects(): Promise<Project[]> {
    return getCachedData<Project[]>(
        `enriched-projects-${username}`,
        async () => {
            // If no token, skip enrichment entirely (e.g. local dev without secrets).
            if (!process.env.GITHUB_TOKEN) {
                return PROJECTS;
            }

            try {
                const { data: repos } = await octokit.repos.listForUser({
                    username,
                    sort: "updated",
                    per_page: 100,
                });

                const byName = new Map<string, { stars: number; forks: number }>();
                for (const r of repos) {
                    byName.set(`${username}/${r.name}`, {
                        stars: r.stargazers_count ?? 0,
                        forks: r.forks_count ?? 0,
                    });
                }

                return PROJECTS.map((p) => {
                    const fullName = repoFromUrl(p.github);
                    if (!fullName) return p;
                    const live = byName.get(fullName);
                    if (!live) return p;
                    return {
                        ...p,
                        stars: live.stars,
                        forks: live.forks,
                    };
                });
            } catch (err) {
                console.error("Project enrichment failed, falling back to static data:", err);
                return PROJECTS;
            }
        },
        10 * 60 * 1000, // 10 min TTL
    );
}
