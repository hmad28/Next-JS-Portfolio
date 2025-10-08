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
import { TagSelector } from "@/components/tag-selector";
import { CategorySelector } from "@/components/category-selector";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  CustomUploadButton,
  CustomGalleryUpload,
} from "@/components/custom-upload-button";

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

            <CategorySelector
              selectedCategory={formData.category}
              onChange={(category) => setFormData({ ...formData, category })}
            />
          </div>

          {/* Rich Text Editor */}
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

          {/* Main Image Upload */}
          <div className="space-y-2">
            <Label>Main Image *</Label>
            <CustomUploadButton
              endpoint="imageUploader"
              value={formData.image}
              onUploadComplete={(url) =>
                setFormData({ ...formData, image: url })
              }
              onRemove={() => setFormData({ ...formData, image: "" })}
            />
          </div>

          {/* Tags Selector */}
          <TagSelector
            selectedTags={formData.tag}
            onChange={(tags) => setFormData({ ...formData, tag: tags })}
          />

          {/* Gallery Upload */}
          <div className="space-y-2">
            <Label>Gallery Images (optional)</Label>
            <CustomGalleryUpload
              endpoint="galleryUploader"
              values={formData.gallery}
              onUploadComplete={(urls) =>
                setFormData({
                  ...formData,
                  gallery: [...formData.gallery, ...urls],
                })
              }
              onRemove={(index) =>
                setFormData({
                  ...formData,
                  gallery: formData.gallery.filter((_, i) => i !== index),
                })
              }
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
