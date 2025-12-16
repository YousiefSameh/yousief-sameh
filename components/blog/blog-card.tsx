"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/types";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={
                post.featured_image_url ||
                `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(
                  post.title
                )}`
              }
              alt={post.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

            {/* Category Badge on Image */}
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="backdrop-blur-md bg-background/80 hover:bg-background/90 capitalize shadow-sm"
              >
                {post.category.replace("-", " ")}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            {/* Meta Info */}
            <div className="mb-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.published_at}>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Draft"}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            </div>

            <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Read More Link */}
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary">
              Read Article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
