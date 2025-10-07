"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { PortfolioForm } from "@/components/portfolio-form";

interface Portfolio {
  id: number;
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
  createdAt: string;
  updatedAt?: string;
}

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<
    Portfolio | undefined
  >(undefined);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch("/api/portfolios");
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus portfolio ini?")) return;

    try {
      await fetch(`/api/portfolios/${id}`, { method: "DELETE" });
      setPortfolios(portfolios.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  const handleAdd = () => {
    setEditingPortfolio(undefined);
    setFormOpen(true);
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    fetchPortfolios();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8 py-6 sm:py-8 md:pt-25">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Portfolio Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {portfolios.length} portfolio{portfolios.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Portfolio
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground h-32"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-2">Belum ada portfolio</p>
                    <Button variant="outline" size="sm" onClick={handleAdd}>
                      <Plus className="mr-2 h-4 w-4" />
                      Buat Portfolio Pertama
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              portfolios.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell className="font-medium">{portfolio.id}</TableCell>
                  <TableCell className="font-medium">
                    {portfolio.title}
                  </TableCell>
                  <TableCell>{portfolio.company}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {portfolio.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {portfolio.tag.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium bg-background"
                        >
                          {t}
                        </span>
                      ))}
                      {portfolio.tag.length > 3 && (
                        <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium bg-background">
                          +{portfolio.tag.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(portfolio)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(portfolio.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {portfolios.length === 0 ? (
          <div className="border rounded-lg p-8 text-center bg-card">
            <p className="text-muted-foreground mb-4">Belum ada portfolio</p>
            <Button variant="outline" onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Buat Portfolio Pertama
            </Button>
          </div>
        ) : (
          portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <div className="p-4 pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1 truncate">
                      {portfolio.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">{portfolio.company}</span>
                      <span>•</span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {portfolio.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEdit(portfolio)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(portfolio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {portfolio.description}
                </p>
                {portfolio.tag.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {portfolio.tag.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium bg-background"
                      >
                        {t}
                      </span>
                    ))}
                    {portfolio.tag.length > 4 && (
                      <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium bg-background">
                        +{portfolio.tag.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <PortfolioForm
        open={formOpen}
        onOpenChange={setFormOpen}
        portfolio={editingPortfolio}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
