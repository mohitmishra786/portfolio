import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getCachedData } from "@/lib/cache";

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
});

const feeds = [
    { name: "Substack", url: "https://chessman7.substack.com/feed", defaultCount: 51 },
    { name: "Medium", url: "https://medium.com/feed/@mohitmishra786687", defaultCount: 90 },
    { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/feed.xml", defaultCount: 89 },
];

export async function GET() {
    try {
        const data = await getCachedData("blog-feeds", async () => {
            const allPosts: any[] = [];
            const counts: Record<string, number> = {
                "Substack": 51,
                "Medium": 90,
                "TheCoreDump": 89,
                "X Articles": 68
            };

            for (const feed of feeds) {
                try {
                    const response = await fetch(feed.url);
                    const xmlText = await response.text();
                    const jsonObj = parser.parse(xmlText);

                    // Support for both RSS 2.0 (channel.item) and Atom (feed.entry)
                    const channel = jsonObj.rss?.channel || jsonObj.feed;
                    const items = channel?.item || jsonObj.feed?.entry || [];
                    const normalizedItems = Array.isArray(items) ? items : [items];

                    counts[feed.name] = Math.max(feed.defaultCount, normalizedItems.length);

                    const posts = normalizedItems.map((item: any) => {
                        // Handle different tag names for RSS vs Atom
                        const title = item.title?.["#text"] || item.title || "Untitled";
                        const link = item.link?.["@_href"] || item.link || "#";
                        const pubDate = item.pubDate || item.published || item.updated || new Date().toISOString();
                        const contentSnippet = item.description || item.summary || item.contentSnippet || "";

                        return {
                            title,
                            link,
                            pubDate,
                            contentSnippet: typeof contentSnippet === "string" ? contentSnippet.replace(/<[^>]*>?/gm, "").slice(0, 160) : "",
                            source: feed.name,
                            image: item.enclosure?.["@_url"] || item["media:content"]?.["@_url"],
                        };
                    });

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
