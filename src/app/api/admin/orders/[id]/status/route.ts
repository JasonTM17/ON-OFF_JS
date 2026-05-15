import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const VALID_STATUSES = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"] as const;
type OrderStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
  }

  const { id } = await params;

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const { status } = body;

  if (!status || !VALID_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json(
      {
        error: "Trạng thái không hợp lệ",
        validStatuses: VALID_STATUSES,
      },
      { status: 400 }
    );
  }

  const existing = await db.order.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
  }

  const order = await db.order.update({
    where: { id },
    data: { status: status as OrderStatus },
    include: {
      items: { include: { product: { select: { id: true, name: true, images: true } } } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({
    message: "Cập nhật trạng thái đơn hàng thành công",
    order,
  });
}
