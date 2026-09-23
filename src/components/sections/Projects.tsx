"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

interface ProjectsProps {
    hideHeader?: boolean;
}

export function Projects({ hideHeader = false }: ProjectsProps) {
    const [data, setData] = useState<{
        topStarred: Repo[];
        mostForked: Repo[];
        recentlyWorked: Repo[];
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        fetch("/api/github")
            .then((res) => {
                if (!res.ok) throw new Error(String(res.status));
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => {
                setFailed(true);
                setLoading(false);
            });
    }, []);

    const sections = [
        { title: "Top starred", items: data?.topStarred },
        { title: "Most forked", items: data?.mostForked },
        { title: "Recently worked", items: data?.recentlyWorked },
    ];

    if (loading) {
        return (
            <div className="mt-16 grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-40 animate-pulse rounded-xl border border-border bg-muted/40" />
                ))}
            </div>
        );
    }

    if (failed || !data) {
        return (
            <p className="mt-16 text-sm text-muted-foreground">
                Repository lists are unavailable right now.
            </p>
        );
    }

    return (
        <div className="mt-16 space-y-16">
            {!hideHeader && (
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-medium tracking-tight">Projects and research</h2>
                    <p className="mt-3 max-w-[58ch] text-muted-foreground">
                        Public repositories sorted by stars, forks, and recent pushes.
                    </p>
                </div>
            )}

            {sections.map((section) => (
                <section key={section.title}>
                    <h2 className="text-2xl font-medium tracking-tight">{section.title}</h2>
                    <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {(section.items ?? []).map((repo) => (
                            <li key={`${section.title}-${repo.id}`} className="min-w-0">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <span className="flex items-start justify-between gap-3">
                                        <span className="min-w-0 break-words text-lg font-medium leading-snug group-hover:text-primary">
                                            {repo.name}
                                        </span>
                                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                    </span>
                                    <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                        {repo.description || "No description"}
                                    </span>
                                    <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                        {repo.language && (
                                            <span className="rounded-md border border-border px-2 py-0.5">
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1 tabular-nums">
                                            <Star className="size-3 text-primary" />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="inline-flex items-center gap-1 tabular-nums">
                                            <GitFork className="size-3" />
                                            {repo.forks_count}
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
