import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const product = await db.product.findUnique({
    where: { id },
    include: { category: true, variants: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const { name, description, price, salePrice, categoryId, images, isNew, isBestseller } = body;

  const data: Record<string, unknown> = {};
  if (name !== undefined) { data.name = name; data.slug = slugify(name); }
  if (description !== undefined) data.description = description;
  if (price !== undefined) data.price = price;
  if (salePrice !== undefined) data.salePrice = salePrice;
  if (categoryId !== undefined) data.categoryId = categoryId;
  if (images !== undefined) data.images = JSON.stringify(images);
  if (isNew !== undefined) data.isNew = isNew;
  if (isBestseller !== undefined) data.isBestseller = isBestseller;

  const product = await db.product.update({
    where: { id },
    data,
    include: { category: true, variants: true },
  });

  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  await db.productVariant.deleteMany({ where: { productId: id } });
  await db.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
