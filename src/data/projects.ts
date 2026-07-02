/**
 * Project catalogue for the portfolio.
 *
 * Stats (stars/forks) reflect GitHub as of the last manual refresh and are
 * optionally overridden at build time by the live GitHub API — see
 * `src/lib/github.ts`. Categories drive the filter chips on the Projects page.
 */

export type ProjectCategory =
    | "systems"
    | "developer-tooling"
    | "ai-ml"
    | "web";

export interface Project {
    id: string;
    title: string;
    /** One-line impact-driven summary shown on the card. */
    tagline: string;
    /** Longer description (used on detail/featured views). */
    description: string;
    /** Comma-separated stack string, kept for backwards compatibility with ProjectCard. */
    stack: string;
    category: ProjectCategory;
    /** Live demo / homepage, if any. Empty string when none. */
    homepage?: string;
    /** Project's GitHub repo. */
    github: string;
    /** Canonical link (defaults to homepage if present, else github). */
    link: string;
    /** GitHub star count (enriched live at build time when possible). */
    stars?: number;
    /** GitHub fork count. */
    forks?: number;
    /** Top 3 projects get a larger featured card on the Projects page. */
    featured?: boolean;
    /** Optional highlight metrics rendered as pills on featured cards. */
    highlights?: string[];
    /** Sorting weight — higher appears first within its tier. */
    order?: number;
}

export const PROJECTS: Project[] = [
    // ─── Flagship / highest-traction ──────────────────────────────────────────
    {
        id: "amilearningenough",
        title: "amILearningEnough",
        tagline: "Low-level programming roadmap starred 1,300+ times",
        description:
            "A curated low-level programming roadmap and resource hub covering C, x86 assembly, systems programming, deep learning, and neural networks. Adopted by a community of 1,300+ developers and forked 89 times for personal learning tracks.",
        stack: "C, x86 Assembly, Systems Programming, Deep Learning",
        category: "systems",
        homepage: "https://mohitmishra786.github.io/amILearningEnough/",
        github: "https://github.com/mohitmishra786/amILearningEnough",
        link: "https://mohitmishra786.github.io/amILearningEnough/",
        stars: 1335,
        forks: 89,
        featured: true,
        highlights: ["1,335 stars", "89 forks", "89 contributors"],
        order: 100,
    },
    {
        id: "low-level-dev-skills",
        title: "Low-Level Dev Skills",
        tagline: "AI agent skills suite for C/C++, Rust & Zig toolchains",
        description:
            "A curated suite of AI agent skills for systems and low-level programming, covering compilers, debuggers, profilers, build systems, sanitizers, and binary analysis across C/C++, Rust, and Zig toolchains. Shipped as a product at lowleveldevskills.com with 120+ stars.",
        stack: "C/C++, Rust, Zig, Compilers, Debuggers, Profilers",
        category: "developer-tooling",
        homepage: "https://www.lowleveldevskills.com",
        github: "https://github.com/mohitmishra786/low-level-dev-skills",
        link: "https://www.lowleveldevskills.com",
        stars: 122,
        forks: 15,
        featured: true,
        highlights: ["122 stars", "15 forks", "Production site"],
        order: 95,
    },
    {
        id: "mohit-portfolio",
        title: "Interactive Terminal Portfolio",
        tagline: "This site — an interactive dev portfolio with a terminal",
        description:
            "The portfolio you're looking at: a Next.js App Router site featuring an interactive terminal, GitHub contributions graph, and motion-driven project showcases. 11 stars and 3 forks from other developers using it as a template.",
        stack: "Next.js, TypeScript, React, Tailwind, Framer Motion",
        category: "web",
        homepage: "https://bit.ly/3fzHyPn",
        github: "https://github.com/mohitmishra786/mohit-portfolio",
        link: "https://bit.ly/3fzHyPn",
        stars: 11,
        forks: 3,
        featured: true,
        highlights: ["11 stars", "Live site", "Open-sourced template"],
        order: 90,
    },

    // ─── Developer tooling ────────────────────────────────────────────────────
    {
        id: "confscout",
        title: "ConfScout",
        tagline: "Geospatial intelligence engine for tech conferences",
        description:
            "A premium conference tracking engine that aggregates CFPs and tech events into a single searchable, geospatial interface so developers stop missing deadlines buried in scattered Twitter threads and wikis.",
        stack: "Next.js, TypeScript, React",
        category: "developer-tooling",
        homepage: "https://www.confscouting.com",
        github: "https://github.com/mohitmishra786/confscout",
        link: "https://www.confscouting.com",
        stars: 3,
        forks: 1,
        highlights: ["Live product", "Geospatial search"],
        order: 80,
    },
    {
        id: "agentop",
        title: "agentop",
        tagline: "Terminal dashboard for AI coding token & cost tracking",
        description:
            "A zero-dependency terminal dashboard that reads AI coding assistant session data and surfaces token usage, cost, and cache efficiency at a glance. Helps developers understand what their AI assistants actually do with their tokens.",
        stack: "Go, Terminal, CLI",
        category: "developer-tooling",
        github: "https://github.com/mohitmishra786/agentop",
        link: "https://github.com/mohitmishra786/agentop",
        stars: 3,
        forks: 1,
        highlights: ["Zero dependencies", "Single binary"],
        order: 78,
    },
    {
        id: "mdmend",
        title: "mdmend",
        tagline: "Go Markdown linter — 50 rules, 38 auto-fixable",
        description:
            "A fast Go Markdown linter and fixer with 50 rules (38 auto-fixable), shipped as a single zero-runtime-dependency binary. Distributed via Homebrew, Scoop, and GitHub Actions with SARIF output.",
        stack: "Go, CLI, Linter, GitHub Actions",
        category: "developer-tooling",
        homepage: "https://mohitmishra786.github.io/mdmend/",
        github: "https://github.com/mohitmishra786/mdmend",
        link: "https://mohitmishra786.github.io/mdmend/",
        stars: 1,
        forks: 0,
        highlights: ["Homebrew + Scoop", "SARIF output"],
        order: 76,
    },
    {
        id: "never",
        title: "Never",
        tagline: "Constraint engine to curb AI hallucinations & prompt debt",
        description:
            "A constraint engine for AI coding assistants that mitigates prompt debt and hallucinations with 100+ modular rules across security and code quality, delivered as context-aware guidance.",
        stack: "TypeScript, Node.js",
        category: "developer-tooling",
        github: "https://github.com/mohitmishra786/never",
        link: "https://github.com/mohitmishra786/never",
        stars: 3,
        forks: 0,
        highlights: ["100+ rules", "Security & quality"],
        order: 74,
    },
    {
        id: "prompt-craft",
        title: "Prompt Craft",
        tagline: "VS Code extension for structured AI prompts from code",
        description:
            "A VS Code extension that generates structured AI prompts from code diagnostics and project context, with multi-provider switching and health checks across Groq and OpenAI.",
        stack: "TypeScript, Node.js, Groq, OpenAI",
        category: "developer-tooling",
        github: "https://github.com/mohitmishra786/prompt-craft",
        link: "https://github.com/mohitmishra786/prompt-craft",
        stars: 2,
        forks: 0,
        order: 60,
    },

    // ─── Systems & low-level ──────────────────────────────────────────────────
    {
        id: "control",
        title: "Control",
        tagline: "Unified macOS system control with tiling & hot-reload",
        description:
            "An open-source macOS tool providing Linux-level system control: a tiling engine, custom acceleration curves, and a background daemon for hot-reloading configurations across window management, input customization, and permission handling.",
        stack: "Swift, Shell",
        category: "systems",
        github: "https://github.com/mohitmishra786/control",
        link: "https://github.com/mohitmishra786/control",
        stars: 1,
        forks: 0,
        order: 70,
    },
    {
        id: "lsm-tree",
        title: "LSM Tree Generator",
        tagline: "Memtable, SSTables & Bloom filters in C, visualized",
        description:
            "A from-scratch implementation of core LSM Tree components — Memtable, SSTables, and Bloom filters — in C, with a web visualization demonstrating operations and the compaction process.",
        stack: "C, Data Structures, Systems Programming",
        category: "systems",
        github: "https://github.com/mohitmishra786/lsm-tree-generator",
        link: "https://github.com/mohitmishra786/lsm-tree-generator",
        stars: 4,
        forks: 0,
        order: 68,
    },
    {
        id: "ditrolab",
        title: "DitroLab",
        tagline: "Docker env testing C code across 15 Linux distros",
        description:
            "A Docker-based environment supporting 15 Linux distributions for testing C code compatibility, with an integrated VS Code extension for workflow management and automated testing.",
        stack: "Docker, Shell, Makefile, C",
        category: "systems",
        github: "https://github.com/mohitmishra786/linux-distro-setup-in-mac",
        link: "https://github.com/mohitmishra786/linux-distro-setup-in-mac",
        stars: 1,
        forks: 0,
        order: 66,
    },
    {
        id: "kaggle-lib",
        title: "Kaggle Dataset Downloader",
        tagline: "Cross-platform C library for Kaggle datasets, 100% CI",
        description:
            "A production-ready C library for programmatic Kaggle dataset downloads with a cross-platform CMake build system and 100% CI test coverage.",
        stack: "C, REST APIs, libcurl, JSON-C, CMake",
        category: "systems",
        github: "https://github.com/mohitmishra786/kaggle-c-lib",
        link: "https://github.com/mohitmishra786/kaggle-c-lib",
        stars: 1,
        forks: 0,
        order: 50,
    },

    // ─── Web / interactive learning ───────────────────────────────────────────
    {
        id: "build-distributed-systems",
        title: "Build Distributed Systems",
        tagline: "Learn distributed systems by implementing them, 75 tasks",
        description:
            "An interactive learning platform to master distributed systems by implementing them from scratch — consensus protocols, replicated storage, message queues — across 15 tracks and 75 progressive tasks with automated test verification.",
        stack: "Next.js, TypeScript, Distributed Systems",
        category: "web",
        homepage: "https://build-distributed-systems.vercel.app",
        github: "https://github.com/mohitmishra786/build-distributed-systems",
        link: "https://build-distributed-systems.vercel.app",
        stars: 0,
        forks: 0,
        highlights: ["15 tracks", "75 tasks"],
        order: 72,
    },
    {
        id: "compiler-craft",
        title: "CompilerCraft",
        tagline: "Learn compiler engineering via in-browser C tasks",
        description:
            "A hands-on platform for learning compiler engineering through interactive micro-tasks: write C in the browser, execute against test cases, and progress through structured learning paths covering lexing, parsing, semantic analysis, and code generation.",
        stack: "Next.js, TypeScript, C, x86/ARM",
        category: "web",
        homepage: "https://compiler-craft.vercel.app",
        github: "https://github.com/mohitmishra786/compiler-craft",
        link: "https://compiler-craft.vercel.app",
        stars: 0,
        forks: 0,
        highlights: ["In-browser execution", "Full compiler pipeline"],
        order: 71,
    },
    {
        id: "postgres-hackers-explorer",
        title: "Postgres Hackers Explorer",
        tagline: "AI-powered explorer over 700k pgsql-hackers emails",
        description:
            "An AI-powered reader and explorer for the pgsql-hackers mailing list archive — over 700,000 emails spanning decades. Provides semantic search, RAG-powered Q&A with citations, and patch tracking by commitfest status.",
        stack: "TypeScript, Vector Embeddings, RAG",
        category: "web",
        homepage: "https://postgres-hackers-explorer.vercel.app",
        github: "https://github.com/mohitmishra786/postgres-hackers-explorer",
        link: "https://postgres-hackers-explorer.vercel.app",
        stars: 0,
        forks: 0,
        highlights: ["700k+ emails indexed", "Semantic + RAG search"],
        order: 69,
    },
    {
        id: "vislab",
        title: "VisLab",
        tagline: "Embeddable CPU/cache/scheduler simulations, 17 widgets",
        description:
            "Canvas-based simulations for CPU pipelines, caches, schedulers, and storage — 17 registry widgets embeddable in Astro, React, Jekyll, or static HTML for computer-science education.",
        stack: "TypeScript, Canvas, Astro, React",
        category: "web",
        github: "https://github.com/mohitmishra786/vislab",
        link: "https://github.com/mohitmishra786/vislab",
        stars: 0,
        forks: 0,
        highlights: ["17 widgets", "Multi-framework embed"],
        order: 67,
    },

    // ─── AI / ML ──────────────────────────────────────────────────────────────
    {
        id: "vantage",
        title: "Vantage",
        tagline: "AI extraction of educational clips from YouTube",
        description:
            "An AI-powered tool for extracting educational video clips from YouTube using Groq's Whisper and LLaMA, with smart clip boundaries, dynamic currency support, and a microservice architecture for downloads.",
        stack: "Python, Flask, Node.js, PostgreSQL, Redis, Docker",
        category: "ai-ml",
        homepage: "https://vantage-phi.vercel.app",
        github: "https://github.com/mohitmishra786/vantage",
        link: "https://vantage-phi.vercel.app",
        stars: 0,
        forks: 0,
        order: 64,
    },
    {
        id: "aurora-dev",
        title: "AURORA-DEV",
        tagline: "Autonomous multi-agent system for end-to-end engineering",
        description:
            "Autonomous Unified Recursive Orchestration & Refinement Architecture for Development — a multi-agent system built on LangGraph that plans, implements, audits, and verifies software end-to-end rather than acting as glorified autocomplete.",
        stack: "Python, FastAPI, LangGraph",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/aurora-dev",
        link: "https://github.com/mohitmishra786/aurora-dev",
        stars: 0,
        forks: 0,
        order: 62,
    },
    {
        id: "neurocode",
        title: "NeuroCode",
        tagline: "Turns codebases into explorable knowledge graphs",
        description:
            "A hierarchical code visualization system that transforms codebases into explorable knowledge graphs, integrating backend parsing with Tree-sitter and AST for real-time navigation.",
        stack: "Python, React, TypeScript, Neo4j, FastAPI, Docker",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/NeuroCode",
        link: "https://github.com/mohitmishra786/NeuroCode",
        stars: 0,
        forks: 0,
        order: 58,
    },
    {
        id: "codedocgen",
        title: "CodeDocGen",
        tagline: "AI-driven Doxygen-style comment generation",
        description:
            "A CLI tool and Python library for AI-driven Doxygen-style comment generation, integrating Git change detection and PyPI packaging for cross-platform documentation automation.",
        stack: "Python, NLTK, Groq API, libclang",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/CodeDocGen",
        link: "https://github.com/mohitmishra786/CodeDocGen",
        stars: 3,
        forks: 0,
        order: 56,
    },
    {
        id: "resource-grep",
        title: "Resource Grep",
        tagline: "Real-time search engine with Elasticsearch indexing",
        description:
            "A real-time search engine for programming resources with WebSocket updates and intelligent crawling, built on a microservices architecture with Elasticsearch indexing.",
        stack: "Python, FastAPI, Scrapy, Elasticsearch, Redis",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/resource-grep",
        link: "https://github.com/mohitmishra786/resource-grep",
        stars: 3,
        forks: 0,
        order: 54,
    },
    {
        id: "repotovideo",
        title: "RepoToVideo",
        tagline: "HD video walkthroughs generated from GitHub repos",
        description:
            "A web application that generates HD video walkthroughs from GitHub repositories, integrating AI narration, code highlighting, and dynamic execution visualizations.",
        stack: "Python, Streamlit, MoviePy, ElevenLabs",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/RepoToVideo",
        link: "https://github.com/mohitmishra786/RepoToVideo",
        stars: 0,
        forks: 0,
        order: 52,
    },
    {
        id: "tea-leaf",
        title: "Tea Leaf Quality Predictor",
        tagline: "Detector & classifier deployed to Azure via Flask",
        description:
            "A detector and classifier model that validates images and classifies tea-leaf quality, with the model served through a Flask API deployed to Microsoft Azure.",
        stack: "Python, Flask, Keras, TensorFlow, AWS",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/Tea-Leaf-Quality",
        link: "https://github.com/mohitmishra786/Tea-Leaf-Quality",
        stars: 2,
        forks: 0,
        order: 48,
    },

    // ─── Data / content ───────────────────────────────────────────────────────
    {
        id: "thecoredump",
        title: "TheCoreDump",
        tagline: "Tech stories, unfiltered",
        description:
            "A publication for unfiltered technical storytelling — engineering deep dives, post-mortems, and systems writing for developers.",
        stack: "HTML, Content",
        category: "web",
        homepage: "https://mohitmishra786.github.io/TheCoreDump/",
        github: "https://github.com/mohitmishra786/TheCoreDump",
        link: "https://mohitmishra786.github.io/TheCoreDump/",
        stars: 8,
        forks: 1,
        order: 46,
    },
    {
        id: "vaak",
        title: "Vaak",
        tagline: "Diamond Gate Protocol signal engine, correctness-first",
        description:
            "A high-integrity signal-processing engine implementing the Diamond Gate Protocol, focused on \"Correctness by Construction\" with pure mathematical functions and validated schemas.",
        stack: "Python, Pydantic",
        category: "systems",
        github: "https://github.com/mohitmishra786/vaak",
        link: "https://github.com/mohitmishra786/vaak",
        stars: 0,
        forks: 0,
        order: 44,
    },
    {
        id: "homelessness",
        title: "Homelessness in Texas",
        tagline: "ML analysis predicting fatalities, MAE 53.09",
        description:
            "An analysis of homelessness factors in Texas using probability testing and dimensionality reduction, predicting fatalities with a baseline MAE of 53.09.",
        stack: "Python, ML, Data Analysis",
        category: "ai-ml",
        github: "https://github.com/mohitmishra786/Homelessness-in-Texas",
        link: "https://bit.ly/3AINU77",
        stars: 1,
        forks: 1,
        order: 40,
    },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured).sort(
    (a, b) => (b.order ?? 0) - (a.order ?? 0),
);

export const NON_FEATURED_PROJECTS = PROJECTS.filter(
    (p) => !p.featured,
).sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

export const PROJECT_CATEGORIES: {
    id: ProjectCategory | "all";
    label: string;
}[] = [
    { id: "all", label: "All" },
    { id: "systems", label: "Systems" },
    { id: "developer-tooling", label: "Dev Tooling" },
    { id: "ai-ml", label: "AI/ML" },
    { id: "web", label: "Web" },
];
