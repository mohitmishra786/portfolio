/**
 * Project catalogue for the portfolio.
 *
 * Stats (stars/forks) reflect GitHub as of the last manual refresh and are
 * optionally overridden at build time by the live GitHub API. See
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
    /** Sorting weight. Higher appears first within its tier. */
    order?: number;
    /** False when the GitHub repo is private and should not be linked. */
    repoPublic?: boolean;
    /** Headline figure for featured rows. */
    metric?: { value: string; label: string };
    /** Extra figures shown beside the headline metric. */
    metrics?: { value: string; label: string }[];
}

export const PROJECTS: Project[] = [
    // ─── Flagship / highest-traction ──────────────────────────────────────────
    {
        id: "build-distributed-systems",
        title: "Build Distributed Systems",
        tagline: "28 tracks and 343+ challenges, from message passing to consensus",
        description:
            "A hands-on course for distributed systems. You implement real algorithms against Maelstrom-style tests: message passing, gossip, Raft, storage engines, queues, and failure handling, in eight languages. The repository is private. The site is public.",
        stack: "Distributed Systems, Maelstrom, Go, Rust, C++, Python",
        category: "systems",
        homepage: "https://builddistributedsystem.com",
        github: "https://github.com/mohitmishra786/build-distributed-systems",
        link: "https://builddistributedsystem.com",
        repoPublic: false,
        featured: true,
        highlights: ["5,000+ users", "28 tracks", "343+ challenges"],
        metric: { value: "5,000+", label: "users" },
        order: 100,
    },
    {
        id: "lowlevelcraft",
        title: "LowLevelCraft",
        tagline: "479 tasks in C, assembly, compilers, CPUs, and operating systems",
        description:
            "A practice site for low-level engineering. Tracks cover language foundations, compilers, CPU architecture, firmware, operating systems, performance, binary analysis, networking, virtual machines, graphics, and storage. The repository is private. The site is public.",
        stack: "C, x86, ARM, Compilers, Operating Systems",
        category: "systems",
        homepage: "https://www.lowlevelcraft.com",
        github: "https://github.com/mohitmishra786/low-level-craft",
        link: "https://www.lowlevelcraft.com",
        repoPublic: false,
        featured: true,
        highlights: ["1,556+ registered users", "479 tasks", "1,551+ test cases"],
        metric: { value: "1,556+", label: "registered users" },
        order: 95,
    },
    {
        id: "amilearningenough",
        title: "amILearningEnough",
        tagline: "Low-level programming roadmap with 1,356 GitHub stars",
        description:
            "A curated low-level programming roadmap and resource hub covering C, x86 assembly, systems programming, deep learning, and neural networks. Forked 89 times for personal learning tracks.",
        stack: "C, x86 Assembly, Systems Programming, Deep Learning",
        category: "systems",
        homepage: "https://mohitmishra786.github.io/amILearningEnough/",
        github: "https://github.com/mohitmishra786/amILearningEnough",
        link: "https://mohitmishra786.github.io/amILearningEnough/",
        stars: 1356,
        forks: 89,
        featured: true,
        highlights: ["1,356 stars", "89 forks"],
        metric: { value: "1,356", label: "GitHub stars" },
        order: 90,
    },
    {
        id: "low-level-dev-skills",
        title: "Low-Level Dev Skills",
        tagline: "142 agent skills for C, C++, Rust, and Zig. 226 GitHub stars.",
        description:
            "A curated suite of AI agent skills for systems and low-level programming, covering compilers, debuggers, profilers, build systems, sanitizers, and binary analysis across C, C++, Rust, and Zig. 51.1k installs on skills.sh, and 226 GitHub stars. Published at lowleveldevskills.com.",
        stack: "C/C++, Rust, Zig, Compilers, Debuggers, Profilers",
        category: "developer-tooling",
        homepage: "https://www.lowleveldevskills.com",
        github: "https://github.com/mohitmishra786/low-level-dev-skills",
        link: "https://www.lowleveldevskills.com",
        stars: 226,
        forks: 28,
        featured: true,
        highlights: ["226 stars", "51.1k installs", "142 skills"],
        metric: { value: "51.1k", label: "installs" },
        metrics: [
            { value: "51.1k", label: "installs" },
            { value: "226", label: "GitHub stars" },
        ],
        order: 85,
    },
    {
        id: "mohit-portfolio",
        title: "Portfolio template",
        tagline: "Earlier open-source portfolio template, 11 GitHub stars",
        description:
            "An older open-source portfolio template other developers have starred and forked. This site is the current portfolio.",
        stack: "Next.js, TypeScript, React, Tailwind",
        category: "web",
        homepage: "https://bit.ly/3fzHyPn",
        github: "https://github.com/mohitmishra786/mohit-portfolio",
        link: "https://bit.ly/3fzHyPn",
        stars: 11,
        forks: 3,
        order: 45,
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
        tagline: "Go Markdown linter, 50 rules, 38 auto-fixable",
        description:
            "A fast Go Markdown linter and fixer with 50 rules (38 auto-fixable), shipped as a single zero-runtime-dependency binary. Distributed via Homebrew, Scoop, and GitHub Actions with SARIF output.",
        stack: "Go, CLI, Linter, GitHub Actions",
        category: "developer-tooling",
        homepage: "https://mohitmishra786.github.io/mdmend/",
        github: "https://github.com/mohitmishra786/mdmend",
        link: "https://mohitmishra786.github.io/mdmend/",
        stars: 3,
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
            "A from-scratch implementation of core LSM Tree components (Memtable, SSTables, and Bloom filters) in C, with a web visualization of operations and compaction.",
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
        id: "readprism",
        title: "Readprism",
        tagline: "RSS reader that ranks a digest by how you actually read",
        description:
            "A self-hostable RSS and newsletter reader with a behavioral, explainable ranking engine. Open source under AGPL-3.0.",
        stack: "Python, RSS",
        category: "web",
        homepage: "https://readprism.app",
        github: "https://github.com/mohitmishra786/readprism",
        link: "https://readprism.app",
        stars: 5,
        forks: 0,
        order: 73,
    },
    {
        id: "postgres-hackers-explorer",
        title: "Postgres Hackers Explorer",
        tagline: "AI-powered explorer over 700k pgsql-hackers emails",
        description:
            "An AI-powered reader for the pgsql-hackers mailing list archive, over 700,000 emails spanning decades. Semantic search, cited Q&A, and patch tracking by commitfest status.",
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
            "Canvas-based simulations for CPU pipelines, caches, schedulers, and storage. 17 widgets you can embed in Astro, React, Jekyll, or static HTML.",
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
            "A multi-agent system built on LangGraph that plans, implements, audits, and verifies software end to end, instead of acting as autocomplete.",
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
            "A publication for technical storytelling: engineering deep dives, post-mortems, and systems writing for developers.",
        stack: "HTML, Content",
        category: "web",
        homepage: "https://mohitmishra786.github.io/TheCoreDump/",
        github: "https://github.com/mohitmishra786/TheCoreDump",
        link: "https://mohitmishra786.github.io/TheCoreDump/",
        stars: 9,
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
