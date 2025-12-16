"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ProjectGridProps {
  projects: Project[];
  categories: string[];
}

export function ProjectGrid({ projects, categories }: ProjectGridProps) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.tech_stack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Controls Container */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between sticky top-20 z-30 bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-border/50 shadow-sm">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-full"
          >
            All Projects
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize rounded-full"
            >
              {category.replace("-", " ")}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            className="h-9 w-full rounded-full border border-border bg-secondary/50 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No matches found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search terms.
          </p>
        </motion.div>
      )}
    </div>
  );
}
