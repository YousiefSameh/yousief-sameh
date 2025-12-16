import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MainLayout } from "@/components/layout/main-layout";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";
import { ArrowRight, Calendar, Layers, Layout, ArrowLeft } from "lucide-react";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, short_description")
    .eq("slug", slug)
    .single();

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.short_description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  // Find next project for navigation
  const { data: nextProject } = await supabase
    .from("projects")
    .select("slug, title")
    .gt("display_order", project.display_order)
    .order("display_order", { ascending: true })
    .limit(1)
    .single();

  const galleryImages: string[] = project.gallery_images || [];

  return (
    <MainLayout>
      <ProjectHero project={project} />

      <article className="py-12 sm:py-20 min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              <FadeIn delay={0.2}>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <div className="prose-custom rich-text-content">
                  {project.full_description ? (
                    <RenderDescription json={project.full_description} />
                  ) : (
                    <p className="text-muted-foreground">
                      {project.short_description}
                    </p>
                  )}
                </div>
              </FadeIn>

              {galleryImages.length > 0 && (
                <section>
                  <FadeIn delay={0.3}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Layout className="w-5 h-5 text-primary" /> Gallery
                    </h2>
                    <ProjectGallery
                      images={galleryImages}
                      title={project.title}
                    />
                  </FadeIn>
                </section>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Project Details Card */}
                <FadeIn delay={0.4}>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      {project.year && (
                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-1" />
                          <div>
                            <div className="text-sm font-medium">Year</div>
                            <div className="text-sm text-muted-foreground">
                              {project.year}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <Layers className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm font-medium">Category</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {project.category.replace("-", " ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Tech Stack Card */}
                <FadeIn delay={0.5}>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="bg-secondary/50 border border-border rounded-md px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> All Projects
            </Link>

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex items-center gap-2 text-right hover:text-primary transition-colors"
              >
                <div>
                  <div className="text-xs text-muted-foreground">
                    Next Project
                  </div>
                  <div className="font-semibold group-hover:underline decoration-primary/50 underline-offset-4">
                    {nextProject.title}
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
