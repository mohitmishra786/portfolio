"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { siteConfig } from "@/lib/constants/config";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GitHubActivity() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/github")
            .then(res => res.json())
            .then(data => {
                setEvents(data.recentEvents || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("GitHub Activity fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="github" className="py-24">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        Code & <span className="text-gradient">Contributions</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        My daily journey through the bits and bytes of systems development.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-3xl mb-16 overflow-hidden flex justify-center"
                >
                    <GitHubCalendar
                        username={siteConfig.githubUsername}
                        colorScheme="dark"
                        fontSize={12}
                        blockSize={12}
                        blockMargin={4}
                    />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-32 bg-white/5 animate-pulse rounded-2xl" />
                        ))
                    ) : (
                        events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="glass border-none h-full hover:bg-white/5 transition-colors group">
                                    <CardHeader className="py-4 px-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                                                {event.type.replace("Event", "")}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(event.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <CardTitle className="text-sm font-bold truncate">
                                            {event.repo.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-4">
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {event.payload.commits?.[0]?.message || event.payload.action || "Active contribution"}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
