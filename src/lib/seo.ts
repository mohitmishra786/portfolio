import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/config";
import { socialLinks } from "@/lib/constants/navigation";

function canonicalOrigin(): string {
    const raw = (process.env.NEXT_PUBLIC_BASE_URL || siteConfig.url).replace(/\/$/, "");
    try {
        const url = new URL(raw);
        if (url.hostname === "mohitmishra7.com") {
            url.hostname = "www.mohitmishra7.com";
        }
        return url.origin;
    } catch {
        return siteConfig.url;
    }
}

/** Canonical origin. The apex host 301s here. */
export const siteUrl = canonicalOrigin();

export const sameAs = [
    socialLinks.github,
    socialLinks.linkedin,
    socialLinks.twitter,
    socialLinks.medium,
    socialLinks.substack,
    "https://builddistributedsystem.com",
    "https://www.lowlevelcraft.com",
    "https://www.lowleveldevskills.com",
];

export function absoluteUrl(path: string): string {
    if (path.startsWith("http")) return path;
    return new URL(path, siteUrl).toString();
}

export function pageMetadata({
    title,
    description,
    path,
    index = true,
}: {
    title: string;
    description: string;
    path: string;
    index?: boolean;
}): Metadata {
    const url = absoluteUrl(path);
    return {
        title,
        description,
        alternates: { canonical: url },
        robots: index
            ? { index: true, follow: true }
            : { index: false, follow: true },
        openGraph: {
            title: `${title} | ${siteConfig.name}`,
            description,
            url,
            siteName: siteConfig.name,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${siteConfig.name}`,
            description,
        },
    };
}

export const personJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: "Mohit Mishra",
            alternateName: ["Chessman", "chessMan"],
            url: siteUrl,
            jobTitle: "Systems Programmer",
            email: `mailto:${socialLinks.email}`,
            sameAs,
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: "Mohit Mishra",
            url: siteUrl,
            description:
                "Systems programmer. Build Distributed Systems, LowLevelCraft, and open-source systems work.",
            publisher: { "@id": `${siteUrl}/#person` },
            inLanguage: "en",
        },
    ],
};
