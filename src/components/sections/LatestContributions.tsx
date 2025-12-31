"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitCommit, Github, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function LatestContributions() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/github")
            .then(res => res.json())
            .then(data => {
                setEvents(data.recentEvents?.slice(0, 3) || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Latest contributions fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    return (
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Github className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Latest Contributions</h3>
                            <p className="text-sm text-muted-foreground">My recent activity on GitHub</p>
                        </div>
                    </div>

                    <div className="flex-1 grid md:grid-cols-3 gap-6 w-full">
                        {events.map((event, index) => {
                            const repoName = event.repo.name.split('/')[1];
                            const shortSha = event.sha?.substring(0, 7);

                            return (
                                <motion.a
                                    key={event.id}
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 group p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                                >
                                    <div className="mt-1">
                                        <GitCommit className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors mb-0.5">
                                            {repoName}
                                        </h4>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                {shortSha ? (
                                                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-1 rounded">
                                                        {shortSha}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-medium text-muted-foreground/50 capitalize">
                                                        {event.type.replace('Event', '')}
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-muted-foreground/30">
                                                    {format(new Date(event.created_at), "MMM d, yyyy")}
                                                </span>
                                            </div>
                                            <p
                                                className="text-xs text-muted-foreground line-clamp-1 leading-relaxed cursor-help"
                                                title={event.message}
                                            >
                                                {event.message}
                                            </p>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    <a
                        href="https://github.com/mohitmishra786"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all whitespace-nowrap"
                    >
                        GitHub Profile <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
