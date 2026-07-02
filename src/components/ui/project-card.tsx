"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ExternalLink, Github, Star, Globe } from "lucide-react";
import { MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    /** Featured cards surface highlights + star counts. */
    featured?: boolean;
}

function formatCount(n?: number): string | null {
    if (n == null) return null;
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    return String(n);
}

export function ProjectCard({ project, featured: forcedFeatured }: ProjectCardProps) {
    const featured = forcedFeatured ?? project.featured ?? false;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const stacks = project.stack.split(",").map((s) => s.trim());
    const hasHomepage = Boolean(project.homepage);
    const starLabel = formatCount(project.stars);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative h-full"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur-md" />

            <Card className="relative h-full bg-white/50 dark:bg-black/40 border-black/5 dark:border-white/10 overflow-hidden backdrop-blur-xl transition-colors duration-500 hover:bg-white/80 dark:hover:bg-black/60 group-hover:border-black/10 dark:group-hover:border-white/20">
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(0,0,0,0.05),
                transparent 80%
              )
            `,
                    }}
                />
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:block hidden"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.1),
                transparent 80%
              )
            `,
                    }}
                />

                <CardHeader className="pb-4 z-10">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1 min-w-0">
                            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/70 group-hover:to-primary transition-colors duration-300">
                                {project.title}
                            </CardTitle>
                            {project.tagline && (
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                    {project.tagline}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} on GitHub`}
                                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-primary transition-colors duration-200 text-gray-700 dark:text-gray-300"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.title}`}
                                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-primary transition-colors duration-200 text-gray-700 dark:text-gray-300"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 z-10">
                    <p className="text-gray-600 dark:text-muted-foreground leading-relaxed line-clamp-3 min-h-[4.5rem]">
                        {project.description}
                    </p>

                    {featured && project.highlights && project.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.highlights.map((h) => (
                                <Badge
                                    key={h}
                                    className="bg-primary/10 text-primary border-primary/20 dark:bg-primary/20"
                                >
                                    {h}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                        {stacks.map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-black/5 dark:bg-white/5 hover:bg-primary/20 hover:text-primary dark:hover:text-primary-foreground border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-200 transition-colors duration-300"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                        {starLabel && (
                            <span className="inline-flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current text-amber-500" />
                                {starLabel}
                                {project.forks ? ` · ${project.forks} forks` : ""}
                            </span>
                        )}
                        {hasHomepage && (
                            <span className="inline-flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Live demo
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
