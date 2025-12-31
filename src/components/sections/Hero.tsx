"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const roles = [
    "Systems Programmer",
    "OS Developer",
    "Security Researcher",
    "Low-level Enthusiast",
];

export function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="container px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6"
                >
                    Systems & OS Development Lover
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
                >
                    Hi, I&apos;m <span className="text-gradient">Mohit Mishra</span>
                </motion.h1>

                <div className="h-10 md:h-12 mb-8 flex items-center justify-center">
                    <motion.p
                        key={roleIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xl md:text-3xl font-mono text-muted-foreground"
                    >
                        {roles[roleIndex]}
                    </motion.p>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Deeply passionate about low-level engineering, performance optimization,
                    and building robust system architectures from the ground up.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <Button
                        size="lg"
                        className="rounded-full gap-2 group"
                        asChild
                    >
                        <Link href="/projects">
                            View Projects
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full"
                        asChild
                    >
                        <Link href="/blog">Read Blog</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className="rounded-full gap-2"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Contact Me
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
