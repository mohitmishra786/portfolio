"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, BrainCircuit, Cpu, Globe } from "lucide-react";

const mohit = {
    code: ["C", "Python", "JavaScript", "C++", "TypeScript", "Java", "R", "React.js", "Next.js"],
    askMeAbout: [
        "Machine Learning",
        "Deep Learning",
        "MLOps",
        "DevOps",
        "Frontend Development",
        "Backend Development",
        "Competitive Programming",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Flask",
        "TensorFlow",
        "Keras",
        "PyTorch",
        "REST APIs",
        "GraphQL",
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Data Structures",
        "Algorithms"
    ],
    technologies: {
        frontend: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Redux", "Material-UI"],
        backend: ["Flask", "Node.js", "Express.js", "TypeScript", "MongoDB", "MySQL", "PostgreSQL", "GraphQL"],
        devops: ["AWS", "Docker", "Kubernetes", "Jenkins", "Git", "CI/CD"],
        machineLearning: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "Pandas", "NumPy"]
    }
};

const skillGroups = [
    {
        title: "Programming Languages",
        icon: Code2,
        items: mohit.code,
        color: "text-blue-400"
    },
    {
        title: "Frontend Engineering",
        icon: Globe,
        items: mohit.technologies.frontend,
        color: "text-emerald-400"
    },
    {
        title: "Backend & Systems",
        icon: Cpu,
        items: mohit.technologies.backend,
        color: "text-purple-400"
    },
    {
        title: "AI & Data Science",
        icon: BrainCircuit,
        items: mohit.technologies.machineLearning,
        color: "text-orange-400"
    }
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black mb-4">
                            Beyond the <span className="text-gradient">Source Code</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            I&apos;m Mohit Mishra, a software engineer obsessed with performance,
                            systems architecture, and full-stack excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {skillGroups.map((group, i) => (
                            <motion.div
                                key={group.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="glass border-none h-full hover:bg-white/[0.03] transition-colors">
                                    <CardHeader className="pb-3 text-center">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <group.icon className={`w-6 h-6 ${group.color}`} />
                                        </div>
                                        <CardTitle className="text-lg font-bold">{group.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap gap-2 justify-center">
                                        {group.items.map(skill => (
                                            <Badge key={skill} variant="secondary" className="bg-white/5 border-none hover:bg-primary/20 transition-colors">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-black mb-8">Ask Me About</h2>
                            <div className="flex flex-wrap gap-3">
                                {mohit.askMeAbout.map((item, i) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="px-4 py-2 rounded-xl bg-white/5 text-sm text-muted-foreground border border-white/5 hover:border-primary/50 hover:text-primary transition-all cursor-default"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-black mb-8">Cloud & DevOps</h2>
                            <div className="space-y-4">
                                {mohit.technologies.devops.map((tool, i) => (
                                    <div key={tool} className="flex items-center gap-4 group">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="font-mono text-lg text-muted-foreground group-hover:text-white transition-colors">{tool}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-20">
                        <h2 className="text-3xl font-black mb-12">The Journey</h2>
                        <div className="space-y-12">
                            {[
                                { year: "2024", title: "Building myOwnOS", desc: "Started developing a microkernel-based operating system from scratch." },
                                { year: "2023", title: "Reverse Engineering Specialist", desc: "Focused on malware analysis and vulnerability research." },
                                { year: "2022", title: "Systems Programmer", desc: "Landed deep into C development and Linux kernel exploration." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="text-2xl font-black text-primary/30 group-hover:text-primary transition-colors">{item.year}</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
