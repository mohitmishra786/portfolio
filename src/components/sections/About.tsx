"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, GitCommit, Layout, PenTool } from "lucide-react";
import { useEffect, useState } from "react";

export function About() {
    const [stats, setStats] = useState([
        { label: "GitHub Stars", value: "---", icon: Star, color: "text-yellow-500" },
        { label: "Total Commits", value: "2.4k+", icon: GitCommit, color: "text-blue-500" },
        { label: "Projects Built", value: "---", icon: Layout, color: "text-purple-500" },
        { label: "Blog Posts", value: "---", icon: PenTool, color: "text-emerald-500" },
    ]);

    useEffect(() => {
        // Fetch GitHub Stats
        fetch("/api/github")
            .then(res => res.json())
            .then(data => {
                if (data.stats) {
                    setStats(prev => prev.map(s => {
                        if (s.label === "GitHub Stars") return { ...s, value: `${data.stats.stars}+` };
                        if (s.label === "Projects Built") return { ...s, value: `${data.stats.projects}+` };
                        return s;
                    }));
                }
            })
            .catch(err => console.error("Error fetching GitHub stats:", err));

        // Fetch Blog Stats
        fetch("/api/blog")
            .then(res => res.json())
            .then(data => {
                if (data.stats) {
                    setStats(prev => prev.map(s => {
                        if (s.label === "Blog Posts") return { ...s, value: `${data.stats.total}+` };
                        return s;
                    }));
                }
            })
            .catch(err => console.error("Error fetching blog stats:", err));
    }, []);

    return (
        <section id="about" className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-8">
                            A Deep Dive into <span className="text-gradient">Systems Engineering</span>
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground">
                            <p>
                                My journey into low-level programming started with a simple question:
                                "How does the hardware actually talk to the software?" This curiosity led me
                                down the hole of kernel development, memory management, and processor architectures.
                            </p>
                            <p>
                                Today, I specialize in building operating systems and experimental system software.
                                I believe that to truly understand computing, one must look below the abstractions and
                                embrace the complexity of the hardware-software interface.
                            </p>
                            <p>
                                When I&apos;m not debugging kernel panics or optimizing cache performance, I write about my
                                findings on my blog, sharing the intricacies of systems programming
                                with the developer community.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="glass border-none shadow-none">
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                                        <span className="text-3xl font-bold mb-1">{stat.value}</span>
                                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
