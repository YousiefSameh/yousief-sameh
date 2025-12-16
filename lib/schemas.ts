import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  project_type: z.string().min(1, { message: "Please select a project type." }),
  budget_range: z.string().min(1, { message: "Please select a budget range." }),
  deadline: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const serviceFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase alphanumeric with hyphens.",
    }),
  short_description: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters." }),
  full_description: z.string().optional(),
  icon_name: z.string().optional(),
  display_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase alphanumeric with hyphens.",
    }),
  excerpt: z
    .string()
    .min(10, { message: "Excerpt must be at least 10 characters." }),
  content: z.any(),
  featured_image_url: z.string().optional(),
  category: z.string().min(1, { message: "Please select a category." }),
  tags: z.array(z.string()).default([]),
  reading_time_minutes: z.coerce.number().int().min(1).default(5),
  is_published: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export const projectBaseSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase alphanumeric with hyphens.",
    }),
  short_description: z.string().min(10, {
    message: "Short description must be at least 10 characters.",
  }),
  full_description: z.any().optional(),
  thumbnail_url: z.string().optional(),
  featured_image_url: z.string().optional(),
  gallery_images: z.array(z.string()).default([]),
  category: z.string().min(1, { message: "Please select a category." }),
  tech_stack: z.array(z.string()).default([]),
  status: z.string().min(1, { message: "Please select a status." }),
  live_url: z.string().url().optional().or(z.literal("")),
  repo_url: z.string().url().optional().or(z.literal("")),
  is_featured: z.boolean().default(false),
  display_order: z.coerce.number().int().default(0),
  year: z.coerce
    .number()
    .int()
    .min(2000)
    .max(2100)
    .default(new Date().getFullYear()),
  type: z.enum(["portfolio", "client"]).default("portfolio"),
  client_id: z.string().nullish(),
});

export const projectSchema = projectBaseSchema.superRefine((data, ctx) => {
  if (data.type === "client" && !data.client_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Client is required for client projects",
      path: ["client_id"],
    });
  }
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const taskSchema = z.object({
  project_id: z.string().uuid(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().optional(),
  status: z.enum(["backlog", "todo", "in-progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  type: z.enum(["feature", "bug", "chore", "refactor", "meeting", "other"]),
  is_client_visible: z.boolean().default(false),
  due_date: z.string().optional().nullable(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
