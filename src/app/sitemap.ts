import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
}[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/open-source-activity", changeFrequency: "weekly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map((route) => ({
        url: absoluteUrl(route.path),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
