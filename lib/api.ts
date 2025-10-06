// Gunakan proxy API route di Vercel, bukan direct ke backend
const API_URL = "/api";

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
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch portfolios:", res.status);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Response bukan array");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }
}

export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | null> {
  try {
    const res = await fetch(`${API_URL}/portfolios/${slug}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch portfolio:", res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}
