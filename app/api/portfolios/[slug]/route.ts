import { NextResponse } from "next/server";

const BACKEND_URL = "https://portfolio-hmd-backend.free.nf/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const res = await fetch(`${BACKEND_URL}/portfolios/${slug}`, {
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

    if (contentType && contentType.includes("text/html")) {
      console.error("Got HTML instead of JSON");
      return NextResponse.json(
        { error: "Backend returned HTML instead of JSON" },
        { status: 502 }
      );
    }

    const data = await res.json();

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
