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
                        <h2 className="text-3xl font-black mb-12">Professional Journey</h2>
                        <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-16">
                            {[
                                {
                                    company: "Outpayce from Amadeus",
                                    role: "Software Developer",
                                    period: "Jul 2023 - Present",
                                    duration: "2 yrs 7 mos",
                                    location: "Bengaluru, Karnataka, India · Hybrid",
                                    desc: [
                                        "Demonstrated strong learning agility by quickly grasping core functionalities written in C++ and SQL used in the payment processing system.",
                                        "Developed innovative improvements to functionalities, streamlining processes and minimizing the need for manual work.",
                                        "Optimized job performance and addressed escalated production issues through code enhancements."
                                    ],
                                    skills: ["C++", "SQL", "Agile Methodologies", "Data Structures", "Algorithms", "Microservices", "DBMS"]
                                },
                                {
                                    company: "Outpayce from Amadeus",
                                    role: "Software Developer Intern",
                                    period: "Feb 2023 - Jul 2023",
                                    duration: "6 mos",
                                    desc: [
                                        "Implemented AngularJS to revamp the Credit Card Tokenization System.",
                                        "Integrated REST API for secure and efficient credit card data handling.",
                                        "Implemented validation procedures using Jasmine and Karma for thorough testing and issue detection.",
                                        "Contributed to developing microservices using Quarkus for optimized performance and scalability."
                                    ],
                                    skills: ["REST APIs", "AngularJS", "Docker", "Kubernetes", "Microservices", "Quarkus", "Kafka", "Java"]
                                },
                                {
                                    company: "Omdena",
                                    role: "Machine Learning Engineer (Intern)",
                                    period: "Sep 2021 - Jul 2022",
                                    duration: "11 mos",
                                    location: "Palo Alto, California, United States",
                                    desc: [
                                        "Managed and guided a team of four engineers in successfully developing an ML prediction model for eviction/homelessness checks.",
                                        "Improved career recommendation model accuracy from 82% to 91% by implementing advanced techniques.",
                                        "Led the development of an image augmentation pipeline for school image datasets.",
                                        "Collaborated with professionals to deploy and manage ML models using edge computing and cloud technologies."
                                    ],
                                    skills: ["Python", "Deep Learning", "Flask", "Computer Vision", "NLP", "Machine Learning", "CI/CD"]
                                },
                                {
                                    company: "JGEC Winter of Code",
                                    role: "Collaborator",
                                    period: "Feb 2023 - Mar 2023",
                                    duration: "2 mos",
                                    location: "Remote",
                                    desc: ["Contributed to open source projects and collaborated with the developer community."]
                                },
                                {
                                    company: "Kharagpur Open Source Society",
                                    role: "Collaborator",
                                    period: "Nov 2021 - Feb 2022",
                                    duration: "4 mos",
                                    desc: ["Participated in open source initiatives and community building."]
                                },
                                {
                                    company: "GirlScript Winter of Contributing",
                                    role: "Open Source Contributor",
                                    period: "Aug 2021 - Dec 2021",
                                    duration: "5 mos",
                                    location: "India",
                                    desc: ["Active contributor to open source repositories and documentation."]
                                },
                                {
                                    company: "iNeuron.ai",
                                    role: "Project Intern",
                                    period: "Jul 2021 - Sep 2021",
                                    duration: "3 mos",
                                    desc: ["Worked on data science and machine learning projects."]
                                }
                            ].map((item, i) => (
                                <div key={i} className="relative pl-8 md:pl-12 group">
                                    {/* Dot */}
                                    <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-primary/20 border-2 border-primary group-hover:scale-125 transition-transform bg-black" />

                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                            {item.role}
                                        </h3>
                                        <div className="font-mono text-sm text-muted-foreground whitespace-nowrap">
                                            {item.period}
                                        </div>
                                    </div>

                                    <div className="text-lg font-medium text-white/80 mb-1">{item.company}</div>

                                    {(item.location || item.duration) && (
                                        <div className="text-xs text-muted-foreground mb-4 flex gap-3">
                                            {item.location && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {item.location}</span>}
                                            {item.duration && <span>• {item.duration}</span>}
                                        </div>
                                    )}

                                    <ul className="space-y-2 mb-4 text-muted-foreground list-disc ml-4">
                                        {item.desc.map((d, k) => (
                                            <li key={k} className="text-sm md:text-base leading-relaxed pl-1">{d}</li>
                                        ))}
                                    </ul>

                                    {item.skills && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {item.skills.map(skill => (
                                                <Badge key={skill} variant="outline" className="text-xs border-white/10 text-white/50 hover:text-white hover:border-white/30">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-20 mt-20">
                        <h2 className="text-3xl font-black mb-12">Publications</h2>
                        <div className="grid gap-8">
                            {[
                                {
                                    title: "Executable Files for Linux: Under the Hood of ELFs for Flexible and Secure Low-Level Coding",
                                    publisher: "Apress",
                                    date: "June 2026 (Forthcoming)",
                                    link: "https://www.amazon.com/Executable-Files-Linux-Flexible-Low-Level/dp/B0FQTTBB79",
                                    desc: "A deep dive into the Executable and Linkable Format (ELF). Explore how code is compiled, linked, and loaded in memory. Covers binary analysis, dynamic linking, symbol resolution, and kernel-level execution processes for systems programmers and security researchers.",
                                    author: "Mohit Mishra",
                                    type: "Book"
                                },
                                {
                                    title: "Global Perspectives on Climate Change, Inequality, and Multinational Corporations",
                                    publisher: "Springer",
                                    date: "April 2025",
                                    link: "https://link.springer.com/book/10.1007/978-3-031-80797-8",
                                    desc: "Investigates the intersection of climate change mitigation, global inequality, and the role of multinational corporations in modern environmental challenges.",
                                    type: "Book"
                                }
                            ].map((pub, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="glass border-none hover:bg-white/[0.03] transition-colors overflow-hidden">
                                        <CardContent className="p-8">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                <div className="space-y-4 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-wider text-[10px]">
                                                            {pub.type}
                                                        </Badge>
                                                        <span className="text-sm text-muted-foreground font-mono">{pub.date}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                        {pub.title}
                                                    </h3>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {pub.desc}
                                                    </p>
                                                    <div className="flex items-center gap-4 pt-2">
                                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                                            <span className="font-semibold">{pub.publisher}</span>
                                                        </div>
                                                        {pub.author && (
                                                            <div className="text-sm text-muted-foreground">
                                                                Author: <span className="text-white/70">{pub.author}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {pub.link && (
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-6 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-bold text-sm whitespace-nowrap"
                                                    >
                                                        View Publication
                                                    </a>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
