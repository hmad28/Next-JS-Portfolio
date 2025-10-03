import { getPortfolioBySlug, getPortfolios } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const portfolios = await getPortfolios();
  return portfolios.map((portfolio) => ({
    slug: portfolio.slug,
  }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params terlebih dahulu
  const { slug } = await params;

  const portfolio = await getPortfolioBySlug(slug);

  // Jika portfolio tidak ditemukan, tampilkan 404
  if (!portfolio) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{portfolio.title}</h1>

      {portfolio.company && (
        <p className="text-xl text-gray-600 mb-4">{portfolio.company}</p>
      )}

      {portfolio.category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mb-4">
          {portfolio.category}
        </span>
      )}

      {portfolio.tags && portfolio.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {portfolio.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-100 px-3 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {portfolio.image && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={portfolio.image}
            alt={portfolio.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      {portfolio.description && (
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: portfolio.description }}
        />
      )}

      {portfolio.gallery && portfolio.gallery.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.gallery.map((image, index) => (
              <div key={index} className="relative h-48">
                <Image
                  src={image.url}
                  alt={`${portfolio.title} ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
