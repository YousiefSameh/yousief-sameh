import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/types";

interface BlogPostHeroProps {
  post: BlogPost;
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <div className="container max-w-4xl px-4 sm:px-6 mx-auto pt-24 pb-12 sm:pt-32 sm:pb-16 text-center">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <div className="mb-6 flex items-center justify-center gap-3">
        <Badge variant="secondary" className="capitalize px-3 py-1">
          {post.category.replace("-", " ")}
        </Badge>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm font-medium">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Draft"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{post.reading_time_minutes} min read</span>
        </div>
      </div>
    </div>
  );
}
