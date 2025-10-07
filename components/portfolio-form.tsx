// components/portfolio-form.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImageUpload, GalleryUpload } from "@/components/image-upload";
import { TagSelector } from "@/components/tag-selector";

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
      <DialogContent className="md:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {portfolio ? "Edit Portfolio" : "Add New Portfolio"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className=" space-y-4 sm:space-y-5">
          {/* Title & Slug - Stack on mobile, grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="h-10 sm:h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                Slug *
              </Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="h-10 sm:h-11"
                required
              />
            </div>
          </div>

          {/* Company & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company *
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="h-10 sm:h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category *
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="h-10 sm:h-11"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="resize-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Project Date & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectDate" className="text-sm font-medium">
                Project Date *
              </Label>
              <Input
                id="projectDate"
                name="projectDate"
                type="date"
                value={formData.projectDate}
                onChange={handleChange}
                className="h-10 sm:h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link" className="text-sm font-medium">
                Link (optional)
              </Label>
              <Input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
                className="h-10 sm:h-11"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload
            label="Main Image"
            value={formData.image}
            onChange={(filename) =>
              setFormData({ ...formData, image: filename })
            }
            required
          />

          {/* Tags */}
          <TagSelector
            selectedTags={formData.tag}
            onChange={(tags) => setFormData({ ...formData, tag: tags })}
          />

          {/* Gallery */}
          <GalleryUpload
            value={formData.gallery}
            onChange={(filenames) =>
              setFormData({ ...formData, gallery: filenames })
            }
          />

          {/* Action Buttons */}
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto order-2 sm:order-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {loading ? "Saving..." : portfolio ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
