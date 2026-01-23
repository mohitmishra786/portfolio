"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ui/project-card";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Featured <span className="text-gradient">Projects</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A collection of tools, libraries, and applications I've built.
                        Focusing on systems programming, AI integration, and developer tooling.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {PROJECTS.map((project) => (
                        <motion.div key={project.id} variants={item} className="h-full">
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                stack={project.stack}
                                link={project.link}
                                github={project.github}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
