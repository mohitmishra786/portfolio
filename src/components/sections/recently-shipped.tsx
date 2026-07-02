"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, GitCommit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RecentRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    pushed_at: string;
    language: string | null;
}

/**
 * Compact "Recently shipped" strip for the homepage. Pulls the most recently
 * pushed repos from /api/github (already fetched elsewhere and cached).
 */
export function RecentlyShipped() {
    const [repos, setRepos] = useState<RecentRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/github")
            .then((res) => res.json())
            .then((data) => {
                setRepos((data.recentlyWorked ?? []).slice(0, 3));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="py-16">
                <div className="container px-4 mx-auto">
                    <div className="h-6 w-40 bg-white/5 rounded animate-pulse mx-auto" />
                </div>
            </section>
        );
    }

    if (repos.length === 0) return null;

    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-black">
                        Recently <span className="text-gradient">Shipped</span>
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2">
                        Latest from the workbench
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {repos.map((repo, i) => (
                        <motion.a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="block"
                        >
                            <Card className="glass border-none h-full hover:bg-white/5 transition-all group">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                                            {repo.name}
                                        </h3>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                        {repo.description || "Recent work"}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                                        <GitCommit className="w-3 h-3" />
                                        {repo.language || "code"}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
