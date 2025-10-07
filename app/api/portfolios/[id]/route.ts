// app/api/portfolios/[id]/route.ts
import { db } from "@/lib/db";
import { portfolios } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolio = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, parseInt(id)));

    if (!portfolio[0]) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Fetch data yang ada
    const existing = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, parseInt(id)));

    if (!existing[0]) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Merge data lama dengan data baru (partial update)
    const updateData = {
      title: body.title ?? existing[0].title,
      slug: body.slug ?? existing[0].slug,
      company: body.company ?? existing[0].company,
      category: body.category ?? existing[0].category,
      description: body.description ?? existing[0].description,
      link: body.link !== undefined ? body.link : existing[0].link,
      tag: body.tag ?? existing[0].tag,
      image: body.image ?? existing[0].image,
      gallery: body.gallery ?? existing[0].gallery,
      projectDate: body.projectDate
        ? new Date(body.projectDate)
        : existing[0].projectDate,
      updatedAt: new Date(),
    };

    const updated = await db
      .update(portfolios)
      .set(updateData)
      .where(eq(portfolios.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(portfolios).where(eq(portfolios.id, parseInt(id)));
    return NextResponse.json({ message: "Portfolio deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
