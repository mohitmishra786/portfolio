"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UnsubscribeSuccess() {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleFeedback = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we don't have a dedicated feedback API yet, we'll just simulate it
        // and perhaps add it later if needed. For now, it's a UI placeholder.
        setSubmitted(true);
    };

    return (
        <div className="flex min-h-[100dvh] items-center justify-center p-4 pt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center"
            >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>

                <h1 className="mb-4 text-3xl font-medium tracking-tight">Unsubscribed</h1>
                <p className="text-muted-foreground mb-8">
                    You have been removed from the updates list.
                </p>

                {!submitted ? (
                    <form onSubmit={handleFeedback} className="text-left space-y-4 mb-8">
                        <label htmlFor="unsubscribe-feedback" className="text-sm font-medium">
                            Optional feedback
                        </label>
                        <textarea
                            id="unsubscribe-feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Why did you unsubscribe?"
                            className="min-h-[100px] w-full resize-none rounded-md border border-input bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <Button type="submit" className="w-full">
                            Send feedback
                        </Button>
                    </form>
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-emerald-500 text-sm mb-8"
                    >
                        Thank you for your feedback!
                    </motion.p>
                )}

                <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Portfolio
                </Link>
            </motion.div>
        </div>
    );
}
