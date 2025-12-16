"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-2xl">
          {/* Image Container with Overlay */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.thumbnail_url || "/placeholder.jpg"}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge
                variant={
                  project.status === "completed" ? "default" : "secondary"
                }
                className="shadow-lg backdrop-blur-md"
              >
                {project.status.replace("-", " ")}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {project.category}
              </Badge>
              {project.year && (
                <span className="flex items-center text-xs text-muted-foreground">
                  {project.year}
                </span>
              )}
            </div>

            <h3 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="mb-6 flex-1 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {project.short_description}
            </p>

            {/* Tech Stack - displayed as mini indicators */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tech_stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.tech_stack.length > 3 && (
                <span className="text-xs font-medium text-muted-foreground px-1 py-1">
                  + {project.tech_stack.length - 3}
                </span>
              )}
            </div>

            {/* Footer Action */}
            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                View Case Study <ArrowRight className="h-4 w-4" />
              </span>
              <div className="flex gap-3">
                {project.repo_url && (
                  <div
                    className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                    title="View Code"
                  >
                    <Github className="h-4 w-4" />
                  </div>
                )}
                {project.live_url && (
                  <div
                    className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
