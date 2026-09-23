import { ArrowUpRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/projects";

export function Work() {
    return (
        <section id="work" className="pt-10 pb-24">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                    Selected work
                </h2>
                <p className="mt-3 max-w-[58ch] text-muted-foreground">
                    Two learning sites with private repositories, plus the public projects people star.
                </p>

                <ul className="mt-10 border-y border-border">
                    {FEATURED_PROJECTS.map((project) => (
                        <li key={project.id} className="border-b border-border last:border-b-0">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid gap-3 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-12 md:items-baseline md:gap-8"
                            >
                                <div className="md:col-span-3">
                                    <p className="text-3xl font-medium tabular-nums tracking-tight text-primary">
                                        {project.metric?.value}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {project.metric?.label}
                                    </p>
                                </div>
                                <div className="md:col-span-8">
                                    <h3 className="text-xl font-medium tracking-tight group-hover:text-primary md:text-2xl">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                                        {project.tagline}
                                    </p>
                                </div>
                                <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:col-span-1 md:block md:justify-self-end" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
