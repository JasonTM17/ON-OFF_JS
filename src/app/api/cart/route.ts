import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const addSchema = z.object({
  productId: z.string(),
  size: z.string(),
  color: z.string(),
  quantity: z.number().int().min(1).default(1),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ items: [] });

  const cart = await db.cart.findUnique({
    where: { userId: session.userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart) return NextResponse.json({ items: [] });

  return NextResponse.json({
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.salePrice || item.product.price,
      image: JSON.parse(item.product.images)[0],
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  try {
    const body = await req.json();
    const data = addSchema.parse(body);

    let cart = await db.cart.findUnique({ where: { userId: session.userId } });
    if (!cart) {
      cart = await db.cart.create({ data: { userId: session.userId } });
    }

    const existing = await db.cartItem.findUnique({
      where: { cartId_productId_size_color: { cartId: cart.id, productId: data.productId, size: data.size, color: data.color } },
    });

    if (existing) {
      await db.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + data.quantity },
      });
    } else {
      await db.cartItem.create({
        data: { cartId: cart.id, productId: data.productId, size: data.size, color: data.color, quantity: data.quantity },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const body = await req.json();
  const { productId, size, color, quantity } = body;

  const cart = await db.cart.findUnique({ where: { userId: session.userId } });
  if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  if (quantity <= 0) {
    await db.cartItem.deleteMany({
      where: { cartId: cart.id, productId, size, color },
    });
  } else {
    await db.cartItem.updateMany({
      where: { cartId: cart.id, productId, size, color },
      data: { quantity },
    });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");
  const size = searchParams.get("size");
  const color = searchParams.get("color");

  const cart = await db.cart.findUnique({ where: { userId: session.userId } });
  if (!cart) return NextResponse.json({ success: true });

  if (productId && size && color) {
    await db.cartItem.deleteMany({ where: { cartId: cart.id, productId, size, color } });
  } else {
    await db.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  return NextResponse.json({ success: true });
}
