"use client";

import { motion } from "framer-motion";
import { Contact } from "@/components/sections/Contact";

export default function ContactPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-6xl">
                        Contact
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Open to projects, collaborations, and roles in systems engineering.
                    </p>
                </motion.div>

                <Contact hideHeader={true} />
            </div>
        </div>
    );
}
