import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPinnedRepos } from "@/lib/api/github";
import { siteConfig } from "@/lib/constants/config";
import { absoluteUrl } from "@/lib/seo";

type RepoParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: RepoParams): Promise<Metadata> {
    const { slug } = await params;
    const repos = await getPinnedRepos(siteConfig.githubUsername);
    const repo = repos.find((item) => item.name === slug);
    const canonical = repo?.html_url || absoluteUrl(`/open-source-activity/${slug}`);

    return {
        title: repo?.name ?? "Repository",
        description: repo?.description || "Open-source repository by Mohit Mishra.",
        robots: { index: false, follow: true },
        alternates: { canonical },
    };
}

export default async function ProjectDetailPage({ params }: RepoParams) {
    const { slug } = await params;
    const repos = await getPinnedRepos(siteConfig.githubUsername);
    const repo = repos.find(r => r.name === slug);

    if (!repo) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 pt-24 pb-20">
            <h1 className="text-4xl font-black mb-4">{repo.name}</h1>
            <p className="text-xl text-muted-foreground mb-8">{repo.description}</p>
            {/* Detailed content would go here */}
        </div>
    );
}
