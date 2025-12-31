"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/constants/navigation";
import { Github, Twitter, Mail, ExternalLink, MessageSquare, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Let's <span className="text-gradient">Connect</span></h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Whether you want to discuss OS internals, kernel development,
                            or just say hi, feel free to reach out.
                        </p>
                    </motion.div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.name}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Card className="glass border-none h-full hover:bg-primary/5 transition-all group-hover:-translate-y-2">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <method.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">{method.name}</h3>
                                    <p className="text-[10px] text-muted-foreground mb-4 break-all">{method.label}</p>
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardContent>
                            </Card>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
