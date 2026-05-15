import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  orderId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const order = await db.order.findUnique({ where: { id: data.orderId } });

    if (!order) {
      return NextResponse.json({ error: "Đơn hàng không tồn tại" }, { status: 404 });
    }

    if (order.userId !== session.userId) {
      return NextResponse.json({ error: "Không có quyền thực hiện thao tác này" }, { status: 403 });
    }

    if (order.status !== "PENDING") {
      return NextResponse.json(
        { error: "Chỉ có thể hủy đơn hàng đang chờ xử lý" },
        { status: 400 }
      );
    }

    const updated = await db.order.update({
      where: { id: data.orderId },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ message: "Đơn hàng đã được hủy thành công", order: updated });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
