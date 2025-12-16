"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { projectSchema, projectBaseSchema } from "@/lib/schemas";
import type { ProjectFormValues } from "@/lib/schemas";

export async function createProject(data: ProjectFormValues) {
  const result = projectSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(result.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  return { success: true };
}
export async function updateProject(
  id: string,
  data: Partial<ProjectFormValues>
) {
  const result = projectBaseSchema.partial().safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update(result.data)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/projects");
}
