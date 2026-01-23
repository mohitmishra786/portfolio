"use client";

import { motion } from "framer-motion";
import { Projects } from "@/components/sections/Projects";
import { LatestContributions } from "@/components/sections/LatestContributions";

export default function ProjectsPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        Projects & <span className="text-gradient">Research</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive look at my open-source contributions and personal research projects.
                    </p>
                </motion.div>
            </div>

            <LatestContributions />

            <div className="container px-4 mx-auto mt-12">
                <Projects hideHeader={true} />
            </div>
        </div>
    );
}
