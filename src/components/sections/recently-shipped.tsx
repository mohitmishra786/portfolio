"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface RecentRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    pushed_at: string;
    language: string | null;
}

export function RecentlyShipped() {
    const [repos, setRepos] = useState<RecentRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/github")
            .then((res) => res.json())
            .then((data) => {
                setRepos((data.recentlyWorked ?? []).slice(0, 5));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                    Recent pushes
                </h2>
                <p className="mt-3 max-w-[52ch] text-muted-foreground">
                    The latest public repositories with a push, from GitHub.
                </p>

                {loading ? (
                    <ul className="mt-8 divide-y divide-border border-y border-border">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index} className="py-5">
                                <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                                <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
                            </li>
                        ))}
                    </ul>
                ) : repos.length === 0 ? (
                    <p className="mt-8 text-sm text-muted-foreground">
                        GitHub activity is unavailable right now.
                    </p>
                ) : (
                    <ul className="mt-8 divide-y divide-border border-y border-border">
                        {repos.map((repo) => (
                            <li key={repo.id}>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group grid gap-2 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[1fr_auto] sm:items-baseline"
                                >
                                    <div>
                                        <h3 className="font-medium group-hover:text-primary">
                                            {repo.name}
                                        </h3>
                                        <p className="mt-1 max-w-[68ch] text-sm text-muted-foreground">
                                            {repo.description || "No description"}
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        {repo.language || "Code"}
                                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
