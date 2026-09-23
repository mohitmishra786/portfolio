"use client";

import { ExternalLink, Github, Star, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    featured?: boolean;
}

function formatCount(n?: number): string | null {
    if (n == null || n <= 0) return null;
    return n.toLocaleString("en-US");
}

export function ProjectCard({ project, featured: forcedFeatured }: ProjectCardProps) {
    const featured = forcedFeatured ?? project.featured ?? false;
    const stacks = project.stack.split(",").map((s) => s.trim()).slice(0, 4);
    const hasHomepage = Boolean(project.homepage);
    const starLabel = formatCount(project.stars);
    const showGithub = project.repoPublic !== false;
    const showStars = showGithub && Boolean(starLabel);

    return (
        <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="text-lg font-medium tracking-tight">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {project.title}
                        </a>
                    </h3>
                    {project.tagline && (
                        <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
                    )}
                </div>
                <div className="flex shrink-0 gap-1">
                    {showGithub && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <Github className="size-4" />
                        </a>
                    )}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <ExternalLink className="size-4" />
                    </a>
                </div>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
            </p>

            {featured && project.highlights && project.highlights.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                        <li key={highlight}>
                            <Badge className="border-primary/20 bg-primary/10 text-primary">
                                {highlight}
                            </Badge>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                {stacks.map((tech) => (
                    <Badge key={tech} variant="secondary">
                        {tech}
                    </Badge>
                ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {showStars && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                        <Star className="size-3 fill-current text-primary" />
                        {starLabel}
                        {project.forks ? <span>{project.forks} forks</span> : null}
                    </span>
                )}
                {!showGithub && <span>Private repository</span>}
                {hasHomepage && (
                    <span className="inline-flex items-center gap-1">
                        <Globe className="size-3" />
                        Live site
                    </span>
                )}
            </div>
        </article>
    );
}
