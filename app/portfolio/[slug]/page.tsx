// app/portfolio/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

async function getPortfolio(slug: string) {
  try {
    // Langsung fetch tanpa env variable, karena ini server side
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/portfolios`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const portfolios: Portfolio[] = await res.json();
    return portfolios.find((p) => p.slug === slug);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Next.js 15 params adalah Promise
}) {
  const { slug } = await params; // Await params dulu
  const portfolio = await getPortfolio(slug);

  if (!portfolio) {
    notFound();
  }

  const cleanHTML = (html: string): string => {
    return (
      html
        // 1. Hapus <p></p> kosong dan ganti dengan spacing
        .replace(/<p>\s*<\/p>/g, '<div class="h-4"></div>')

        // 2. Untuk <p><br>, pindahkan <br> ke luar sebagai spacing
        .replace(/<p>\s*<br\s*\/?>\s*/gi, '<div class="h-4"></div><p>')

        // 3. Hapus <br> di akhir <p>
        .replace(/\s*<br\s*\/?>\s*<\/p>/gi, "</p>")

        // 4. Hapus multiple spacing berlebih
        .replace(
          /(<div class="h-4"><\/div>\s*){2,}/g,
          '<div class="h-4"></div>'
        )

        .trim()
    );
  };

  return (
    <div className="min-h-screen bg-white :bg-gray-950 pt-15">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 :text-gray-400 hover:text-gray-900 :hover:text-white mb-8"
        >
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600 :text-blue-400 uppercase tracking-wider mb-2">
            {portfolio.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 :text-white mb-4">
            {portfolio.title}
          </h1>
          <p className="text-xl text-gray-600 :text-gray-400 mb-2">
            {portfolio.company}
          </p>
          <p className="text-sm text-gray-500 :text-gray-500">
            Created in{" "}
            {new Date(portfolio.projectDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {portfolio.tag.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 :bg-gray-800 text-gray-700 :text-gray-300 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden mb-8">
          <Image
            src={portfolio.image}
            alt={portfolio.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 :text-white">
            About This Project
          </h2>
          <div
            className="prose prose-lg :prose-invert max-w-none
            [&_p]:mb-4 [&_p]:text-gray-700 :[&_p]:text-gray-300 [&_p]:leading-relaxed
            [&_h1]:text-gray-900 :[&_h1]:text-white [&_h1]:mb-3 [&_h1]:mt-6
            [&_h2]:text-gray-900 :[&_h2]:text-white [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl
            [&_h3]:text-gray-900 :[&_h3]:text-white [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl
            [&_strong]:text-gray-900 :[&_strong]:text-white [&_strong]:font-semibold
            [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
            [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-l-blue-500 
            [&_blockquote]:bg-gray-50 :[&_blockquote]:bg-gray-800
            [&_blockquote]:py-3 [&_blockquote]:px-4 [&_blockquote]:my-4 
            [&_blockquote]:rounded-r [&_blockquote]:italic
            [&_code]:text-pink-600 :[&_code]:text-pink-400 
            [&_code]:bg-gray-100 :[&_code]:bg-gray-800
            [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 
            [&_pre]:rounded-lg [&_pre]:my-4
            [&_a]:text-blue-600 :[&_a]:text-blue-400 [&_a]:underline"
            dangerouslySetInnerHTML={{
              __html: cleanHTML(portfolio.description),
            }}
          />
        </div>

        {/* Gallery */}
        {portfolio.gallery && portfolio.gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 :text-white">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.gallery.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`${portfolio.title} - Gallery ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Link */}
        {portfolio.link && (
          <div className="mt-12 text-center">
            <a
              href={portfolio.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View Live Project →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
