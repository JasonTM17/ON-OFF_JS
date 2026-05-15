import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    size: z.string(),
    color: z.string(),
    quantity: z.number().int().min(1),
    price: z.number().int(),
  })),
  addressId: z.string().optional(),
  address: z.object({
    fullName: z.string(),
    phone: z.string(),
    province: z.string(),
    district: z.string(),
    ward: z.string(),
    street: z.string(),
  }).optional(),
  paymentMethod: z.enum(["COD", "BANK_TRANSFER"]).default("COD"),
  couponCode: z.string().optional(),
  note: z.string().optional(),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const orders = await db.order.findMany({
    where: { userId: session.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders.map((o) => ({
    ...o,
    items: o.items.map((i) => ({ ...i, product: { ...i.product, images: JSON.parse(i.product.images) } })),
  })));
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    let addressId = data.addressId;

    if (data.address && !addressId) {
      const addr = await db.address.create({
        data: { ...data.address, userId: session.userId },
      });
      addressId = addr.id;
    }

    const total = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    let discount = 0;

    if (data.couponCode) {
      const coupon = await db.coupon.findUnique({ where: { code: data.couponCode } });
      if (coupon && coupon.isActive && coupon.usedCount < coupon.usageLimit && new Date() < coupon.expiresAt) {
        if (total >= coupon.minOrder) {
          discount = coupon.type === "PERCENT"
            ? Math.min(Math.floor(total * coupon.discount / 100), coupon.maxDiscount || Infinity)
            : coupon.discount;
          await db.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
        }
      }
    }

    const shippingFee = total >= 500000 ? 0 : 30000;

    const order = await db.order.create({
      data: {
        userId: session.userId,
        total: total - discount + shippingFee,
        shippingFee,
        discount,
        paymentMethod: data.paymentMethod,
        addressId,
        note: data.note,
        items: {
          create: data.items.map((i) => ({
            productId: i.productId,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { items: true },
    });

    // Clear cart
    const cart = await db.cart.findUnique({ where: { userId: session.userId } });
    if (cart) {
      await db.cartItem.deleteMany({ where: { cartId: cart.id } });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
