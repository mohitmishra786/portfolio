import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/me", "/simple", "/unsubscribe-success"],
        },
        sitemap: absoluteUrl("/sitemap.xml"),
        host: new URL(absoluteUrl("/")).host,
    };
}
