import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const q = searchParams.get("q");

  const where: Record<string, unknown> = {};

  if (category) {
    where.category = { slug: category };
  }

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) (where.price as Record<string, unknown>).gte = parseInt(minPrice);
    if (maxPrice) (where.price as Record<string, unknown>).lte = parseInt(maxPrice);
  }

  const orderBy: Record<string, string> = {};
  switch (sort) {
    case "price-asc":
      orderBy.price = "asc";
      break;
    case "price-desc":
      orderBy.price = "desc";
      break;
    case "popular":
      orderBy.reviewCount = "desc";
      break;
    case "name-asc":
      orderBy.name = "asc";
      break;
    default:
      orderBy.createdAt = "desc";
  }

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { category: { select: { name: true, slug: true } } },
    }),
    db.product.count({ where }),
  ]);

  const parsed = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images as string),
  }));

  return NextResponse.json({
    products: parsed,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
