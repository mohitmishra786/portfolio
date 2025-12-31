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
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 text-center"
            >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>

                <h1 className="text-3xl font-black mb-4 text-white">Unsubscribed</h1>
                <p className="text-muted-foreground mb-8">
                    You have been successfully removed from our updates list. We're sorry to see you go!
                </p>

                {!submitted ? (
                    <form onSubmit={handleFeedback} className="text-left space-y-4 mb-8">
                        <label className="text-xs text-muted-foreground uppercase tracking-widest ml-1">
                            Optional Feedback
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Tell us why you're leaving..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[100px] resize-none"
                        />
                        <Button type="submit" className="w-full rounded-full bg-white/10 hover:bg-white/20 text-white border-white/10">
                            Send Feedback
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
