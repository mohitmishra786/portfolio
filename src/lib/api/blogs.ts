import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
});

export interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    source: string;
    image?: string;
}

export async function getBlogPosts() {
    const feeds = [
        { name: "Substack", url: "https://chessman7.substack.com/feed" },
        { name: "Medium", url: "https://medium.com/feed/@mohitmishra786687" },
        { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/feed.xml" },
    ];

    const allPosts: BlogPost[] = [];

    for (const feed of feeds) {
        try {
            const response = await fetch(feed.url);
            const xmlText = await response.text();
            const jsonObj = parser.parse(xmlText);

            const channel = jsonObj.rss?.channel || jsonObj.feed;
            const items = channel?.item || jsonObj.feed?.entry || [];
            const normalizedItems = Array.isArray(items) ? items : [items];

            const posts = normalizedItems.map((item: any) => {
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
            console.error(`Error fetching feed from ${feed.name}:`, error);
        }
    }

    return allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
