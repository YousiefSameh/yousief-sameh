"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ServiceFormValues } from "@/lib/schemas";
import { serviceFormSchema } from "@/lib/schemas";

export async function createService(data: ServiceFormValues) {
  const result = serviceFormSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("services").insert(result.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateService(
  id: string,
  data: Partial<ServiceFormValues>
) {
  const result = serviceFormSchema.partial().safeParse(data);
  if (!result.success) {
    return { error: "Invalid data format" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update(result.data)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
}
