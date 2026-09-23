import { socialLinks } from "@/lib/constants/navigation";

const links = [
    { label: "GitHub", href: socialLinks.github },
    { label: "LinkedIn", href: socialLinks.linkedin },
    { label: "X", href: socialLinks.twitter },
    { label: "Discord", href: socialLinks.discord },
    { label: "Email", href: `mailto:${socialLinks.email}` },
];

const products = [
    { label: "Build Distributed Systems", href: "https://builddistributedsystem.com" },
    { label: "LowLevelCraft", href: "https://www.lowlevelcraft.com" },
    { label: "Low-Level Dev Skills", href: "https://www.lowleveldevskills.com" },
];

export function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="text-lg font-medium tracking-tight">Mohit Mishra</p>
                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                            Systems programming, and courses where you implement the systems.
                        </p>
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        {products.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center">
                    <p>© {new Date().getFullYear()} Mohit Mishra</p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {links.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="/sitemap.xml" className="hover:text-primary">Sitemap</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
