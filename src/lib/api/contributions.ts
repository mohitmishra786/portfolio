import { parse as parseYaml } from "yaml";
import { siteConfig } from "@/lib/constants/config";
import {
    itemDate,
    type ContributionData,
    type ContributionItem,
    type ContributionKind,
    type RepoSummary,
} from "@/lib/contributions";

export type { ContributionData };

// The profile README workflow reads the same file, so own orgs, hidden repos and
// featured repos are configured once, in the profile repository.
const PROFILE_CONFIG_URL = `https://api.github.com/repos/${siteConfig.githubUsername}/${siteConfig.githubUsername}/contents/.github/profile-config.yml`;

interface ProfileConfig {
    // Accounts whose repositories are my own work, not contributions to other projects.
    ownOwners: string[];
    excludedRepos: Set<string>;
    // Listed first in "Projects contributed to", in this order.
    featuredRepos: string[];
}

const REVALIDATE_SECONDS = 3600;
const PER_PAGE = 100;
const MAX_PAGES = 5; // the search API stops at 1000 results anyway

interface SearchItem {
    id: number;
    number: number;
    title: string;
    html_url: string;
    repository_url: string;
    state: "open" | "closed";
    state_reason: string | null;
    created_at: string;
    closed_at: string | null;
    pull_request?: { merged_at: string | null };
}

function githubHeaders(accept = "application/vnd.github+json") {
    return {
        Accept: accept,
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
    };
}

function lowerList(value: unknown): string[] {
    return Array.isArray(value) ? value.map((v) => String(v).toLowerCase()) : [];
}

async function getProfileConfig(): Promise<ProfileConfig> {
    const res = await fetch(PROFILE_CONFIG_URL, {
        headers: githubHeaders("application/vnd.github.raw+json"),
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
        throw new Error(`Fetching profile-config.yml failed: ${res.status}`);
    }
    const config = parseYaml(await res.text()) as {
        username?: string;
        contributions?: { own_orgs?: unknown; exclude_repos?: unknown; featured_repos?: unknown };
    };
    const c = config.contributions ?? {};
    return {
        ownOwners: [
            (config.username ?? siteConfig.githubUsername).toLowerCase(),
            ...lowerList(c.own_orgs),
        ],
        excludedRepos: new Set(lowerList(c.exclude_repos)),
        featuredRepos: lowerList(c.featured_repos),
    };
}

async function search(type: "pr" | "issue", ownOwners: string[]): Promise<SearchItem[]> {
    const user = siteConfig.githubUsername;
    const q = [
        `author:${user}`,
        `is:${type}`,
        "is:public",
        ...ownOwners.map((owner) => `-user:${owner}`),
    ].join(" ");


    const items: SearchItem[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
        const params = new URLSearchParams({
            q,
            sort: "updated",
            order: "desc",
            per_page: String(PER_PAGE),
            page: String(page),
        });
        const res = await fetch(`https://api.github.com/search/issues?${params}`, {
            headers: githubHeaders(),
            next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) {
            throw new Error(`GitHub search for ${type}s failed: ${res.status}`);
        }
        const body = (await res.json()) as { total_count: number; items: SearchItem[] };
        items.push(...body.items);
        if (items.length >= body.total_count || body.items.length < PER_PAGE) break;
    }
    return items;
}

function repoName(item: SearchItem): string {
    return item.repository_url.replace("https://api.github.com/repos/", "");
}

function kindOf(item: SearchItem): ContributionKind {
    if (item.pull_request) {
        if (item.pull_request.merged_at) return "merged";
        return item.state === "open" ? "openPr" : "closedPr";
    }
    return item.state === "open" ? "openIssue" : "closedIssue";
}

function featuredRank(featured: string[], repo: string): number {
    const index = featured.indexOf(repo.toLowerCase());
    return index === -1 ? featured.length : index;
}

/**
 * PRs and issues I opened in other people's public repositories, grouped by state.
 * Returns null if GitHub can't be reached so the page can show a fallback.
 */
export async function getContributions(): Promise<ContributionData | null> {
    // Unauthenticated search rejects author: and user: qualifiers with a 422.
    if (!process.env.GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN is not set; open source contributions can't be loaded.");
        return null;
    }

    let config: ProfileConfig;
    let raw: SearchItem[];
    try {
        config = await getProfileConfig();
        const [prs, issues] = await Promise.all([
            search("pr", config.ownOwners),
            search("issue", config.ownOwners),
        ]);
        raw = [...prs, ...issues];
    } catch (error) {
        console.error("Failed to load open source contributions:", error);
        return null;
    }

    const items: ContributionData["items"] = {
        merged: [],
        openPr: [],
        closedPr: [],
        openIssue: [],
        closedIssue: [],
    };
    const repos = new Map<string, RepoSummary>();

    for (const entry of raw) {
        const repo = repoName(entry);
        if (config.excludedRepos.has(repo.toLowerCase())) continue;

        const item: ContributionItem = {
            id: entry.id,
            repo,
            number: entry.number,
            title: entry.title,
            url: entry.html_url,
            kind: kindOf(entry),
            createdAt: entry.created_at,
            closedAt: entry.pull_request?.merged_at ?? entry.closed_at,
            stateReason: entry.pull_request ? null : entry.state_reason,
        };
        items[item.kind].push(item);

        const summary = repos.get(repo) ?? { repo, merged: 0, open: 0, closed: 0, issues: 0, lastActivity: "" };
        if (item.kind === "merged") summary.merged++;
        if (item.kind === "openPr") summary.open++;
        if (item.kind === "closedPr") summary.closed++;
        if (item.kind === "openIssue" || item.kind === "closedIssue") summary.issues++;
        if (itemDate(item) > summary.lastActivity) summary.lastActivity = itemDate(item);
        repos.set(repo, summary);
    }

    for (const list of Object.values(items)) {
        list.sort((a, b) => itemDate(b).localeCompare(itemDate(a)));
    }

    return {
        items,
        repos: [...repos.values()].sort(
            (a, b) =>
                featuredRank(config.featuredRepos, a.repo) -
                    featuredRank(config.featuredRepos, b.repo) ||
                b.lastActivity.localeCompare(a.lastActivity),
        ),
    };
}
