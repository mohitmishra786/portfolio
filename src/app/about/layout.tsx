import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "About",
    description:
        "About Mohit Mishra, a systems programmer working on low-level engineering, operating systems, and developer tools.",
    path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
