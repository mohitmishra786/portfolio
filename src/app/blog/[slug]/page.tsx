import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/api/blogs";

type BlogParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find((item) => item.link.includes(slug));

    return {
        title: post?.title ?? "Article",
        description: post?.contentSnippet || "Article by Mohit Mishra.",
        robots: { index: false, follow: true },
        alternates: post?.link?.startsWith("http")
            ? { canonical: post.link }
            : undefined,
    };
}

export default async function BlogPostPage({ params }: BlogParams) {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find(p => p.link.includes(slug));

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 pt-24 pb-20">
            <h1 className="text-4xl md:text-6xl font-black mb-8">{post.title}</h1>
            <div className="prose prose-invert prose-lg max-w-none">
                {/* In a real app, we would fetch the full content here */}
                <p>{post.contentSnippet}</p>
            </div>
        </div>
    );
}
