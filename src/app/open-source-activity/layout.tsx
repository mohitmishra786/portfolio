import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Open source activity",
    description:
        "Open-source contributions by Mohit Mishra: merged, open, and closed pull requests and issues in public projects such as sched-ext/scx and edgcpp/compiler.",
    path: "/open-source-activity",
});

export default function OpenSourceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
