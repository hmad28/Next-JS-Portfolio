// components/custom-upload-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";

interface CustomUploadButtonProps {
  endpoint: "imageUploader" | "galleryUploader";
  onUploadComplete: (url: string) => void;
  value?: string;
  onRemove?: () => void;
}

export function CustomUploadButton({
  endpoint,
  onUploadComplete,
  value,
  onRemove,
}: CustomUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onUploadComplete(res[0].url);
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
      setIsUploading(false);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await startUpload([file]);
  };

  if (value) {
    return (
      <div className="relative w-full">
        <div className="relative h-64 w-full rounded-lg overflow-hidden border bg-gray-100">
          <Image
            src={value}
            alt="Uploaded"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 z-10"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 mb-3 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP (MAX. 4MB)</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}

// Gallery Upload Component
interface CustomGalleryUploadProps {
  endpoint: "galleryUploader";
  onUploadComplete: (urls: string[]) => void;
  values: string[];
  onRemove: (index: number) => void;
}

export function CustomGalleryUpload({
  endpoint,
  onUploadComplete,
  values,
  onRemove,
}: CustomGalleryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res) {
        const urls = res.map((file) => file.url);
        onUploadComplete(urls);
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
      setIsUploading(false);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await startUpload([file]);
  };

  return (
    <div className="space-y-4">
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {values.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-video rounded-lg overflow-hidden border bg-gray-100">
                <Image
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center justify-center">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 mb-2 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {values.length > 0
                  ? "Add more images"
                  : "Upload gallery images"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Click to browse</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
