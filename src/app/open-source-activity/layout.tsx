import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Open source activity",
    description:
        "Open-source activity by Mohit Mishra: recent contributions, pinned repositories, and public systems projects.",
    path: "/open-source-activity",
});

export default function OpenSourceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
