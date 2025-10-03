import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
      <p className="text-gray-600 mb-8">
        Portfolio yang kamu cari tidak ditemukan atau belum dipublish.
      </p>
      <Link
        href="/portfolio"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Portfolio
      </Link>
    </div>
  );
}
