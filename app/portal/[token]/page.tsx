import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortalOverview } from "@/components/portal/portal-overview";
import { PortalTasks } from "@/components/portal/portal-tasks";
import { PortalReports } from "@/components/portal/portal-reports";
import { PortalFiles } from "@/components/portal/portal-files";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

interface Props {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ project?: string }>;
}

export default async function ClientPortalPage({
  params,
  searchParams,
}: Props) {
  const { token } = await params;
  const { project: projectId } = await searchParams;
  const supabase = await createClient();
  const settings = await getSiteSettings();

  // 1. Authenticate Client
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("access_token", token)
    .single();

  if (!client) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          Invalid access token. Please contact support.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  // 2. Fetch Client Projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", client.id)
    .order("updated_at", { ascending: false });

  // 3. Determine View Mode
  const activeProject = projectId
    ? projects?.find((p) => p.id === projectId)
    : null;

  // 4. If Active Project Selected, Fetch Details
  let tasks = [],
    reports = [],
    files = [];

  if (activeProject) {
    const [tasksRes, reportsRes, filesRes] = await Promise.all([
      supabase
        .from("tasks")
        .select("*")
        .eq("project_id", activeProject.id)
        .eq("is_client_visible", true) // Only visible tasks
        .order("display_order"),
      supabase
        .from("weekly_reports")
        .select("*")
        .eq("project_id", activeProject.id)
        .eq("status", "published")
        .order("created_at", { ascending: false }),
      supabase
        .from("project_files")
        .select("*")
        .eq("project_id", activeProject.id)
        .order("created_at", { ascending: false }),
    ]);

    tasks = tasksRes.data || [];
    reports = reportsRes.data || [];
    files = filesRes.data || [];
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-muted/40 sticky top-0 z-10 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {client.avatar_url ? (
              <img
                src={client.avatar_url}
                alt={client.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {client.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold leading-none">
                {activeProject
                  ? activeProject.title
                  : `Welcome, ${client.name}`}
              </h1>
              <p className="text-xs text-muted-foreground">
                {activeProject
                  ? client.company || "Client Portal"
                  : "Client Portal Dashboard"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeProject && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/portal/${token}`}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  All Projects
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="sm">
              <Link
                href={`mailto:${
                  settings.contact_email || "contact@yousiefsameh.com"
                }`}
              >
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {activeProject ? (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500"
            >
              <PortalOverview project={activeProject} tasks={tasks} />
            </TabsContent>

            <TabsContent
              value="tasks"
              className="animate-in fade-in slide-in-from-bottom-5 duration-500"
            >
              <PortalTasks tasks={tasks} />
            </TabsContent>

            <TabsContent
              value="reports"
              className="animate-in fade-in slide-in-from-bottom-5 duration-500"
            >
              <PortalReports reports={reports} />
            </TabsContent>

            <TabsContent
              value="files"
              className="animate-in fade-in slide-in-from-bottom-5 duration-500"
            >
              <PortalFiles files={files} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {project.short_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Last updated:{" "}
                      {new Date(project.updated_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/portal/${token}?project=${project.id}`}>
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No active projects found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
