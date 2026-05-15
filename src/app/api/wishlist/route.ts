import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const wishlist = await db.wishlist.findUnique({
    where: { userId: session.userId },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!wishlist) return NextResponse.json({ items: [] });

  return NextResponse.json({
    items: wishlist.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.salePrice || item.product.price,
      salePrice: item.product.salePrice,
      image: JSON.parse(item.product.images)[0],
      createdAt: item.createdAt,
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "Thiếu productId" }, { status: 400 });

  let wishlist = await db.wishlist.findUnique({ where: { userId: session.userId } });
  if (!wishlist) {
    wishlist = await db.wishlist.create({ data: { userId: session.userId } });
  }

  const existing = await db.wishlistItem.findUnique({
    where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
  });

  if (existing) {
    return NextResponse.json({ success: true, added: false });
  }

  await db.wishlistItem.create({
    data: { wishlistId: wishlist.id, productId },
  });

  return NextResponse.json({ success: true, added: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");
  if (!productId) return NextResponse.json({ error: "Thiếu productId" }, { status: 400 });

  const wishlist = await db.wishlist.findUnique({ where: { userId: session.userId } });
  if (!wishlist) return NextResponse.json({ success: true });

  await db.wishlistItem.deleteMany({
    where: { wishlistId: wishlist.id, productId },
  });

  return NextResponse.json({ success: true });
}
