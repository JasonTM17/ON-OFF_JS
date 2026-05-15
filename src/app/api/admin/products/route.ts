import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const [products, total] = await Promise.all([
    db.product.findMany({
      include: { category: true, variants: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.product.count(),
  ]);

  return NextResponse.json({ products, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { name, description, price, salePrice, categoryId, images, variants, isNew, isBestseller } = body;

  if (!name || !price || !categoryId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const slug = slugify(name);

  const product = await db.product.create({
    data: {
      name,
      slug,
      description: description || "",
      price,
      salePrice: salePrice || null,
      categoryId,
      images: JSON.stringify(images || []),
      isNew: isNew || false,
      isBestseller: isBestseller || false,
      variants: variants?.length
        ? { create: variants.map((v: { size: string; color: string; colorHex: string; stock: number }) => ({ size: v.size, color: v.color, colorHex: v.colorHex, stock: v.stock || 0 })) }
        : undefined,
    },
    include: { category: true, variants: true },
  });

  return NextResponse.json(product, { status: 201 });
}
