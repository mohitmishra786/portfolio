import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Blog",
    description:
        "Technical articles by Mohit Mishra on systems programming, operating systems, and low-level engineering. Essays live on Substack, Medium, and TheCoreDump.",
    path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
