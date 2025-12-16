"use client";

import { Card, CardContent } from "@/components/ui/card";
import { File, Link as LinkIcon, ExternalLink, Download } from "lucide-react";
import type { ProjectFile } from "@/lib/types";

interface PortalFilesProps {
  files: ProjectFile[];
}

export function PortalFiles({ files }: PortalFilesProps) {
  return (
    <div className="space-y-1">
      {files.map((file) => (
        <Card key={file.id} className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-full ${
                  file.resource_type === "link"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-orange-500/10 text-orange-500"
                }`}
              >
                {file.resource_type === "link" ? (
                  <LinkIcon className="h-5 w-5" />
                ) : (
                  <File className="h-5 w-5" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-sm">{file.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Added {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {file.resource_type === "link" ? "Visit Link" : "Download"}
              {file.resource_type === "link" ? (
                <ExternalLink className="h-4 w-4" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </a>
          </CardContent>
        </Card>
      ))}
      {files.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
          No files or resources shared yet.
        </div>
      )}
    </div>
  );
}
