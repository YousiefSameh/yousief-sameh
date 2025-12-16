import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MainLayout } from "@/components/layout/main-layout";
import { BookOpen, Search, FolderOpen } from "lucide-react";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogCard } from "@/components/blog/blog-card";
import { SlideIn } from "@/components/animations/SlideIn";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Blog | Yousief Sameh",
  description:
    "Thoughts on development, growth, engineering notes, and the developer journey.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const page = Number.parseInt(params.page || "1");
  const perPage = 9;

  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (params.category) {
    query = query.eq("category", params.category);
  }

  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,excerpt.ilike.%${params.search}%`
    );
  }

  const { data: posts, count } = await query.range(
    (page - 1) * perPage,
    page * perPage - 1
  );

  // Get categories for filter
  const { data: allPosts } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("is_published", true);
  const categories = [...new Set(allPosts?.map((p) => p.category) || [])];

  const totalPages = Math.ceil((count || 0) / perPage);

  return (
    <MainLayout>
      <section className="py-20 sm:py-28 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-12">
            <SlideIn direction="up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                Blog
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Thoughts & Insights
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Exploring development, personal growth, and the journey of
                building things.
              </p>
            </SlideIn>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-16">
            <FadeIn delay={0.2}>
              <BlogSearch
                categories={categories}
                currentCategory={params.category}
                currentSearch={params.search}
              />
            </FadeIn>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {(!posts || posts.length === 0) && (
            <FadeIn delay={0.3}>
              <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center bg-secondary/10">
                <div className="mx-auto h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No posts found</h3>
                <p className="mt-2 text-muted-foreground">
                  {params.search || params.category
                    ? "Try adjusting your search or filters."
                    : "Blog posts will appear here once published."}
                </p>
              </div>
            </FadeIn>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn delay={0.4}>
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/blog?page=${pageNum}${
                        params.category ? `&category=${params.category}` : ""
                      }${params.search ? `&search=${params.search}` : ""}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        pageNum === page
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "bg-secondary hover:bg-secondary/80 hover:scale-105"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
