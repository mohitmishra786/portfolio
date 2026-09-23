import { NextResponse } from "next/server";
import { getCachedData } from "@/lib/cache";
import { getBlogPosts } from "@/lib/api/blogs";

export async function GET() {
    try {
        const data = await getCachedData("blog-feeds-v2", async () => {
            const posts = await getBlogPosts();
            const counts: Record<string, number> = {};
            for (const post of posts) {
                counts[post.source] = (counts[post.source] ?? 0) + 1;
            }

            return {
                posts,
                stats: {
                    counts,
                    total: posts.length,
                },
            };
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Blog API Error:", error);
        return NextResponse.json({ error: "Failed to fetch blog data" }, { status: 500 });
    }
}
