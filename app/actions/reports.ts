"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import type { WeeklyReport } from "@/lib/types";
import { JSONContent } from "@tiptap/core";

interface CreateReportData {
  project_id: string;
  title: string;
  content: JSONContent;
  status: "draft" | "published";
}

export async function createReport(data: CreateReportData) {
  const supabase = await createClient();

  const { error } = await supabase.from("weekly_reports").insert(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${data.project_id}`);
}

export async function updateReport(
  id: string,
  projectId: string,
  data: Partial<CreateReportData>
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("weekly_reports")
    .update(data)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deleteReport(id: string, projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("weekly_reports").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
