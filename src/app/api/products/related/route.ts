import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Thiếu tham số slug" }, { status: 400 });
  }

  const product = await db.product.findUnique({
    where: { slug },
    include: { category: true, variants: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  const related = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      images: true,
    },
  });

  const parsedRelated = related.map((p) => ({
    ...p,
    images: JSON.parse(p.images as string),
  }));

  return NextResponse.json({ products: parsedRelated });
}
