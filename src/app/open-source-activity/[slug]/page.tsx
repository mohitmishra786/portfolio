import { notFound } from "next/navigation";
import { getPinnedRepos } from "@/lib/api/github";
import { siteConfig } from "@/lib/constants/config";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const repos = await getPinnedRepos(siteConfig.githubUsername);
    const repo = repos.find(r => r.name === params.slug);

    if (!repo) {
        notFound();
    }

    return (
        <div className="pt-32 pb-20 container px-4 mx-auto">
            <h1 className="text-4xl font-black mb-4">{repo.name}</h1>
            <p className="text-xl text-muted-foreground mb-8">{repo.description}</p>
            {/* Detailed content would go here */}
        </div>
    );
}
