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
// import { X } from "lucide-react";
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
  projectDate: string; // Format: YYYY-MM-DD
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
  projectDate: new Date().toISOString().split("T")[0], // Default hari ini
};

export function PortfolioForm({
  open,
  onOpenChange,
  portfolio,
  onSuccess,
}: PortfolioFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Portfolio>(initialFormState);

  // Auto-fill data ketika portfolio berubah (mode edit)
  useEffect(() => {
    if (portfolio && open) {
      console.log("Loading portfolio data:", portfolio); // Debug
      setFormData({
        ...portfolio,
        link: portfolio.link || "",
        gallery: portfolio.gallery || [],
      });
    } else if (!portfolio && open) {
      // Reset form ketika buka dialog untuk create
      console.log("Resetting form for create"); // Debug
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

      console.log("Submitting:", { url, method, formData }); // Debug

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        onOpenChange(false);
        setFormData(initialFormState); // Reset setelah sukses
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

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

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

          <ImageUpload
            label="Main Image"
            value={formData.image}
            onChange={(filename) =>
              setFormData({ ...formData, image: filename })
            }
            required
          />

          <TagSelector
            selectedTags={formData.tag}
            onChange={(tags) => setFormData({ ...formData, tag: tags })}
          />

          <GalleryUpload
            value={formData.gallery}
            onChange={(filenames) =>
              setFormData({ ...formData, gallery: filenames })
            }
          />

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
