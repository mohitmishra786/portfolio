import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/api/blogs";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const posts = await getBlogPosts();
    const post = posts.find(p => p.link.includes(params.slug));

    if (!post) {
        notFound();
    }

    return (
        <div className="pt-32 pb-20 container px-4 mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8">{post.title}</h1>
            <div className="prose prose-invert prose-lg max-w-none">
                {/* In a real app, we would fetch the full content here */}
                <p>{post.contentSnippet}</p>
            </div>
        </div>
    );
}
