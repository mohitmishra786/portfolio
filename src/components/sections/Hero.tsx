import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
    return (
        <section id="home" className="relative pt-24 pb-6">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top_left,oklch(0.76_0.11_62/0.18),transparent_60%)]"
            />
            <div className="mx-auto w-full max-w-6xl px-4">
                <div className="max-w-3xl">
                    <h1 className="text-balance text-5xl font-medium tracking-tight leading-[1.05] md:text-6xl lg:text-7xl">
                        Mohit Mishra
                    </h1>
                    <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
                        Systems programmer. I teach distributed systems and low-level engineering by making you build them.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" className="active:scale-[0.98]" asChild>
                            <Link href="/projects">View projects</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="active:scale-[0.98]" asChild>
                            <Link href="/blog">Read the blog</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
