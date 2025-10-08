// components/portfolio.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "../app/icon/arrow";
import { toolStyles } from "@/lib/tech-config";
import { categoryStyles } from "@/lib/category-config";

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
              src={item.image}
              alt={item.title}
              fill
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-50 md:opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8 drop-shadow-lg drop-shadow-gray-700">
              <p
                className={`text-sm font-medium tracking-widest uppercase ${
                  categoryStyles[item.category]?.text || "text-gray-500"
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
                <div className="md:translate-y-8 md:transform md:opacity-0 md:transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
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
                  <p
                    className="text-sm text-white line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

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
