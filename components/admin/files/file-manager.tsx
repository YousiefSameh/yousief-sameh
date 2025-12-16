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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  File,
  Link as LinkIcon,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import type { ProjectFile } from "@/lib/types";
import { createFile, deleteFile } from "@/app/actions/files";
import Link from "next/link";

import { FileUpload } from "@/components/ui/file-upload";

interface FileManagerProps {
  projectId: string;
  files: ProjectFile[];
}

export function FileManager({ projectId, files }: FileManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resourceType, setResourceType] = useState<"file" | "link">("file");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("project_id", projectId);

    try {
      await createFile(formData);
      setIsOpen(false);
      // reset form manually or via key if needed, simplest is close dialog
    } catch (error) {
      console.error("Failed to add file", error);
      alert("Failed to add resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this resource?")) return;
    try {
      await deleteFile(id, projectId);
    } catch (error) {
      console.error("Failed to delete file");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Files & Links</h3>
        <Button onClick={() => setIsOpen(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Resource
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  {file.resource_type === "link" ? (
                    <LinkIcon className="h-4 w-4 text-blue-500" />
                  ) : (
                    <File className="h-4 w-4 text-orange-500" />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-2"
                  >
                    {file.name}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </TableCell>
                <TableCell className="capitalize">
                  {file.resource_type}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(file.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(file.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {files.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No files or links added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Resource</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resource_type">Type</Label>
              <Select
                name="resource_type"
                defaultValue="file"
                onValueChange={(val) => setResourceType(val as "file" | "link")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">File Upload</SelectItem>
                  <SelectItem value="link">External Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Resource name"
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>

            {resourceType === "file" ? (
              <div className="space-y-2">
                <Label>Upload File</Label>
                <FileUpload
                  onChange={(url, name) => {
                    setFileUrl(url);
                    if (name && !fileName) {
                      setFileName(name);
                    }
                  }}
                  options={{ folder: "project-files" }}
                />
                <input type="hidden" name="url" value={fileUrl} required />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" placeholder="https://..." required />
              </div>
            )}

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
                Add Resource
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
