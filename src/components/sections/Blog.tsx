"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    source: string;
    image?: string;
}

interface BlogProps {
    hideHeader?: boolean;
}

export function Blog({ hideHeader = false }: BlogProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.posts?.slice(0, 4) || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Blog fetch error:", err);
                setLoading(false);
            });
    }, []);

    const publications = [
        { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/" },
        { name: "Low-Level-Lore (Substack)", url: "https://chessman7.substack.com" },
        { name: "Medium", url: "https://medium.com/@mohitmishra786687" },
        { name: "X Articles", url: "https://x.com/chessMan786/articles" },
    ];

    return (
        <section id="blog" className="py-24">
            <div className="container px-4 mx-auto">
                {!hideHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Technical <span className="text-gradient">Articles</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Thoughts on systems programming, OS development, and the low-level details of software.
                        </p>
                    </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-[250px] bg-white/5 animate-pulse rounded-2xl" />
                        ))
                    ) : (
                        posts.map((post, index) => (
                            <motion.div
                                key={post.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="glass border-none h-full hover:bg-white/5 transition-all group cursor-pointer overflow-hidden">
                                    <CardHeader>
                                        <div className="flex justify-between items-center mb-4">
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                                {post.source}
                                            </Badge>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {format(new Date(post.pubDate), "MMM d, yyyy")}
                                                </div>
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground line-clamp-2">
                                            {post.contentSnippet.replace(/<[^>]*>?/gm, "")}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-4">
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary font-bold flex items-center gap-2 group/link"
                                        >
                                            Read Article
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                        </a>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="mt-24">
                    <h3 className="text-2xl font-bold text-center mb-8">Explore My Publications</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {publications.map((pub) => (
                            <Button key={pub.name} variant="outline" className="rounded-full gap-2 transition-all hover:bg-primary/10 hover:border-primary/50" asChild>
                                <a href={pub.url} target="_blank" rel="noopener noreferrer">
                                    {pub.name}
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
