"use client";

import { motion } from "framer-motion";
import { Contact } from "@/components/sections/Contact";

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        I&apos;m always open to discussing new projects, creative ideas,
                        or opportunities to be part of your visions.
                    </p>
                </motion.div>

                <Contact hideHeader={true} />
            </div>
        </div>
    );
}
