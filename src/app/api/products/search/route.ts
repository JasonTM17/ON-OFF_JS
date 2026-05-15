import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "5", 10) || 5, 20);

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
      isNew: true,
      isBestseller: true,
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    results: products.map((p) => {
      let image: string | null = null;
      try {
        image = (JSON.parse(p.images) as string[])[0] ?? null;
      } catch {
        image = null;
      }
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.salePrice ?? p.price,
        originalPrice: p.price,
        image,
        isNew: p.isNew,
        isBestseller: p.isBestseller,
      };
    }),
  });
}
