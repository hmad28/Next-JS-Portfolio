// components/portfolio.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "../app/icon/arrow";

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

// Mapping tools ke style
const toolStyles: Record<string, { bg: string; text: string }> = {
  Canva: { bg: "bg-cyan-500/90", text: "text-cyan-200" },
  Capcut: { bg: "bg-black/90", text: "text-white" },
  Photography: { bg: "bg-slate-600/90", text: "text-slate-300" },
  Videography: { bg: "bg-gray-400/90", text: "text-gray-200" },
  "Fifa Kit Creator": { bg: "bg-black", text: "text-green-400" },

  // === LANGUAGES ===
  HTML: { bg: "bg-orange-500/90", text: "text-orange-100" },
  CSS: { bg: "bg-blue-500/90", text: "text-blue-100" },
  JavaScript: { bg: "bg-yellow-400/90", text: "text-yellow-800" },
  TypeScript: { bg: "bg-blue-600/90", text: "text-blue-100" },
  PHP: { bg: "bg-violet-400/90", text: "text-violet-200" },
  Python: { bg: "bg-blue-400/90", text: "text-yellow-100" },
  Ruby: { bg: "bg-red-600/90", text: "text-red-100" },
  Java: { bg: "bg-orange-600/90", text: "text-orange-100" },
  C: { bg: "bg-gray-600/90", text: "text-gray-100" },
  "C++": { bg: "bg-blue-700/90", text: "text-blue-100" },
  CSharp: { bg: "bg-purple-600/90", text: "text-purple-100" },
  Go: { bg: "bg-cyan-500/90", text: "text-cyan-100" },
  Rust: { bg: "bg-orange-700/90", text: "text-orange-100" },
  
  // === FRONTEND FRAMEWORKS ===
  React: { bg: "bg-sky-500/90", text: "text-sky-100" },
  NextJS: { bg: "bg-neutral-900", text: "text-white" },
  Vue: { bg: "bg-emerald-500/90", text: "text-emerald-100" },
  Nuxt: { bg: "bg-green-600/90", text: "text-green-100" },
  Svelte: { bg: "bg-orange-500/90", text: "text-orange-100" },
  Angular: { bg: "bg-red-600/90", text: "text-red-100" },
  AlpineJS: { bg: "bg-teal-500/90", text: "text-teal-100" },
  jQuery: { bg: "bg-blue-400/90", text: "text-blue-100" },
  
  // === BACKEND FRAMEWORKS ===
  Laravel: { bg: "bg-red-500/90", text: "text-red-100" },
  NodeJS: { bg: "bg-green-600/90", text: "text-green-100" },
  Express: { bg: "bg-gray-800", text: "text-gray-100" },
  Django: { bg: "bg-emerald-700/90", text: "text-emerald-100" },
  Flask: { bg: "bg-gray-700/90", text: "text-gray-200" },
  Spring: { bg: "bg-green-500/90", text: "text-green-100" },
  FastAPI: { bg: "bg-teal-600/90", text: "text-teal-100" },
  ".NET": { bg: "bg-indigo-700/90", text: "text-indigo-100" },

  // === DATABASES ===
  MySQL: { bg: "bg-sky-600/90", text: "text-sky-100" },
  PostgreSQL: { bg: "bg-blue-700/90", text: "text-blue-100" },
  MongoDB: { bg: "bg-green-700/90", text: "text-green-100" },
  SQLite: { bg: "bg-indigo-500/90", text: "text-indigo-100" },
  Firebase: { bg: "bg-amber-500/90", text: "text-amber-100" },
  Supabase: { bg: "bg-emerald-500/90", text: "text-emerald-100" },
  Redis: { bg: "bg-red-600/90", text: "text-red-100" },
  Prisma: { bg: "bg-blue-500/90", text: "text-blue-100" },

  // === TOOLS & LIBRARIES ===
  Tailwind: { bg: "bg-cyan-400/90", text: "text-cyan-100" },
  Bootstrap: { bg: "bg-indigo-600/90", text: "text-indigo-100" },
  Vite: { bg: "bg-purple-500/90", text: "text-purple-100" },
  Webpack: { bg: "bg-blue-700/90", text: "text-blue-100" },
  Babel: { bg: "bg-yellow-500/90", text: "text-yellow-900" },
  ESLint: { bg: "bg-indigo-500/90", text: "text-indigo-100" },
  Prettier: { bg: "bg-pink-500/90", text: "text-pink-100" },
  Git: { bg: "bg-orange-600/90", text: "text-orange-100" },
  GitHub: { bg: "bg-gray-900", text: "text-white" },
  Docker: { bg: "bg-sky-600/90", text: "text-sky-100" },
  Postman: { bg: "bg-orange-500/90", text: "text-orange-100" },
  Figma: { bg: "bg-pink-500/90", text: "text-pink-100" },
  VSCode: { bg: "bg-blue-500/90", text: "text-blue-100" },

  // === CLOUD / DEPLOY ===
  Vercel: { bg: "bg-black", text: "text-white" },
  Netlify: { bg: "bg-emerald-500/90", text: "text-emerald-100" },
  Railway: { bg: "bg-purple-600/90", text: "text-purple-100" },
  Render: { bg: "bg-blue-700/90", text: "text-blue-100" },
  AWS: { bg: "bg-orange-600/90", text: "text-orange-100" },
  GoogleCloud: { bg: "bg-sky-500/90", text: "text-sky-100" },
  Cloudflare: { bg: "bg-orange-400/90", text: "text-orange-100" },
  Bun: { bg: "bg-gray-800", text: "text-white" },
  Deno: { bg: "bg-gray-700/90", text: "text-gray-100" },
};

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

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
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="group relative block bg-black 2xl:h-[650px] overflow-hidden"
          >
            <Image
              src={`/images/${item.image}`}
              alt={item.title}
              fill
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
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

              <div className="mt-32 2xl:mt-48">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
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
                  <p className="text-sm text-white">{item.description}</p>

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
    </div>
  );
}
