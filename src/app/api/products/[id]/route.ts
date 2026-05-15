import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await db.product.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { category: true, variants: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const related = await db.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { variants: true },
    take: 4,
  });

  return NextResponse.json({
    ...product,
    images: JSON.parse(product.images),
    related: related.map((p) => ({ ...p, images: JSON.parse(p.images) })),
  });
}
