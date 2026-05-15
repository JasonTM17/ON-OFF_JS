import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { soldCount: "desc" },
    take: 8,
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      images: true,
      soldCount: true,
    },
  });

  const parsed = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images as string),
  }));

  return NextResponse.json({ products: parsed });
}
