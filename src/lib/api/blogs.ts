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

const feeds = [
    { name: "Substack", url: "https://chessman7.substack.com/feed" },
    { name: "Medium", url: "https://medium.com/feed/@mohitmishra786687" },
    { name: "TheCoreDump", url: "https://mohitmishra786.github.io/TheCoreDump/feed.xml" },
];

function asText(value: unknown): string {
    if (typeof value === "string") return value.trim();
    if (typeof value === "number") return String(value);
    if (Array.isArray(value)) return asText(value[0]);
    if (value && typeof value === "object") {
        const record = value as Record<string, unknown>;
        if (typeof record["#text"] === "string") return record["#text"].trim();
        if (typeof record["__cdata"] === "string") return record["__cdata"].trim();
    }
    return "";
}

function asLink(value: unknown): string {
    if (typeof value === "string") return value.trim();
    if (Array.isArray(value)) {
        const href = value.find((entry) => asLink(entry).startsWith("http"));
        return href ? asLink(href) : asLink(value[0]);
    }
    if (value && typeof value === "object") {
        const record = value as Record<string, unknown>;
        if (typeof record["@_href"] === "string") return record["@_href"].trim();
        return asText(value);
    }
    return "";
}

function snippetFrom(item: Record<string, unknown>): string {
    const raw = asText(item.description) || asText(item.summary) || asText(item["content:encoded"]);
    return raw.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim().slice(0, 180);
}

async function fetchFeed(feed: { name: string; url: string }): Promise<BlogPost[]> {
    const response = await fetch(feed.url, {
        headers: {
            Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
            "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://www.mohitmishra7.com)",
        },
        signal: AbortSignal.timeout(12000),
        next: { revalidate: 1800 },
    });

    if (!response.ok) {
        throw new Error(`${feed.name} returned ${response.status}`);
    }

    const xmlText = await response.text();
    if (!xmlText.includes("<rss") && !xmlText.includes("<feed")) {
        throw new Error(`${feed.name} did not return a feed`);
    }

    const jsonObj = parser.parse(xmlText) as {
        rss?: { channel?: { item?: unknown } };
        feed?: { entry?: unknown };
    };
    const channel = jsonObj.rss?.channel;
    const rawItems = channel?.item || jsonObj.feed?.entry || [];
    const items = (Array.isArray(rawItems) ? rawItems : [rawItems]).filter(Boolean);

    return items.flatMap((entry) => {
        const item = entry as Record<string, unknown>;
        const title = asText(item.title);
        const link = asLink(item.link) || asLink(item.guid);
        const pubDate = asText(item.pubDate) || asText(item.published) || asText(item.updated);
        if (!title || !link.startsWith("http") || Number.isNaN(new Date(pubDate).getTime())) {
            return [];
        }
        const enclosure = item.enclosure as Record<string, unknown> | undefined;
        const media = item["media:content"] as Record<string, unknown> | undefined;
        return [{
            title,
            link,
            pubDate,
            contentSnippet: snippetFrom(item),
            source: feed.name,
            image: asText(enclosure?.["@_url"]) || asText(media?.["@_url"]) || undefined,
        }];
    });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const results = await Promise.all(feeds.map(async (feed) => {
        try {
            return await fetchFeed(feed);
        } catch (error) {
            console.error(`Error fetching feed from ${feed.name}:`, error);
            return [];
        }
    }));

    const seen = new Set<string>();
    return results
        .flat()
        .filter((post) => {
            if (seen.has(post.link)) return false;
            seen.add(post.link);
            return true;
        })
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
