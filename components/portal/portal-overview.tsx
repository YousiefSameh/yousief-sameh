"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import type { Project, Task } from "@/lib/types";
import { RenderDescription } from "../rich-text-editor/RenderDescription";

interface PortalOverviewProps {
  project: Project;
  tasks: Task[];
}

export function PortalOverview({ project, tasks }: PortalOverviewProps) {
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const totalTasks = tasks.length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const nextMilestone = tasks.find(
    (t) => t.due_date && new Date(t.due_date) > new Date()
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Progress
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Project Status
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {project.status.replace("-", " ")}
            </div>
            <p className="text-xs text-muted-foreground">Current phase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              {nextMilestone?.due_date
                ? new Date(nextMilestone.due_date).toLocaleDateString()
                : "No upcoming dates"}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {nextMilestone ? nextMilestone.title : "All caught up"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About this Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.full_description ? (
            <RenderDescription json={project.full_description} />
          ) : (
            <p className="text-muted-foreground">{project.short_description}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
