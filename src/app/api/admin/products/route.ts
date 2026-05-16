import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(5000).optional().default(""),
  price: z.number().int().positive(),
  salePrice: z.number().int().positive().nullable().optional(),
  categoryId: z.string().min(1),
  images: z.array(z.string()).max(10).optional().default([]),
  variants: z.array(z.object({
    size: z.string().min(1),
    color: z.string().min(1),
    colorHex: z.string().min(1),
    stock: z.number().int().min(0).default(0),
  })).optional(),
  isNew: z.boolean().optional().default(false),
  isBestseller: z.boolean().optional().default(false),
});

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
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
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = productSchema.parse(body);

    const slug = slugify(data.name);

    const product = await db.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        price: data.price,
        salePrice: data.salePrice || null,
        categoryId: data.categoryId,
        images: JSON.stringify(data.images),
        isNew: data.isNew,
        isBestseller: data.isBestseller,
        variants: data.variants?.length
          ? { create: data.variants.map((v) => ({ size: v.size, color: v.color, colorHex: v.colorHex, stock: v.stock })) }
          : undefined,
      },
      include: { category: true, variants: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
