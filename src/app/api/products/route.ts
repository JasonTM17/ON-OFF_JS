import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};

  if (category) {
    where.category = { slug: category };
  }
  if (gender) {
    where.category = { ...(where.category as object || {}), gender };
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const orderBy: Record<string, string> = {};
  switch (sort) {
    case "price-asc": orderBy.price = "asc"; break;
    case "price-desc": orderBy.price = "desc"; break;
    case "rating": orderBy.rating = "desc"; break;
    case "bestseller": orderBy.reviewCount = "desc"; break;
    default: orderBy.createdAt = "desc";
  }

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: { category: true, variants: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.product.count({ where }),
  ]);

  return NextResponse.json({
    products: products.map((p) => ({
      ...p,
      images: JSON.parse(p.images),
    })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
