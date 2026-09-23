import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Unsubscribed",
    description: "You have been removed from the updates list.",
    path: "/unsubscribe-success",
    index: false,
});

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
