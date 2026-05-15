import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      salePrice: { not: null },
    },
    orderBy: { updatedAt: "desc" },
    take: 12,
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
    discount: p.salePrice ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0,
  }));

  return NextResponse.json({ products: parsed });
}
