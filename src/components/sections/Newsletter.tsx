"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const subscribeSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    honeypot: z.string().optional(),
});

type SubscribeInput = z.infer<typeof subscribeSchema>;

export function Newsletter() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SubscribeInput>({
        resolver: zodResolver(subscribeSchema),
    });

    const onSubmit = async (data: SubscribeInput) => {
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                reset();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Something went wrong. Please try again.");
                setStatus("error");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setErrorMessage("Connection failed. Check your internet and try again.");
            setStatus("error");
        }
    };

    return (
        <section id="newsletter" className="py-24 bg-primary/5 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-cyan/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 mx-auto max-w-4xl text-center relative z-10 font-mono">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-12 rounded-3xl border border-white/10"
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
                                <p className="text-xl font-bold">Subscribed! Check your inbox.</p>
                                <Button variant="ghost" onClick={() => setStatus("idle")} className="hover:bg-emerald-500/10">
                                    Subscribe another email
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-md mx-auto"
                            >
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Honeypot Field (Hidden) */}
                                    <input
                                        type="text"
                                        className="hidden"
                                        {...register("honeypot")}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <Input
                                                {...register("email")}
                                                type="email"
                                                placeholder="user@kernel.org"
                                                className={`rounded-full bg-white/5 border-white/10 h-12 px-6 focus:ring-primary/50 ${errors.email ? "border-red-500/50" : ""
                                                    }`}
                                                disabled={status === "loading"}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="rounded-full px-8 h-12 font-bold bg-primary hover:bg-primary/90 text-black"
                                            disabled={status === "loading"}
                                        >
                                            {status === "loading" ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Subscribe"
                                            )}
                                        </Button>
                                    </div>

                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="text-red-400 text-xs text-left ml-4 mt-2"
                                        >
                                            {errors.email.message}
                                        </motion.p>
                                    )}

                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <p>{errorMessage}</p>
                                        </motion.div>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="mt-8 text-xs text-muted-foreground opacity-60">
                        Join developers from <span className="text-primary">TheCoreDump</span> & <span className="text-primary">exploring-os</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
