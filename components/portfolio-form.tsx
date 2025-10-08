// components/portfolio-form.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { TagSelector } from "@/components/tag-selector";
import { RichTextEditor } from "@/components/rich-text-editor";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

interface Portfolio {
  id?: number;
  title: string;
  slug: string;
  company: string;
  category: string;
  description: string;
  link?: string;
  tag: string[];
  image: string;
  gallery: string[];
  projectDate: string;
}

interface PortfolioFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portfolio?: Portfolio;
  onSuccess: () => void;
}

const initialFormState: Portfolio = {
  title: "",
  slug: "",
  company: "",
  category: "",
  description: "",
  link: "",
  tag: [],
  image: "",
  gallery: [],
  projectDate: new Date().toISOString().split("T")[0],
};

export function PortfolioForm({
  open,
  onOpenChange,
  portfolio,
  onSuccess,
}: PortfolioFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Portfolio>(initialFormState);

  useEffect(() => {
    if (portfolio && open) {
      console.log("Loading portfolio data:", portfolio);
      setFormData({
        ...portfolio,
        link: portfolio.link || "",
        gallery: portfolio.gallery || [],
      });
    } else if (!portfolio && open) {
      console.log("Resetting form for create");
      setFormData(initialFormState);
    }
  }, [portfolio, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = portfolio
        ? `/api/portfolios/${portfolio.id}`
        : "/api/portfolios";
      const method = portfolio ? "PUT" : "POST";

      console.log("Submitting:", { url, method, formData });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        onOpenChange(false);
        setFormData(initialFormState);
      } else {
        const error = await res.json();
        console.error("Server error:", error);
        alert("Error saving portfolio: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {portfolio ? "Edit Portfolio" : "Add New Portfolio"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Rich Text Editor untuk Description */}
          <RichTextEditor
            label="Description"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectDate">Project Date *</Label>
              <Input
                id="projectDate"
                name="projectDate"
                type="date"
                value={formData.projectDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link (optional)</Label>
              <Input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Main Image Upload dengan UploadThing */}
          <div className="space-y-2">
            <Label>Main Image *</Label>
            {formData.image ? (
              <div className="relative inline-block">
                <img
                  src={formData.image}
                  alt="Main"
                  className="h-32 w-auto rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => setFormData({ ...formData, image: "" })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setFormData({ ...formData, image: res[0].url });
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Upload error: ${error.message}`);
                }}
              />
            )}
          </div>

          <TagSelector
            selectedTags={formData.tag}
            onChange={(tags) => setFormData({ ...formData, tag: tags })}
          />

          {/* Gallery Upload dengan UploadThing */}
          <div className="space-y-2">
            <Label>Gallery Images (optional)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.gallery.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="h-24 w-24 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  const newImages = res.map((file) => file.url);
                  setFormData({
                    ...formData,
                    gallery: [...formData.gallery, ...newImages],
                  });
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Upload error: ${error.message}`);
              }}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : portfolio ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
