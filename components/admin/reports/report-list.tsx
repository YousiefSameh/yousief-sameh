"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2, MoreVertical, Edit, Trash2 } from "lucide-react";
import type { WeeklyReport } from "@/lib/types";
import {
  createReport,
  updateReport,
  deleteReport,
} from "@/app/actions/reports";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JSONContent } from "@tiptap/core";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";

interface ReportListProps {
  projectId: string;
  reports: WeeklyReport[];
}

export function ReportList({ projectId, reports }: ReportListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<WeeklyReport | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState<JSONContent>({});

  const handleOpen = (report?: WeeklyReport) => {
    setEditingReport(report);
    setContent(report?.content || {});
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const status = formData.get("status") as string as "draft" | "published";

    try {
      if (editingReport) {
        await updateReport(editingReport.id, projectId, {
          title,
          content,
          status,
        });
      } else {
        await createReport({
          project_id: projectId,
          title,
          content,
          status,
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save report", error);
      alert("Failed to save report");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this report?")) return;
    try {
      await deleteReport(id, projectId);
    } catch (error) {
      console.error("Failed to delete report");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Reports</h3>
        <Button onClick={() => handleOpen()} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold line-clamp-1">
                  {report.title}
                </CardTitle>
                <Badge
                  variant={
                    report.status === "published" ? "default" : "secondary"
                  }
                >
                  {report.status}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mt-2 -mr-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleOpen(report)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(report.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-4">
                {new Date(report.created_at).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="line-clamp-3 text-sm text-muted-foreground">
                <RenderDescription json={report.content} className="prose-xs" />
              </div>
            </CardContent>
          </Card>
        ))}
        {reports.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground border rounded-lg border-dashed">
            No reports yet.
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl! max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingReport ? "Edit Report" : "New Weekly Report"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingReport?.title}
                  placeholder="e.g. Week 12 Progress Update"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  defaultValue={editingReport?.status || "draft"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="min-h-[300px] border rounded-md">
                <RichTextEditor
                  field={{ value: content, onChange: setContent }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Report
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
