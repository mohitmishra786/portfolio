import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { getCachedData } from "@/lib/cache";

const parser = new Parser();

const feeds = [
    { name: "Substack", url: "https://chessman7.substack.com/feed", defaultCount: 51 },
    { name: "Medium", url: "https://medium.com/feed/@mohitmishra786687", defaultCount: 90 },
    { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/feed.xml", defaultCount: 89 },
];

export async function GET() {
    try {
        const data = await getCachedData("blog-feeds", async () => {
            const allPosts = [];
            const counts: Record<string, number> = {
                "Substack": 51,
                "Medium": 90,
                "TheCoreDump": 89,
                "X Articles": 68
            };

            for (const feed of feeds) {
                try {
                    const feedData = await parser.parseURL(feed.url);
                    counts[feed.name] = Math.max(feed.defaultCount, feedData.items.length);
                    const posts = feedData.items.map((item) => ({
                        title: item.title || "Untitled",
                        link: item.link || "#",
                        pubDate: item.pubDate || new Date().toISOString(),
                        contentSnippet: item.contentSnippet || "",
                        source: feed.name,
                        image: item.enclosure?.url,
                    }));
                    allPosts.push(...posts);
                } catch (error) {
                    console.error(`Error fetching ${feed.name}:`, error);
                }
            }

            const totalPosts = Object.values(counts).reduce((a, b) => a + b, 0);
            const sortedPosts = allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

            return {
                posts: sortedPosts,
                stats: {
                    counts,
                    total: totalPosts
                }
            };
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Blog API Error:", error);
        return NextResponse.json({ error: "Failed to fetch blog data" }, { status: 500 });
    }
}
