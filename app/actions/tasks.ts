"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { TaskFormValues } from "@/lib/schemas";
import { taskSchema } from "@/lib/schemas";

export async function createTask(data: TaskFormValues) {
  const result = taskSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tasks").insert(result.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/projects/${data.project_id}`);
  return { success: true };
}

export async function updateTask(
  id: string,
  projectId: string,
  data: Partial<TaskFormValues>
) {
  const result = taskSchema.partial().safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update(result.data)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/projects/${projectId}`);
  return { success: true };
}

export async function deleteTask(id: string, projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
