"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Calendar } from "lucide-react";
import type { WeeklyReport } from "@/lib/types";
import { RenderDescription } from "../rich-text-editor/RenderDescription";

interface PortalReportsProps {
  reports: WeeklyReport[];
}

export function PortalReports({ reports }: PortalReportsProps) {
  const publishedReports = reports.filter((r) => r.status === "published");

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {publishedReports.map((report) => (
        <Dialog key={report.id}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors group">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {report.title}
                  </CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(report.created_at).toLocaleDateString(undefined, {
                      dateStyle: "long",
                    })}
                  </div>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="line-clamp-3 text-sm text-muted-foreground mt-2">
                  {/* Strip HTML checks would be safer but detailed view has the HTML */}
                  Click to view full report details...
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-7xl! max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{report.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(report.created_at).toLocaleDateString(undefined, {
                  dateStyle: "full",
                })}
              </p>
            </DialogHeader>
            <div className="mt-4 prose prose-sm dark:prose-invert max-w-none">
              <RenderDescription json={report.content} />
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {publishedReports.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground border rounded-lg border-dashed">
          No reports published yet.
        </div>
      )}
    </div>
  );
}
