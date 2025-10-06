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
  console.log("🔍 Fetching portfolios from:", `${API_URL}/portfolios`);

  try {
    const res = await fetch(`${API_URL}/portfolios`, {
      cache: "no-store", // Force fresh data
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    console.log("📡 Response status:", res.status);
    console.log(
      "📡 Response headers:",
      Object.fromEntries(res.headers.entries())
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ API Error:", res.status, text.substring(0, 200));
      return [];
    }

    const contentType = res.headers.get("content-type");
    console.log("📄 Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("❌ Response bukan JSON:", text.substring(0, 200));
      return [];
    }

    const data = await res.json();
    console.log("✅ Data received:", data);
    console.log(
      "📊 Total portfolios:",
      Array.isArray(data) ? data.length : "Not an array"
    );

    if (!Array.isArray(data)) {
      console.error("❌ Response bukan array:", typeof data);
      return [];
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("💥 Error fetching portfolios:", error.message);
      console.error("Stack:", error.stack);
    }
    return [];
  }
}

export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | null> {
  console.log("🔍 Fetching portfolio:", slug);

  try {
    const res = await fetch(`${API_URL}/portfolios/${slug}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ API Error:", res.status, text.substring(0, 200));
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("❌ Response bukan JSON");
      return null;
    }

    const data = await res.json();
    console.log("✅ Portfolio data:", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("💥 Error fetching portfolio:", error.message);
    }
    return null;
  }
}
