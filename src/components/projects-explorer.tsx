"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    FEATURED_PROJECTS,
    NON_FEATURED_PROJECTS,
    PROJECT_CATEGORIES,
    type Project,
    type ProjectCategory,
} from "@/data/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

type FilterId = ProjectCategory | "all";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

/**
 * Client-side explorer for the Projects page. Receives the (optionally
 * live-enriched) project list as props from the server, and handles filter
 * state + animations on the client.
 *
 * Note: featured projects are always taken from the static FEATURED_PROJECTS
 * ordering, but enriched stats (stars/forks) are merged in from the props by id.
 */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState<FilterId>("all");

    // Build a lookup so enriched stats override the static data.
    const byId = useMemo(() => {
        const m = new Map<string, Project>();
        for (const p of projects) m.set(p.id, p);
        return m;
    }, [projects]);

    const totalStars = useMemo(
        () => projects.reduce((sum, p) => sum + (p.stars ?? 0), 0),
        [projects],
    );
    const totalForks = useMemo(
        () => projects.reduce((sum, p) => sum + (p.forks ?? 0), 0),
        [projects],
    );

    const merge = (p: Project) => byId.get(p.id) ?? p;

    const featured = useMemo(
        () => FEATURED_PROJECTS.map(merge),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [byId],
    );
    const rest = useMemo(() => {
        const base = NON_FEATURED_PROJECTS.map(merge);
        if (filter === "all") return base;
        return base.filter((p) => p.category === filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [byId, filter]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-black mb-6">
                    Featured <span className="text-gradient">Projects</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A collection of tools, libraries, and applications I&apos;ve built —
                    spanning systems programming, developer tooling, AI, and the web.
                </p>
            </motion.div>

            <div className="flex items-center justify-center gap-6 mb-10 text-sm text-muted-foreground">
                <span>
                    <span className="font-bold text-foreground">{projects.length}</span>{" "}
                    projects
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                    <span className="font-bold text-foreground">
                        {totalStars.toLocaleString()}
                    </span>{" "}
                    GitHub stars
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                    <span className="font-bold text-foreground">
                        {totalForks.toLocaleString()}
                    </span>{" "}
                    forks
                </span>
            </div>

            {/* Featured tier */}
            <div className="mb-16">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                    ★ Featured
                </h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {featured.map((project) => (
                        <motion.div key={project.id} variants={item} className="h-full">
                            <ProjectCard project={project} featured />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {PROJECT_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border",
                            filter === cat.id
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-transparent text-muted-foreground border-black/10 dark:border-white/10 hover:border-primary/50 hover:text-primary",
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Rest of the projects, filtered */}
            <motion.div
                key={filter}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {rest.map((project) => (
                    <motion.div key={project.id} variants={item} className="h-full">
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>

            {rest.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                    No projects in this category yet.
                </p>
            )}
        </>
    );
}
