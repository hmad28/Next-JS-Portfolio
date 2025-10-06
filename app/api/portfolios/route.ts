import { NextResponse } from "next/server";

const BACKEND_URL = "https://portfolio-hmd-backend.free.nf/api";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/portfolios`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Backend error:", res.status);
      return NextResponse.json(
        { error: "Failed to fetch from backend" },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type");

    // Cek jika dapat HTML (anti-bot)
    if (contentType && contentType.includes("text/html")) {
      console.error("Got HTML instead of JSON - possible anti-bot protection");
      return NextResponse.json(
        { error: "Backend returned HTML instead of JSON" },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Return dengan CORS headers
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
