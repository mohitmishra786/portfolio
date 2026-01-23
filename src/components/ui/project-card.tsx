"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ExternalLink, Github, MousePointer2 } from "lucide-react";
import { MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
    title: string;
    description: string;
    stack: string;
    link: string;
    github: string;
}

export function ProjectCard({ title, description, stack, link, github }: ProjectCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const stacks = stack.split(",").map((s) => s.trim());

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
                        <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/70 group-hover:to-primary transition-colors duration-300">
                            {title}
                        </CardTitle>
                        <div className="flex gap-2">
                            {/* Only show external link if it's different from github or if user explicitly wants both. 
                                 For now, showing both as per data usually having distinct links. */}
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-primary transition-colors duration-200 text-gray-700 dark:text-gray-300"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-primary transition-colors duration-200 text-gray-700 dark:text-gray-300"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 z-10">
                    <p className="text-gray-600 dark:text-muted-foreground leading-relaxed line-clamp-3 min-h-[4.5rem]">
                        {description}
                    </p>

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
                </CardContent>
            </Card>
        </motion.div>
    );
}
