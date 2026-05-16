import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 1) return NextResponse.json({ results: [] });

  const products = await db.product.findMany({
    where: {
      name: { contains: q },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      images: true,
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    results: products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      salePrice: p.salePrice,
      images: JSON.parse(p.images as string) as string[],
    })),
  });
}
