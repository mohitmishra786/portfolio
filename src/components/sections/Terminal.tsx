"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mohit = {
    code: ["C", "Python", "JavaScript", "C++", "TypeScript", "Java", "R", "React.js", "Next.js"],
    technologies: {
        frontend: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Redux", "Material-UI"],
        backend: ["Flask", "Node.js", "Express.js", "TypeScript", "MongoDB", "MySQL", "PostgreSQL", "GraphQL"],
        devops: ["AWS", "Docker", "Kubernetes", "Jenkins", "Git", "CI/CD"],
        machineLearning: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "Pandas", "NumPy"]
    }
};

export function Terminal() {
    const [history, setHistory] = useState<(string | JSX.Element)[]>([
        <div key="welcome" className="mb-4">
            <div className="text-orange-500 font-bold mb-2">Welcome to Mohit Mishra&apos;s Interactive Terminal!</div>
            <div className="text-sm opacity-80">Explore my portfolio using simple commands.</div>
        </div>,
        "Type 'help' to see available commands."
    ]);
    const [input, setInput] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);

    const formatBulletList = (items: string[], title: string) => (
        <div className="mb-4">
            <div className="text-orange-400 font-bold mb-1">{title}:</div>
            <div className="space-y-1 ml-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="text-orange-500">→</span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const formatLinkList = (items: { label: string; url: string; desc?: string }[], title: string) => (
        <div className="mb-4">
            <div className="text-orange-400 font-bold mb-1">{title}:</div>
            <div className="space-y-2 ml-2">
                {items.map((item, i) => (
                    <div key={i} className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500">→</span>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
                            >
                                {item.label}
                            </a>
                        </div>
                        {item.desc && <div className="text-xs opacity-60 ml-6">{item.desc}</div>}
                    </div>
                ))}
            </div>
        </div>
    );

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const fullInput = input.trim();
        if (!fullInput) return;

        const cmd = fullInput.toLowerCase();
        let newHistory = [...history, <div key={Date.now()} className="flex gap-2">
            <span className="text-emerald-500 font-bold">mohit@ubuntu:~$</span>
            <span className="text-white">{fullInput}</span>
        </div>];

        switch (cmd) {
            case "help":
                newHistory.push(
                    <div key="help-output" className="grid grid-cols-2 gap-2 mt-2 opacity-80">
                        <div><span className="text-orange-400 font-bold">projects</span> - View my key projects</div>
                        <div><span className="text-orange-400 font-bold">blog</span> - See my technical articles</div>
                        <div><span className="text-orange-400 font-bold">skills</span> - List my technical expertise</div>
                        <div><span className="text-orange-400 font-bold">about</span> - Brief bio</div>
                        <div><span className="text-orange-400 font-bold">clear</span> - Reset terminal history</div>
                    </div>
                );
                break;
            case "projects":
                newHistory.push(formatLinkList([
                    { label: "exploring-os", url: "https://github.com/mohitmishra786/exploring-os", desc: "Building an operating system from scratch." },
                    { label: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/", desc: "Systems programming blog and project." },
                    { label: "Advanced Portfolio", url: "/projects", desc: "This very portfolio platform." }
                ], "Key Projects"));
                break;
            case "blog":
                newHistory.push(formatLinkList([
                    { label: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/", desc: "Deep dives into system internals." },
                    { label: "Medium", url: "https://medium.com/@mohitmishra786687", desc: "Software engineering and AI topics." },
                    { label: "Substack", url: "https://chessman7.substack.com/", desc: "Regular newsletters and thoughts." }
                ], "Technical Publications"));
                break;
            case "skills":
                newHistory.push(
                    <div key="skills-output">
                        {formatBulletList(mohit.code, "Languages")}
                        {formatBulletList([...mohit.technologies.backend, ...mohit.technologies.devops], "Systems & Backend")}
                    </div>
                );
                break;
            case "about":
                newHistory.push(
                    <div key="about-output" className="mb-4 leading-relaxed opacity-90">
                        I&apos;m Mohit Mishra, a systems programming specialist. I love building things from scratch—whether it&apos;s an operating system kernel or a high-performance web platform.
                    </div>
                );
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            default:
                newHistory.push(<div key="error" className="text-red-400 italic">Command not found: {cmd}. Type &apos;help&apos; for a list of commands.</div>);
        }

        setHistory(newHistory);
        setInput("");
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <section id="terminal" className="py-24 bg-black">
            <div className="container px-4 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-[#300a24] rounded-xl overflow-hidden border border-white/10 shadow-2xl h-[550px] flex flex-col font-mono"
                >
                    {/* Ubuntu Header */}
                    <div className="bg-[#410c2f] px-4 py-2 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-white/60 text-xs font-medium">mohit@ubuntu: ~</div>
                        <div className="w-12" />
                    </div>

                    {/* Content */}
                    <div
                        ref={terminalRef}
                        className="flex-1 p-6 text-white text-sm overflow-y-auto scrollbar-thin scrollbar-white/10"
                    >
                        <AnimatePresence mode="popLayout">
                            {history.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mb-2"
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
                            <span className="text-emerald-400 font-bold whitespace-nowrap">mohit@ubuntu:~$</span>
                            <input
                                type="text"
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white w-full caret-white"
                                placeholder="explore..."
                            />
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
