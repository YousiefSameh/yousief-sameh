import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, FolderOpen, Mail, Users, Eye } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch stats
  const [projectsResult, postsResult, contactsResult, clientsResult] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.from("clients").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectsResult.count || 0,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Blog Posts",
      value: postsResult.count || 0,
      icon: BookOpen,
      href: "/admin/blog",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "New Inquiries",
      value: contactsResult.count || 0,
      icon: Mail,
      href: "/admin/contacts",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Active Clients",
      value: clientsResult.count || 0,
      icon: Users,
      href: "/admin/clients",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  // Fetch recent items
  const { data: recentContacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentProjects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Recent Inquiries
            </CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContacts?.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start justify-between border-b border-border pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contact.email}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      contact.status === "new"
                        ? "bg-blue-500/10 text-blue-500"
                        : contact.status === "read"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              ))}
              {(!recentContacts || recentContacts.length === 0) && (
                <p className="text-muted-foreground text-center py-4">
                  No contact submissions yet
                </p>
              )}
            </div>
            <Link
              href="/admin/contacts"
              className="block mt-4 text-sm text-primary hover:underline text-center"
            >
              View all inquiries
            </Link>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Recent Projects
            </CardTitle>
            <CardDescription>Your latest projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects?.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {project.category.replace("-", " ")}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      project.status === "completed"
                        ? "bg-green-500/10 text-green-500"
                        : project.status === "in-progress"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {project.status.replace("-", " ")}
                  </span>
                </div>
              ))}
              {(!recentProjects || recentProjects.length === 0) && (
                <p className="text-muted-foreground text-center py-4">
                  No projects yet
                </p>
              )}
            </div>
            <Link
              href="/admin/projects"
              className="block mt-4 text-sm text-primary hover:underline text-center"
            >
              View all projects
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <FolderOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Project</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">Write Post</span>
            </Link>
            <Link
              href="/admin/clients/new"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Client</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <Eye className="h-5 w-5 text-primary" />
              <span className="font-medium">View Site</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
