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
        <section id="newsletter" className="py-24">
            <div className="container relative z-10 mx-auto max-w-xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-border bg-card p-8 md:p-10"
                >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">Newsletter</h2>
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

                                    <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                        <div className="flex-1 text-left">
                                            <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium">
                                                Email
                                            </label>
                                            <Input
                                                id="newsletter-email"
                                                {...register("email")}
                                                type="email"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                className={`h-12 bg-background px-4 text-foreground placeholder:text-muted-foreground ${errors.email ? "border-destructive" : ""
                                                    }`}
                                                disabled={status === "loading"}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="h-12 w-full px-6 md:w-auto"
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
