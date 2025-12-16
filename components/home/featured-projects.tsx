"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentProject = projects[currentIndex];
  const nextProjects = projects.slice(1, 4).map((_, i) => {
    const index = (currentIndex + i + 1) % projects.length;
    return projects[index];
  });

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handleSelectProject = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  }, []);

  if (projects.length === 0) {
    return (
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              Projects coming soon. Check back later!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <SlideIn direction="up">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-2 text-muted-foreground">
                Showcasing my best work and case studies
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-2 group">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </SlideIn>

        {/* Netflix-Style Carousel */}
        <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
          {/* Large Featured Card */}
          <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-muted border border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={
                      currentProject.featured_image_url ||
                      currentProject.thumbnail_url ||
                      "/placeholder.svg"
                    }
                    alt={currentProject.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-4 sm:p-8 lg:p-12">
                  <StaggerChildren>
                    <StaggerItem>
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        <Badge
                          variant="secondary"
                          className="capitalize text-[10px] sm:text-xs"
                        >
                          {currentProject.category.replace("-", " ")}
                        </Badge>
                        <Badge
                          variant="default"
                          className="capitalize text-[10px] sm:text-xs"
                        >
                          {currentProject.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <h3 className="text-xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-foreground leading-tight">
                        {currentProject.title}
                      </h3>
                    </StaggerItem>

                    <StaggerItem>
                      <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-2xl line-clamp-2">
                        {currentProject.short_description}
                      </p>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {currentProject.tech_stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium bg-secondary/80 backdrop-blur-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {currentProject.tech_stack.length > 5 && (
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-muted-foreground bg-secondary/80 backdrop-blur-sm rounded-full">
                            +{currentProject.tech_stack.length - 5} more
                          </span>
                        )}
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <Button
                          asChild
                          size="sm"
                          className="sm:h-10 sm:px-4 sm:py-2 gap-2 group text-xs sm:text-sm"
                        >
                          <Link href={`/projects/${currentProject.slug}`}>
                            <Play className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:scale-110" />
                            View Project
                          </Link>
                        </Button>
                        {currentProject.live_url && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="sm:h-10 sm:px-4 sm:py-2 gap-2 bg-background/50 backdrop-blur-sm text-xs sm:text-sm"
                          >
                            <Link
                              href={currentProject.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        {currentProject.repo_url && (
                          <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="sm:h-10 sm:px-4 sm:py-2 gap-2 text-xs sm:text-sm"
                          >
                            <a
                              href={currentProject.repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                              Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </StaggerItem>
                  </StaggerChildren>
                </div>

                {/* Navigation Buttons */}
                <div className="hidden md:flex absolute bottom-6 right-6 sm:bottom-8 sm:right-8 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side Column - 3 Medium Cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {nextProjects.map((project, index) => {
              const actualIndex = (currentIndex + index + 1) % projects.length;
              return (
                <motion.button
                  key={project.id}
                  onClick={() => handleSelectProject(actualIndex)}
                  className="group relative aspect-[7/3] rounded-xl overflow-hidden bg-muted border border-border hover:border-primary/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image */}
                  <img
                    src={
                      project.thumbnail_url ||
                      project.featured_image_url ||
                      "/placeholder.svg"
                    }
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h4 className="text-sm font-semibold text-foreground line-clamp-1 mb-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {project.category.replace("-", " ")}
                    </p>
                  </div>

                  {/* Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Play className="h-5 w-5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile Thumbnails */}
        <div className="mt-6 lg:hidden">
          <div className="flex justify-between overflow-x-auto pb-2 scrollbar-hide">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleSelectProject(index)}
                className={`relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-primary"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={
                    project.thumbnail_url ||
                    project.featured_image_url ||
                    "/placeholder.svg"
                  }
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSelectProject(index)}
              className="relative h-1 w-8 rounded-full bg-border overflow-hidden"
              aria-label={`Go to project ${index + 1}`}
            >
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    index === currentIndex && isAutoPlaying ? "100%" : "0%",
                }}
                transition={{ duration: 6, ease: "linear" }}
              />
              {index === currentIndex && !isAutoPlaying && (
                <div className="absolute inset-0 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
