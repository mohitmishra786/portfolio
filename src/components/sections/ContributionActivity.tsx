"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    itemDate,
    type ContributionData,
    type ContributionItem,
    type ContributionKind,
} from "@/lib/contributions";
import { siteConfig } from "@/lib/constants/config";

const TABS: { kind: ContributionKind; label: string; verb: string; empty: string }[] = [
    { kind: "merged", label: "Merged PRs", verb: "Merged", empty: "No merged pull requests yet." },
    { kind: "openPr", label: "Open PRs", verb: "Opened", empty: "No pull requests waiting on review." },
    { kind: "closedPr", label: "Closed PRs", verb: "Closed", empty: "No closed pull requests." },
    { kind: "openIssue", label: "Open issues", verb: "Opened", empty: "No open issues." },
    { kind: "closedIssue", label: "Closed issues", verb: "Closed", empty: "No closed issues." },
];

const PAGE_SIZE = 20;

function statusLabel(item: ContributionItem): string | null {
    if (item.kind !== "closedIssue") return null;
    if (item.stateReason === "completed") return "Resolved";
    if (item.stateReason === "not_planned") return "Not planned";
    return null;
}

export function ContributionActivity({ items }: { items: ContributionData["items"] }) {
    const [active, setActive] = useState<ContributionKind>(
        TABS.find((tab) => items[tab.kind].length > 0)?.kind ?? "merged",
    );
    const [visible, setVisible] = useState(PAGE_SIZE);

    const tab = TABS.find((t) => t.kind === active)!;
    const list = items[active];

    return (
        <section className="mt-14">
            <h2 className="text-2xl font-medium tracking-tight">Pull requests and issues</h2>

            <div
                role="tablist"
                aria-label="Contribution type"
                className="mt-6 flex flex-wrap gap-2"
            >
                {TABS.map((t) => (
                    <button
                        key={t.kind}
                        type="button"
                        role="tab"
                        id={`tab-${t.kind}`}
                        aria-selected={active === t.kind}
                        aria-controls="contribution-panel"
                        onClick={() => {
                            setActive(t.kind);
                            setVisible(PAGE_SIZE);
                        }}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            active === t.kind
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                        )}
                    >
                        {t.label}
                        <span className="tabular-nums opacity-80">{items[t.kind].length}</span>
                    </button>
                ))}
            </div>

            <div id="contribution-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
                {list.length === 0 ? (
                    <p className="mt-6 text-sm text-muted-foreground">{tab.empty}</p>
                ) : (
                    <ul className="mt-6 divide-y divide-border border-y border-border">
                        {list.slice(0, visible).map((item) => {
                            const status = statusLabel(item);
                            return (
                                <li key={item.id}>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group grid gap-1 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-6"
                                    >
                                        <span className="truncate text-sm font-medium group-hover:text-primary">
                                            {item.repo}
                                            <span className="text-muted-foreground"> #{item.number}</span>
                                        </span>
                                        <span className="min-w-0 text-sm text-muted-foreground group-hover:text-foreground">
                                            {item.title}
                                            {status && (
                                                <span className="ml-2 rounded-md border border-border px-1.5 py-0.5 text-xs">
                                                    {status}
                                                </span>
                                            )}
                                        </span>
                                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                                            {tab.verb} {format(new Date(itemDate(item)), "MMM d, yyyy")}
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {list.length > visible && (
                    <button
                        type="button"
                        onClick={() => setVisible((n) => n + PAGE_SIZE)}
                        className="mt-4 text-sm text-primary hover:underline"
                    >
                        Show {Math.min(PAGE_SIZE, list.length - visible)} more of{" "}
                        {list.length - visible} remaining
                    </button>
                )}
            </div>
        </section>
    );
}

export function ContributedRepos({ repos }: { repos: ContributionData["repos"] }) {
    const [showAll, setShowAll] = useState(false);
    const shown = showAll ? repos : repos.slice(0, 12);

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-medium tracking-tight">Projects contributed to</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((r) => (
                    <li key={r.repo} className="min-w-0">
                        <a
                            href={`https://github.com/${r.repo}/issues?q=${encodeURIComponent(`author:${siteConfig.githubUsername}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <span className="flex items-start justify-between gap-3">
                                <span className="min-w-0 break-words font-medium leading-snug group-hover:text-primary">
                                    {r.repo}
                                </span>
                                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            </span>
                            <span className="mt-2 flex flex-wrap gap-x-3 text-xs tabular-nums text-muted-foreground">
                                {r.merged > 0 && <span>{r.merged} merged</span>}
                                {r.open > 0 && <span>{r.open} open</span>}
                                {r.closed > 0 && <span>{r.closed} closed</span>}
                                {r.issues > 0 && (
                                    <span>
                                        {r.issues} {r.issues === 1 ? "issue" : "issues"}
                                    </span>
                                )}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
            {repos.length > shown.length && (
                <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="mt-4 text-sm text-primary hover:underline"
                >
                    Show all {repos.length} repositories
                </button>
            )}
        </section>
    );
}
