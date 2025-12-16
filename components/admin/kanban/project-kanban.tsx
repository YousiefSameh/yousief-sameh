"use client";

import { useState } from "react";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./task-card";
import { TaskForm } from "@/components/admin/task-form";
import type { Task } from "@/lib/types";
import { updateTask, deleteTask } from "@/app/actions/tasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TaskFormValues } from "@/lib/schemas";
import { useToast } from "@/components/ui/use-toast";

interface ProjectKanbanProps {
  projectId: string;
  tasks: Task[];
}

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export function ProjectKanban({ projectId, tasks }: ProjectKanbanProps) {
  const { toast } = useToast();
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    // Optimistic Update
    const updatedTasks = localTasks.map((t) =>
      t.id === draggableId ? { ...t, status: newStatus as any } : t
    );
    setLocalTasks(updatedTasks);

    // Server Action
    try {
      await updateTask(draggableId, projectId, {
        status: newStatus as TaskFormValues["status"],
      });
    } catch (error) {
      console.error("Failed to update status", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task status",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    // Optimistic delete
    setLocalTasks((prev) => prev.filter((t) => t.id !== taskId));

    try {
      await deleteTask(taskId, projectId);
    } catch (error) {
      console.error("Failed to delete task", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsTaskFormOpen(true);
  };

  // Group tasks by status
  const getTasksByStatus = (status: string) => {
    return localTasks
      .filter((task) => task.status === status)
      .sort((a, b) => (a.priority === "urgent" ? -1 : 1)); // Simple sort by priority for now
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Task Board</h2>
        <Button onClick={handleCreateTask} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-[calc(100vh-250px)] gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex h-full w-80 min-w-80 flex-col rounded-lg bg-muted/50 border border-border"
            >
              <div className="p-4 font-semibold text-sm flex items-center justify-between">
                {column.title}
                <span className="bg-background text-muted-foreground px-2 py-0.5 rounded-full text-xs border">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <ScrollArea className="flex-1 px-3">
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[100px] h-full"
                    >
                      {getTasksByStatus(column.id).map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  </ScrollArea>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isTaskFormOpen && (
        <TaskForm
          projectId={projectId}
          task={editingTask}
          isOpen={isTaskFormOpen}
          onClose={() => {
            setIsTaskFormOpen(false);
            setEditingTask(undefined);
          }}
        />
      )}
    </>
  );
}
