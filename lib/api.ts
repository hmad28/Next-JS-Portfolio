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
  image?: string | null; // Bisa null
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
    });

    if (!res.ok) {
      console.error("Failed to fetch portfolios:", res.status);
      return [];
    }

    return res.json();
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
      next: { revalidate: 60 },
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
