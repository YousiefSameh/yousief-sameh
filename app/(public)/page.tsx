import { createClient } from "@/lib/supabase/server"
import { MainLayout } from "@/components/layout/main-layout"
import { HeroSection } from "@/components/home/hero-section"
import { SkillsSection } from "@/components/home/skills-section"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { BrandStory } from "@/components/home/brand-story"
import { ServicesSection } from "@/components/home/services-section"
import { BlogPreview } from "@/components/home/blog-preview"
import { CTASection } from "@/components/home/cta-section"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(4)

  // Fetch active services
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  // Fetch latest blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3)

  return (
    <MainLayout>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects projects={projects || []} />
      <BrandStory />
      <ServicesSection services={services || []} />
      <BlogPreview posts={posts || []} />
      <CTASection />
    </MainLayout>
  )
}
