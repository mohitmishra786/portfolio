import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export async function getGithubRepos(username: string) {
    try {
        const { data } = await octokit.repos.listForUser({
            username,
            sort: "updated",
            per_page: 100,
        });
        return data;
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}

export async function getPinnedRepos(username: string) {
    // Pinned repos are not directly available via REST API easily without GraphQL
    // We will filter by specific names for now or use the most starred ones
    const repos = await getGithubRepos(username);
    const pinnedNames = [
        "myJourneyOfBuildingOS",
        "reversingBits",
        "amILearningEnough",
        "underTheHoodOfExecutables",
        "BitsAndBytes",
        "exploring-os",
    ];

    return repos.filter(repo => pinnedNames.includes(repo.name) || repo.stargazers_count! > 10);
}
