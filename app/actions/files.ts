"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createFile(formData: FormData) {
  const supabase = await createClient();

  const data = {
    project_id: formData.get("project_id") as string,
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    resource_type: (formData.get("resource_type") as string) || "file",
  };

  const { error } = await supabase.from("project_files").insert(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${data.project_id}`);
}

export async function deleteFile(id: string, projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("project_files").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
