import { ProjectForm } from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-muted-foreground mt-1">
          Create a new portfolio project
        </p>
      </div>
      <ProjectForm clients={clients || []} />
    </div>
  );
}
