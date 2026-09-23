import type { Metadata } from "next";
import { getEnrichedProjects } from "@/lib/projects";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { pageMetadata } from "@/lib/seo";

// Revalidate at most every hour so live star counts refresh in the background
// without blocking the response.
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Mohit Mishra: systems programming, developer tooling, AI, and interactive learning sites, including Build Distributed Systems and LowLevelCraft.",
  path: "/projects",
});

export default async function ProjectsPage() {
    const projects = await getEnrichedProjects();

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <ProjectsExplorer projects={projects} />
            </div>
        </div>
    );
}
