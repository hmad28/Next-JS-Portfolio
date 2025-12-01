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
import { Input } from "@/components/ui/input";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  LayoutGrid,
  LayoutList,
  Calendar,
  Building2,
  ExternalLink,
  FolderOpen,
  Briefcase,
  TrendingUp,
  Filter,
} from "lucide-react";
import { PortfolioForm } from "@/components/portfolio-form";
import { DashboardNav } from "@/components/dashboard-nav";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Filter portfolios
  const filteredPortfolios = portfolios.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(portfolios.map((p) => p.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Loading your portfolios...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardNav />
      <div className=" bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-6 h-6 text-white" />
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Portfolio Dashboard
                  </h1>
                </div>
                <p className="text-emerald-50 text-sm sm:text-base">
                  Manage and showcase your best work
                </p>
              </div>
              <Button
                onClick={handleAdd}
                className="bg-white hover:bg-gray-50 text-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold w-full sm:w-auto"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Portfolio
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Total Projects
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {portfolios.length}
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg group-hover:scale-110 transition-transform">
                  <LayoutGrid className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Categories
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {categories.length - 1}
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-900/20 hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Filter className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Showing Results
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {filteredPortfolios.length}
              </div>
            </div>
          </div>

          {/* Filters - Enhanced */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by title, company, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-11 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 h-11 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[180px]"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 flex items-center gap-2 transition-all ${
                    viewMode === "grid"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 flex items-center gap-2 border-l border-gray-200 dark:border-gray-800 transition-all ${
                    viewMode === "list"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <LayoutList className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {filteredPortfolios.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-12 sm:p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FolderOpen className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {searchQuery || selectedCategory !== "all"
                    ? "No portfolios found"
                    : "No portfolios yet"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filter to find what you're looking for"
                    : "Get started by creating your first portfolio project and showcase your amazing work"}
                </p>
                {!searchQuery && selectedCategory === "all" && (
                  <Button
                    onClick={handleAdd}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Portfolio
                  </Button>
                )}
              </div>
            </div>
          ) : viewMode === "grid" ? (
            // Grid View - Enhanced
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    {portfolio.image ? (
                      <img
                        src={portfolio.image}
                        alt={portfolio.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <LayoutGrid className="w-16 h-16 text-gray-300 dark:text-gray-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-900 dark:text-white text-xs font-semibold rounded-full shadow-xl border border-gray-200 dark:border-gray-700">
                        {portfolio.category}
                      </span>
                    </div>

                    {/* Quick action on hover */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex gap-2">
                        {portfolio.link && (
                          <button
                            onClick={() => window.open(portfolio.link, "_blank", "noopener,noreferrer")}
                            className="flex-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-gray-900 transition-colors shadow-lg"
                          >
                            <ExternalLink className="w-4 h-4 inline mr-2" />
                            View Live
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {portfolio.title}
                    </h3>

                    {/* Company */}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mr-2">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="truncate font-medium">{portfolio.company}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-5 leading-relaxed min-h-[40px]">
                      {portfolio.description.replace(/<[^>]*>/g, '').substring(0, 100)}
                      {portfolio.description.replace(/<[^>]*>/g, '').length > 100 && '...'}
                    </p>

                    {/* Tags */}
                    {portfolio.tag.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-5">
                        {portfolio.tag.slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-xs px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold border border-emerald-200 dark:border-emerald-900/50"
                          >
                            {t}
                          </span>
                        ))}
                        {portfolio.tag.length > 3 && (
                          <span className="inline-flex items-center text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-semibold">
                            +{portfolio.tag.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-5 border-t border-gray-100 dark:border-gray-800">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(portfolio)}
                        className="flex-1 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all font-medium"
                      >
                        <Pencil className="w-4 h-4 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(portfolio.id)}
                        className="hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:border-red-300 dark:hover:border-red-700 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {portfolio.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(portfolio.link, "_blank", "noopener,noreferrer")}
                          className="hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View - Enhanced 
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-2 border-gray-200 dark:border-gray-800">
                      <TableHead className="font-bold text-gray-900 dark:text-white">Portfolio</TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">Company</TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">Category</TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">Tags</TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">Date</TableHead>
                      <TableHead className="text-right font-bold text-gray-900 dark:text-white">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPortfolios.map((portfolio) => (
                      <TableRow key={portfolio.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
                              {portfolio.image ? (
                                <img
                                  src={portfolio.image}
                                  alt={portfolio.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <LayoutGrid className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {portfolio.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                ID: {portfolio.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
                              <Building2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {portfolio.company}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex text-xs px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold border border-emerald-200 dark:border-emerald-900/50">
                            {portfolio.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1.5 flex-wrap max-w-xs">
                            {portfolio.tag.slice(0, 2).map((t, i) => (
                              <span
                                key={i}
                                className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md font-medium"
                              >
                                {t}
                              </span>
                            ))}
                            {portfolio.tag.length > 2 && (
                              <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md font-semibold">
                                +{portfolio.tag.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">
                              {new Date(portfolio.projectDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(portfolio)}
                              className="hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(portfolio.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            {portfolio.link && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(portfolio.link, "_blank", "noopener,noreferrer")}
                                className="hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        <PortfolioForm
          open={formOpen}
          onOpenChange={setFormOpen}
          portfolio={editingPortfolio}
          onSuccess={handleFormSuccess}
        />
      </div>
    </>
  );
}