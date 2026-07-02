import type { Metadata } from "next";
import { getEnrichedProjects } from "@/lib/projects";
import { ProjectsExplorer } from "@/components/projects-explorer";

// Revalidate at most every hour so live star counts refresh in the background
// without blocking the response.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source projects by Mohit Mishra — systems programming, developer tooling, AI, and interactive learning platforms. Filter by category.",
};

export default async function ProjectsPage() {
    const projects = await getEnrichedProjects();

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container px-4 mx-auto">
                <ProjectsExplorer projects={projects} />
            </div>
        </div>
    );
}
