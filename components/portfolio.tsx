// components/portfolio.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "../app/icon/arrow";
import { toolStyles } from "@/lib/tech-config";

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
}

// Mapping category ke warna
const categoryColors: Record<string, string> = {
  Design: "text-orange-500",
  Teach: "text-teal-500",
  "Frontend Development": "text-blue-500",
  "Video Editing": "text-purple-500",
  Multimedia: "text-yellow-500",
};

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Detect screen size and set items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        // 2xl
        setItemsPerPage(8);
      } else if (window.innerWidth >= 768) {
        // md
        setItemsPerPage(6);
      } else {
        // mobile
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const res = await fetch("/api/portfolios");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = portfolioItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-gray-500">Loading portfolios...</p>
      </div>
    );
  }

  if (portfolioItems.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-gray-500">No portfolios available yet.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="group relative block bg-black 2xl:h-[650px] overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8 drop-shadow-lg drop-shadow-gray-700">
              <p
                className={`text-sm font-medium tracking-widest uppercase ${
                  categoryColors[item.category] || "text-gray-500"
                }`}
              >
                {item.category}
              </p>

              <p className="text-xl font-bold text-white 2xl:text-2xl">
                {item.title}
              </p>

              <p className="text-xs text-gray-300 mt-1">
                {new Date(item.projectDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>

              <div className="mt-8 sm:mt-32 2xl:mt-48">
                {/* Mobile: Always visible, Desktop: Show on hover */}
                <div className="sm:translate-y-8 sm:transform sm:opacity-0 sm:transition-all sm:group-hover:translate-y-0 sm:group-hover:opacity-100 flex flex-col items-start gap-3">
                  <div className="w-full flex gap-2 flex-wrap">
                    {item.tag.map((tool) => {
                      const style = toolStyles[tool] || {
                        bg: "bg-gray-600/90",
                        text: "text-gray-200",
                      };
                      return (
                        <div
                          key={tool}
                          className={`px-2 font-mono text-sm md:text-xs 2xl:text-sm rounded ${style.bg} ${style.text}`}
                        >
                          {tool}
                        </div>
                      );
                    })}
                  </div>

                  <h2 className="text-2xl 2xl:text-3xl text-white font-bold">
                    {item.company}
                  </h2>
                  <p className="text-sm text-white line-clamp-3">
                    {item.description
                      .replace(/<[^>]*>/g, "")
                      .replace(/&nbsp;/g, " ")
                      .trim()
                      .substring(0, 150)}
                    {item.description.replace(/<[^>]*>/g, "").length > 150
                      ? "..."
                      : ""}
                  </p>

                  <div className="w-full flex gap-2 flex-wrap">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="py-1 px-4 text-sm font-semibold bg-blue-500 hover:bg-blue-500/80 duration-200 rounded-lg text-white flex items-center"
                    >
                      See More
                    </Link>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 pl-4 pr-2 text-sm font-semibold hover:bg-gray-50/20 duration-200 border rounded-lg text-white flex items-center gap-1"
                      >
                        Preview <Arrow />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
