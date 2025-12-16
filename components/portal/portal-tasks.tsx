"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Task } from "@/lib/types";

interface PortalTasksProps {
  tasks: Task[];
}

const statusMap = {
  todo: "To Do",
  "in-progress": "In Progress",
  review: "In Review",
  done: "Completed",
};

export function PortalTasks({ tasks }: PortalTasksProps) {
  // Filter out internal types
  const visibleTasks = tasks.filter(
    (t) => !["chore", "refactor", "bug", "meeting"].includes(t.type)
  );

  const todoTasks = visibleTasks.filter(
    (t) => t.status === "todo" || t.status === "backlog"
  );
  const inProgressTasks = visibleTasks.filter(
    (t) => t.status === "in-progress"
  );
  const reviewTasks = visibleTasks.filter((t) => t.status === "review");
  const doneTasks = visibleTasks.filter((t) => t.status === "done");

  const renderTaskColumn = (
    title: string,
    columnTasks: Task[],
    colorClass: string
  ) => (
    <div className="flex flex-col h-full bg-muted/30 rounded-lg border">
      <div
        className={`p-3 font-semibold text-sm border-b ${colorClass} bg-opacity-10 flex justify-between items-center`}
      >
        <span className="text-white">
          {title}
        </span>
        <Badge variant="secondary" className="text-xs">
          {columnTasks.length}
        </Badge>
      </div>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {columnTasks.map((task) => (
            <Card
              key={task.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="font-medium text-sm leading-tight">
                    {task.title}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] capitalize px-1 py-0 h-5"
                  >
                    {task.type}
                  </Badge>
                </div>
                {task.due_date && (
                  <div className="text-[10px] text-muted-foreground">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {columnTasks.length === 0 && (
            <div className="text-center py-4 text-xs text-muted-foreground">
              No tasks
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="h-[600px] grid grid-cols-1 md:grid-cols-4 gap-4">
      {renderTaskColumn("To Do", todoTasks, "bg-gray-500")}
      {renderTaskColumn("In Progress", inProgressTasks, "bg-blue-500")}
      {renderTaskColumn("In Review", reviewTasks, "bg-yellow-500")}
      {renderTaskColumn("Completed", doneTasks, "bg-green-500")}
    </div>
  );
}
