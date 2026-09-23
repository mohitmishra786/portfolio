"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <header className="fixed top-0 inset-x-0 z-40 border-b border-border bg-background">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
                <Link
                    href="/"
                    className="shrink-0 text-sm font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                    Mohit Mishra
                </Link>

                <nav className="hidden min-[1100px]:flex items-center gap-1" aria-label="Primary">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "rounded-md px-2.5 py-1.5 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-1">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="inline-flex size-9 items-center justify-center rounded-md text-foreground min-[1100px]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen((value) => !value)}
                    >
                        {open ? <X className="size-4" /> : <Menu className="size-4" />}
                        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                    </button>
                </div>
            </div>

            {open && (
                <nav
                    id="mobile-nav"
                    className="border-t border-border bg-background px-4 py-3 min-[1100px]:hidden"
                    aria-label="Primary"
                >
                    <ul className="flex flex-col">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "block rounded-md px-2 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            isActive ? "text-primary" : "text-foreground"
                                        )}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
        </header>
    );
}
