import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      address: true,
    },
  });

  if (!order) return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });

  // Users can only view their own orders; admins can view all
  if (order.userId !== session.userId && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
  }

  return NextResponse.json({
    ...order,
    items: order.items.map((i) => ({
      ...i,
      product: { ...i.product, images: JSON.parse(i.product.images) },
    })),
  });
}
