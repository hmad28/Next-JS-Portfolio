const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-hmd-backend.free.nf/api";

export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  company?: string | null;
  category?: string | null;
  description?: string | null;
  tags?: string[];
  image?: string | null;
  gallery?: Array<{
    url: string;
    thumb: string;
  }>;
  created_at: string;
}

export async function getPortfolios(): Promise<Portfolio[]> {
  try {
    const res = await fetch(`${API_URL}/portfolios`, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      // PENTING: Tambahkan timeout untuk free hosting
      signal: AbortSignal.timeout(10000), // 10 detik timeout
    });

    if (!res.ok) {
      console.error("Failed to fetch portfolios:", res.status, res.statusText);
      return [];
    }

    // CEK apakah response benar-benar JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Response bukan JSON:", contentType);
      const text = await res.text();
      console.error("Response body:", text.substring(0, 200)); // Log 200 char pertama
      return [];
    }

    const data = await res.json();
    
    // Validasi data adalah array
    if (!Array.isArray(data)) {
      console.error("Response bukan array:", typeof data);
      return [];
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching portfolios:", error.message);
    }
    return [];
  }
}

export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | null> {
  try {
    const res = await fetch(`${API_URL}/portfolios/${slug}`, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error("Failed to fetch portfolio:", res.status, res.statusText);
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Response bukan JSON:", contentType);
      return null;
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching portfolio:", error.message);
    }
    return null;
  }
}