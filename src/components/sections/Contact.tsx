"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/constants/navigation";
import { Github, Twitter, Mail, ExternalLink, MessageSquare, Linkedin } from "lucide-react";


const contactMethods = [
    { name: "GitHub", icon: Github, href: socialLinks.github, label: "@mohitmishra786" },
    { name: "Discord", icon: MessageSquare, href: socialLinks.discord, label: "Join the community" },
    { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin, label: "Mohit Mishra" },
    { name: "Twitter", icon: Twitter, href: socialLinks.twitter, label: "@chessMan786" },
    { name: "Email", icon: Mail, href: `mailto:${socialLinks.email}`, label: socialLinks.email },
];

interface ContactProps {
    hideHeader?: boolean;
}

export function Contact({ hideHeader = false }: ContactProps) {
    return (
        <section id="contact" className="py-24">
            <div className="container px-4 mx-auto text-center">
                {!hideHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-5xl">Contact</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Whether you want to discuss OS internals, kernel development,
                            or just say hi, feel free to reach out.
                        </p>
                    </motion.div>
                )}

                <ul className="mx-auto flex max-w-3xl flex-col divide-y divide-border border-y border-border text-left">
                    {contactMethods.map((method) => (
                        <li key={method.name}>
                            <a
                                href={method.href}
                                target={method.href.startsWith("mailto:") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <span className="inline-flex items-center gap-3">
                                    <method.icon className="size-4 text-primary" />
                                    <span className="font-medium">{method.name}</span>
                                </span>
                                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="hidden sm:inline">{method.label}</span>
                                    <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
