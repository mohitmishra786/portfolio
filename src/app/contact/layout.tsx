import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Contact",
    description:
        "Contact Mohit Mishra about systems engineering projects, collaborations, and roles.",
    path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
