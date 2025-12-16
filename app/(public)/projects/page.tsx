import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { MainLayout } from "@/components/layout/main-layout";
import { FolderOpen } from "lucide-react";
import { ProjectGrid } from "@/components/projects/project-grid";
import { SlideIn } from "@/components/animations/SlideIn";

export const metadata: Metadata = {
  title: "Projects | Yousief Sameh",
  description:
    "Explore my portfolio of web development projects, case studies, and technical work.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();

  // Fetch all projects to pass to the client-side grid for instant filtering
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  // Get unique categories for filters
  const categories = [...new Set(projects?.map((p) => p.category) || [])];

  return (
    <MainLayout>
      <section className="py-20 sm:py-28 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <SlideIn direction="up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
                <FolderOpen className="h-4 w-4 text-primary" />
                Portfolio
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                My Projects
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                A collection of my work, from SaaS applications to landing
                pages. Each project represents a unique challenge and a tailored
                solution.
              </p>
            </SlideIn>
          </div>

          {/* Interactive Grid */}
          <ProjectGrid projects={projects || []} categories={categories} />
        </div>
      </section>
    </MainLayout>
  );
}
