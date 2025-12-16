"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Calendar,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-[60vh] w-full flex items-end pb-20 pt-32 overflow-hidden">
      {/* Background with Overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src={
            project.featured_image_url ||
            project.thumbnail_url ||
            "/placeholder.svg"
          }
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-interaction/90 to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="max-w-3xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
              {project.category.replace("-", " ")}
            </Badge>
            <Badge
              variant="default"
              className="tracking-wider text-xs"
            >
              {project.status}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            {project.title}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mb-8">
            {project.short_description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.live_url && (
              <Button
                asChild
                size="lg"
                variant={"default"}
                className="rounded-full"
              >
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
            {project.repo_url && (
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full"
              >
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> View Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
