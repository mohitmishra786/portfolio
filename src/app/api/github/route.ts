import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { getCachedData } from "@/lib/cache";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "mohitmishra786";

    try {
        const data = await getCachedData(`github-${username}-v3`, async () => {
            const { data: repos } = await octokit.repos.listForUser({
                username,
                sort: "updated",
                per_page: 100,
            });

            // Calculate stats
            const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
            const totalProjects = repos.length;

            const topStarred = [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 4);
            const mostForked = [...repos].sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0)).slice(0, 4);
            const recentlyWorked = [...repos].sort((a, b) => new Date(b.pushed_at || "").getTime() - new Date(a.pushed_at || "").getTime()).slice(0, 4);

            // Fetch recent events and filter for quality contributions
            const { data: rawEvents } = await octokit.activity.listPublicEventsForUser({
                username,
                per_page: 30,
            });

            const processedEvents = rawEvents
                .filter(event => event.type === "PushEvent" || event.type === "CreateEvent")
                .slice(0, 5)
                .map(event => {
                    const isPush = event.type === "PushEvent";
                    const commit = isPush ? (event.payload as any).commits?.[0] : null;

                    return {
                        id: event.id,
                        type: event.type,
                        repo: event.repo,
                        created_at: event.created_at,
                        message: commit?.message || (event.type === "CreateEvent" ? "Created repository" : "Active contribution"),
                        sha: commit?.sha || null,
                        url: commit
                            ? `https://github.com/${event.repo.name}/commit/${commit.sha}`
                            : `https://github.com/${event.repo.name}`,
                    };
                });

            return {
                stats: {
                    stars: totalStars,
                    projects: totalProjects,
                    commits: "2.4k+",
                },
                topStarred,
                mostForked,
                recentlyWorked,
                recentEvents: processedEvents
            };
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("GitHub API Error:", error);
        return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
    }
}
