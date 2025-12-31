"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
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

    useEffect(() => {
        fetch("/api/github")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Projects fetch error:", err);
                setLoading(false);
            });
    }, []);

    const sections = [
        { title: "Top Starred", icon: Star, items: data?.topStarred },
        { title: "Most Forked", icon: GitFork, items: data?.mostForked },
        { title: "Recently Worked", icon: Clock, items: data?.recentlyWorked },
    ];

    if (loading) {
        return (
            <section id="projects" className="py-24 bg-muted/30">
                <div className="container px-4 mx-auto text-center">
                    <div className="animate-pulse space-y-8">
                        <div className="h-10 bg-white/5 w-1/3 mx-auto rounded" />
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-white/5 rounded-2xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                {!hideHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Projects & <span className="text-gradient">Research</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Categorized overview of my technical contributions and open-source impact.
                        </p>
                    </motion.div>
                )}

                <div className="space-y-24">
                    {sections.map((section, sIndex) => (
                        <div key={section.title}>
                            <div className="flex items-center gap-3 mb-8">
                                <section.icon className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-bold">{section.title}</h3>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {section.items?.map((repo, rIndex) => (
                                    <motion.div
                                        key={repo.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: rIndex * 0.1 }}
                                    >
                                        <Card className="glass border-none h-full hover:bg-white/5 transition-all group overflow-hidden">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-lg font-bold truncate group-hover:text-primary transition-colors">
                                                        {repo.name}
                                                    </CardTitle>
                                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-white" />
                                                    </a>
                                                </div>
                                                <Badge variant="secondary" className="w-fit">
                                                    {repo.language || "C++"}
                                                </Badge>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                                                    {repo.description || "No description provided."}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3" />
                                                        {repo.stargazers_count}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <GitFork className="w-3 h-3" />
                                                        {repo.forks_count}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button size="lg" className="rounded-full gap-2" asChild>
                        <a href={`https://github.com/mohitmishra786`} target="_blank">
                            Explore More on GitHub
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
