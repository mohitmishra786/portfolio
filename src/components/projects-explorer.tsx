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
        return projects
            .filter((p) => p.category === filter)
            .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [byId, filter, projects]);

    return (
        <>
            <div className="mb-12 max-w-3xl">
                <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
                    Projects
                </h1>
                <p className="mt-4 max-w-[58ch] text-lg text-muted-foreground">
                    Learning sites, developer tools, and systems projects. Private repositories stay unlinked. The sites are public.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <li>
                        <span className="font-medium tabular-nums text-foreground">{projects.length}</span>{" "}
                        projects
                    </li>
                    <li>
                        <span className="font-medium tabular-nums text-foreground">
                            {totalStars.toLocaleString()}
                        </span>{" "}
                        GitHub stars on public repos
                    </li>
                    <li>
                        <span className="font-medium tabular-nums text-foreground">
                            {totalForks.toLocaleString()}
                        </span>{" "}
                        forks
                    </li>
                </ul>
            </div>

            {filter === "all" && (
                <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {featured.map((project) => (
                        <ProjectCard key={project.id} project={project} featured />
                    ))}
                </div>
            )}

            {/* Category filters */}
            <div className="mb-8 flex flex-wrap gap-2">
                {PROJECT_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFilter(cat.id)}
                        className={cn(
                            "rounded-md border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
                            filter === cat.id
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:text-foreground",
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
                initial={false}
                animate="show"
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
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
