"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    source: string;
}

interface BlogProps {
    hideHeader?: boolean;
}

const publications = [
    { name: "Low-Level Lore", url: "https://chessman7.substack.com" },
    { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/" },
    { name: "Medium", url: "https://medium.com/@mohitmishra786687" },
    { name: "X", url: "https://x.com/chessMan786/articles" },
];

function formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return format(date, "MMM d, yyyy");
}

export function Blog({ hideHeader = false }: BlogProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => {
                if (!res.ok) throw new Error(String(res.status));
                return res.json();
            })
            .then((data) => {
                setPosts(Array.isArray(data.posts) ? data.posts.slice(0, 8) : []);
                setCounts(data.stats?.counts ?? {});
                setLoading(false);
            })
            .catch((err) => {
                console.error("Blog fetch error:", err);
                setFailed(true);
                setLoading(false);
            });
    }, []);

    const substackCount = counts.Substack ?? 0;

    return (
        <section id="blog" className="py-20">
            <div className="mx-auto max-w-6xl px-4">
                {!hideHeader && (
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                            Technical articles
                        </h2>
                        <p className="mt-3 max-w-[62ch] text-muted-foreground">
                            Recent essays from Low-Level Lore on Substack, TheCoreDump, and Medium.
                        </p>
                    </div>
                )}

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {publications.map((publication) => (
                        <li key={publication.url}>
                            <a
                                href={publication.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                            >
                                {publication.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {loading ? (
                    <ul className="mt-8 divide-y divide-border border-y border-border">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <li key={index} className="py-5">
                                <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                                <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-muted" />
                            </li>
                        ))}
                    </ul>
                ) : failed || posts.length === 0 ? (
                    <p className="mt-8 text-sm text-muted-foreground">
                        Articles are unavailable right now. Read Low-Level Lore directly on Substack.
                    </p>
                ) : (
                    <ul className="mt-8 divide-y divide-border border-y border-border">
                        {posts.map((post) => (
                            <li key={post.link}>
                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group grid gap-2 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6"
                                >
                                    <span className="text-sm text-primary">{post.source}</span>
                                    <span>
                                        <span className="block font-medium group-hover:text-primary">
                                            {post.title}
                                        </span>
                                        {post.contentSnippet && (
                                            <span className="mt-1 block max-w-[68ch] text-sm text-muted-foreground">
                                                {post.contentSnippet}
                                            </span>
                                        )}
                                    </span>
                                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        {formatDate(post.pubDate)}
                                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {!loading && !failed && substackCount === 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                        The Substack feed did not return articles on this load.
                    </p>
                )}
            </div>
        </section>
    );
}
