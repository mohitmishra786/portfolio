"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

interface ContributionEvent {
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
    message: string;
    sha: string | null;
    url: string;
}

export function LatestContributions() {
    const [events, setEvents] = useState<ContributionEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/github")
            .then((res) => res.json())
            .then((data) => {
                setEvents((data.recentEvents ?? []).slice(0, 5));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="mt-14">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-medium tracking-tight">Latest contributions</h2>
                <a
                    href="https://github.com/mohitmishra786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                    GitHub profile
                    <ArrowUpRight className="size-4" />
                </a>
            </div>

            {loading ? (
                <ul className="mt-6 divide-y divide-border border-y border-border">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <li key={index} className="py-4">
                            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
                        </li>
                    ))}
                </ul>
            ) : events.length === 0 ? (
                <p className="mt-6 text-sm text-muted-foreground">
                    GitHub activity is unavailable right now.
                </p>
            ) : (
                <ul className="mt-6 divide-y divide-border border-y border-border">
                    {events.map((event) => {
                        const repoName = event.repo?.name?.split("/")[1] || event.repo?.name;
                        const kind = event.type?.replace("Event", "") || "Activity";
                        const when = event.created_at
                            ? format(new Date(event.created_at), "MMM d, yyyy")
                            : "";

                        return (
                            <li key={event.id}>
                                <a
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group grid gap-1 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6"
                                >
                                    <span className="truncate font-medium group-hover:text-primary">
                                        {repoName}
                                    </span>
                                    <span className="min-w-0 text-sm text-muted-foreground">
                                        {event.message && event.message !== "Active contribution"
                                            ? event.message
                                            : kind}
                                    </span>
                                    <span className="text-sm text-muted-foreground">{when}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
