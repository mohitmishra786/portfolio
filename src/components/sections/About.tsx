"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function About() {
    const [stats, setStats] = useState([
        { label: "GitHub stars", value: "---" },
        { label: "Public repos", value: "---" },
        { label: "Blog posts", value: "---" },
    ]);

    useEffect(() => {
        // Fetch GitHub Stats
        fetch("/api/github")
            .then(res => res.json())
            .then(data => {
                if (data.stats) {
                    setStats(prev => prev.map(s => {
                        if (s.label === "GitHub stars") return { ...s, value: `${data.stats.stars}+` };
                        if (s.label === "Public repos") return { ...s, value: `${data.stats.projects}` };
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
                        if (s.label === "Blog posts") return { ...s, value: `${data.stats.total}+` };
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
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2 className="mb-8 text-3xl font-medium tracking-tight md:text-5xl">
                            Below the abstractions
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground">
                            <p>
                                My journey into low-level programming started with a simple question:
                                how does the hardware actually talk to the software? This curiosity led me
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

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="border-t border-border pt-4">
                                    <span className="block text-3xl font-medium tabular-nums tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
