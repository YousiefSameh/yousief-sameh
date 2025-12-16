"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MoreVertical, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors = {
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  urgent: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className="mb-3"
        >
          <Card
            className={`overflow-hidden border-l-4 ${
              snapshot.isDragging ? "shadow-lg rotate-2" : "shadow-sm"
            } hover:shadow-md transition-all`}
          >
            <div
              className={`absolute top-0 bottom-0 left-0 w-1 ${
                task.priority === "urgent"
                  ? "bg-red-500"
                  : task.priority === "high"
                  ? "bg-orange-500"
                  : task.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            />

            <CardContent className="p-3 pl-4">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm leading-tight line-clamp-2">
                  {task.title}
                </h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mt-1 -mr-1 text-muted-foreground"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(task)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(task.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 mb-2">
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {task.due_date && (
                    <div
                      className={`flex items-center gap-1 text-[10px] font-medium ${
                        new Date(task.due_date) < new Date()
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Calendar className="h-3 w-3" />
                      {new Date(task.due_date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                  {task.type && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 h-5 bg-muted"
                    >
                      {task.type}
                    </Badge>
                  )}
                </div>

                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 h-5 border ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
