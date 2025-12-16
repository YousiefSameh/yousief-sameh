"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { BlogPostFormValues } from "@/lib/schemas";
import { blogPostSchema } from "@/lib/schemas";

export async function createBlogPost(data: BlogPostFormValues) {
  const result = blogPostSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert(result.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  return { success: true };
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPostFormValues>
) {
  const result = blogPostSchema.partial().safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(result.data)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
}
