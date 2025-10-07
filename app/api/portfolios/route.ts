// app/api/portfolios/route.ts
import { db } from "@/lib/db";
import { portfolios } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(portfolios)
      .orderBy(desc(portfolios.projectDate)); // Urut dari terbaru
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Received data:", body); // Debug log

    // Validasi data
    const portfolioData = {
      title: body.title,
      slug: body.slug,
      company: body.company,
      category: body.category,
      description: body.description,
      link: body.link || null,
      tag: body.tag || [],
      image: body.image,
      gallery: body.gallery || [],
      projectDate: body.projectDate ? new Date(body.projectDate) : new Date(),
    };

    console.log("Processed data:", portfolioData); // Debug log

    const newPortfolio = await db
      .insert(portfolios)
      .values(portfolioData)
      .returning();
    return NextResponse.json(newPortfolio[0], { status: 201 });
  } catch (error) {
    console.error("POST Error:", error); // Debug log
    return NextResponse.json(
      {
        error: "Failed to create portfolio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
