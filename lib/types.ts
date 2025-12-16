import { JSONContent } from "@tiptap/core";

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description?: JSONContent;
  thumbnail_url?: string;
  featured_image_url?: string;
  category:
    | "web-app"
    | "saas"
    | "mobile"
    | "landing-page"
    | "e-commerce"
    | "other";
  tech_stack: string[];
  status: "completed" | "in-progress" | "under-development" | "on-hold";
  live_url?: string;
  repo_url?: string;
  problem?: string;
  solution?: string;
  research_notes?: string;
  design_process?: string;
  architecture_notes?: string;
  challenges?: string;
  learnings?: string;
  is_featured: boolean;
  display_order: number;
  year?: number;

  // New Unified Fields
  client_id?: string | null;
  type: "portfolio" | "client";
  access_token?: string;
  start_date?: string;
  due_date?: string;
  budget?: number;
  invoice_status?: "unpaid" | "paid" | "pending" | "cancelled";

  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  featured_image_url?: string;
  category:
    | "tech"
    | "personal-growth"
    | "engineering-notes"
    | "tutorials"
    | "dev-journey";
  tags: string[];
  reading_time_minutes: number;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  icon_name?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string;
  client_company?: string;
  client_avatar_url?: string;
  content: string;
  rating: number;
  project_id?: string;
  is_featured: boolean;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  project_type?: string;
  budget_range?: string;
  deadline?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

// Legacy Client Project types removed

export interface Skill {
  id: string;
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "tools"
    | "currently-learning";
  icon_name?: string;
  proficiency_level: number;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  company?: string;
  avatar_url?: string;
  access_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "backlog" | "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  type: "feature" | "bug" | "chore" | "refactor" | "meeting" | "other";
  is_client_visible: boolean;
  due_date?: string;
  assignee_id?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface WeeklyReport {
  id: string;
  project_id: string;
  title: string;
  content: JSONContent;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  url: string;
  resource_type: "file" | "link";
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value?: string;
  updated_at: string;
}

export interface SiteSettings {
  hero_headline: string;
  hero_subtext: string;
  about_intro: string;
  contact_email: string;
  contact_whatsapp: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
}
