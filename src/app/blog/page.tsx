"use client";

import { motion } from "framer-motion";
import { Blog } from "@/components/sections/Blog";

export default function BlogPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        Technical articles
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Recent essays from Low-Level Lore on Substack, TheCoreDump, and Medium.
                    </p>
                </motion.div>

                <Blog hideHeader={true} />
            </div>
        </div>
    );
}
