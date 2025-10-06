import { getPortfolios } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  if (!portfolios || portfolios.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
        <p className="text-gray-600">
          Belum ada portfolio. Silakan tambahkan melalui admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Link
            key={portfolio.id}
            href={`/portfolio/${portfolio.slug}`}
            className="group"
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              {portfolio.image ? (
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={portfolio.image}
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                  {portfolio.title}
                </h2>

                {portfolio.company && (
                  <p className="text-sm text-gray-600 mb-2">
                    {portfolio.company}
                  </p>
                )}

                {portfolio.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {portfolio.category}
                  </span>
                )}

                {portfolio.tags && portfolio.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {portfolio.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
