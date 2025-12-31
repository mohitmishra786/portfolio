import Parser from "rss-parser";

const parser = new Parser();

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
        // TheCoreDump might not have a direct RSS if it's static, 
        // but usually GitHub Pages Jekyll sites have /feed.xml
        { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/feed.xml" },
    ];

    const allPosts: BlogPost[] = [];

    for (const feed of feeds) {
        try {
            const data = await parser.parseURL(feed.url);
            const posts = data.items.map((item) => ({
                title: item.title || "Untitled",
                link: item.link || "#",
                pubDate: item.pubDate || new Date().toISOString(),
                contentSnippet: item.contentSnippet || "",
                source: feed.name,
                // Basic extraction for images if available in content
                image: item.enclosure?.url,
            }));
            allPosts.push(...posts);
        } catch (error) {
            console.error(`Error fetching feed from ${feed.name}:`, error);
        }
    }

    return allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
