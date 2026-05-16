import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
    const { payload } = await jwtVerify(token, secret);
    return payload.sub as string;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const reviews = await db.review.findMany({
    where: { userId },
    include: {
      product: {
        select: { name: true, slug: true, images: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const parsed = reviews.map((r) => ({
    ...r,
    product: {
      ...r.product,
      images: JSON.parse(r.product.images as string),
    },
  }));

  return NextResponse.json({ reviews: parsed });
}

export async function POST(request: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json();
  const { productId, rating, comment } = body;

  if (!productId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const existing = await db.review.findFirst({
    where: { userId, productId },
  });

  if (existing) {
    return NextResponse.json({ error: "Bạn đã đánh giá sản phẩm này" }, { status: 409 });
  }

  const review = await db.review.create({
    data: {
      userId,
      productId,
      rating,
      comment: comment || "",
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}
