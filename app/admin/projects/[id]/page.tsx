import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectKanban } from "@/components/admin/kanban/project-kanban";
import { ReportList } from "@/components/admin/reports/report-list";
import { FileManager } from "@/components/admin/files/file-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // Parallel fetching
  const [
    projectResponse,
    tasksResponse,
    reportsResponse,
    filesResponse,
    clientsResponse,
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase
      .from("tasks")
      .select("*")
      .eq("project_id", id)
      .order("display_order", { ascending: true }),
    supabase
      .from("weekly_reports")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("project_files")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("clients").select("*").order("name", { ascending: true }),
  ]);

  const project = projectResponse.data;
  const tasks = tasksResponse.data || [];
  const reports = reportsResponse.data || [];
  const files = filesResponse.data || [];
  const clients = clientsResponse.data || [];

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Project: {project.title}</h1>
        <p className="text-muted-foreground mt-1">
          Update details and manage tasks
        </p>
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="reports">Weekly Reports</TabsTrigger>
          <TabsTrigger value="files">Files & Links</TabsTrigger>
          <TabsTrigger value="details">Project Details</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban">
          <ProjectKanban projectId={project.id} tasks={tasks} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportList projectId={project.id} reports={reports} />
        </TabsContent>

        <TabsContent value="files">
          <FileManager projectId={project.id} files={files} />
        </TabsContent>

        <TabsContent value="details">
          <ProjectForm project={project} clients={clients} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
