"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setStatus("error");
        }
    };

    return (
        <section id="newsletter" className="py-24 bg-primary/5 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-cyan/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 mx-auto max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-12 rounded-3xl"
                >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-4">Stay <span className="text-gradient">Updated</span></h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                        Get notified when I publish new articles about systems programming,
                        OS development, and low-level engineering.
                    </p>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center gap-4 text-emerald-500"
                            >
                                <CheckCircle2 className="w-12 h-12" />
                                <p className="text-xl font-bold">You're on the list!</p>
                                <Button variant="ghost" onClick={() => setStatus("idle")}>Subscribe another email</Button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-full bg-white/5 border-white/10 h-12 px-6 focus:ring-primary/50"
                                    disabled={status === "loading"}
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="rounded-full px-8 h-12 font-bold"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <p className="mt-6 text-xs text-muted-foreground">
                        No spam, only pure technical content. Unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
