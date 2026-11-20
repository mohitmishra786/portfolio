// Shared by the server loader (lib/api/contributions.ts) and the client lists.

export type ContributionKind = "merged" | "openPr" | "closedPr" | "openIssue" | "closedIssue";

export interface ContributionItem {
    id: number;
    repo: string;
    number: number;
    title: string;
    url: string;
    kind: ContributionKind;
    createdAt: string;
    closedAt: string | null;
    // "completed" or "not_planned" for closed issues; null otherwise.
    stateReason: string | null;
}

export interface RepoSummary {
    repo: string;
    merged: number;
    open: number;
    closed: number;
    issues: number;
    lastActivity: string;
}

export interface ContributionData {
    items: Record<ContributionKind, ContributionItem[]>;
    repos: RepoSummary[];
}

// The date a list is sorted and labelled by: when it was opened for open items,
// when it was merged or closed otherwise.
export function itemDate(item: ContributionItem): string {
    return item.kind === "openPr" || item.kind === "openIssue"
        ? item.createdAt
        : (item.closedAt ?? item.createdAt);
}
