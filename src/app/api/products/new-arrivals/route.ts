import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "8");

  const products = await db.product.findMany({
    where: { isActive: true, isNew: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      images: true,
    },
  });

  const parsed = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images as string),
  }));

  return NextResponse.json({ products: parsed });
}
