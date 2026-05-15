import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body: { code?: string; orderTotal?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const { code, orderTotal } = body;

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Vui lòng nhập mã giảm giá" }, { status: 400 });
  }
  if (typeof orderTotal !== "number" || orderTotal < 0) {
    return NextResponse.json({ error: "Giá trị đơn hàng không hợp lệ" }, { status: 400 });
  }

  const coupon = await db.coupon.findUnique({
    where: { code: code.trim().toUpperCase() },
  });

  if (!coupon || !coupon.isActive) {
    return NextResponse.json({ error: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa" }, { status: 404 });
  }

  if (new Date() > coupon.expiresAt) {
    return NextResponse.json({ error: "Mã giảm giá đã hết hạn" }, { status: 410 });
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    return NextResponse.json({ error: "Mã giảm giá đã đạt giới hạn sử dụng" }, { status: 409 });
  }

  if (orderTotal < coupon.minOrder) {
    return NextResponse.json(
      {
        error: `Đơn hàng tối thiểu ${coupon.minOrder.toLocaleString("vi-VN")}₫ để áp dụng mã này`,
      },
      { status: 422 }
    );
  }

  // Calculate actual discount amount
  let discountAmount: number;
  if (coupon.type === "PERCENT") {
    discountAmount = Math.round((orderTotal * coupon.discount) / 100);
    if (coupon.maxDiscount !== null && coupon.maxDiscount !== undefined) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  } else {
    // FIXED
    discountAmount = Math.min(coupon.discount, orderTotal);
  }

  return NextResponse.json({
    code: coupon.code,
    discount: coupon.discount,
    type: coupon.type,
    discountAmount,
    maxDiscount: coupon.maxDiscount,
    minOrder: coupon.minOrder,
    expiresAt: coupon.expiresAt,
  });
}
