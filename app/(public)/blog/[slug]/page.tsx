import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MainLayout } from "@/components/layout/main-layout";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch Post
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    notFound();
  }

  // Get Related Posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .eq("category", post.category)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <MainLayout>
      {/* Simple Hero Section */}
      <BlogPostHero post={post} />

      <article className="pb-12 sm:pb-20">
        <div className="container max-w-4xl px-4 sm:px-6 mx-auto">
          {/* Featured Image - Now part of the main flow */}
          <div className="mb-12 aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            <Image
              src={
                post.featured_image_url ||
                `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(
                  post.title
                )}`
              }
              alt={post.title}
              width={1200}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Post Content - Arabic RTL */}
          <FadeIn delay={0.2}>
            <RenderDescription
              className="text-right"
              direction="rtl"
              json={post.content}
            />

            {/* Tags (LTR for English tags, or RTL if Arabic) */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="text-sm font-semibold text-muted-foreground mb-4 text-right">
                  المواضيع:
                </h4>
                <div className="flex flex-wrap justify-end gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary/50 border border-border px-3 py-1 text-sm font-medium hover:bg-secondary hover:text-primary transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <FadeIn delay={0.4}>
                <h2 className="text-3xl font-bold mb-8 text-center">
                  More to Read
                </h2>
                <div
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left"
                  dir="ltr"
                >
                  {relatedPosts.map((relatedPost, index) => (
                    <BlogCard
                      key={relatedPost.id}
                      post={relatedPost}
                      index={index}
                    />
                  ))}
                </div>
              </FadeIn>
            </div>
          )}

          {/* Back Navigation */}
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              View All Posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
