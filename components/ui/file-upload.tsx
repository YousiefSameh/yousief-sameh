"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, FileText, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage, type UploadOptions, validateFile } from "@/lib/upload"; // Reusing uploadImage as it's generic enough or could be renamed
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  value?: string;
  onChange: (url: string, name?: string) => void;
  onError?: (error: string) => void;
  options?: UploadOptions;
  className?: string;
  label?: string;
}

export function FileUpload({
  value,
  onChange,
  onError,
  options,
  className,
  label = "Upload File",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | undefined>(
    value ? "File uploaded" : undefined
  );
  const [error, setError] = useState<string>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Use more permissive options for generic files if not provided
      const uploadOptions: UploadOptions = {
        folder: "project-files",
        allowedTypes: [
          "application/pdf",
          "text/plain",
          "application/zip",
          "application/vnd.rar",
          "image/jpeg",
          "image/png",
          "image/webp",
        ], // Default set, can be overridden props
        maxSizeInMB: 20,
        ...options,
      };

      // Validate file
      const validation = validateFile(file, uploadOptions);
      if (!validation.valid) {
        setError(validation.error);
        onError?.(validation.error || "Invalid file");
        return;
      }

      setError(undefined);
      setUploading(true);
      setFileName(file.name);

      try {
        // We reuse uploadImage here because under the hood it just gets a signed URL and puts the file.
        // Ideally we might rename 'uploadImage' to 'uploadFile' in a heavy refactor, but it works fine.
        const result = await uploadImage(file, uploadOptions);

        if (result.error) {
          setError(result.error);
          onError?.(result.error);
          setFileName(undefined);
        } else {
          onChange(result.url, file.name);
          // fileName is already set
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Upload failed";
        setError(errorMsg);
        onError?.(errorMsg);
        setFileName(undefined);
      } finally {
        setUploading(false);
      }
    },
    [onChange, onError, options]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    disabled: uploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(undefined);
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}

      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-colors cursor-pointer p-6",
          "hover:border-primary/50 hover:bg-secondary/50",
          isDragActive && "border-primary bg-primary/5",
          uploading && "opacity-50 cursor-not-allowed",
          error && "border-destructive"
        )}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Uploading...</p>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {fileName}
                </p>
                <p className="text-xs text-muted-foreground">Ready to attach</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center mb-2">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Drag & drop a file here</p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse (up to 20MB)
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
