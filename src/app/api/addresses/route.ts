import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const addresses = await db.address.findMany({
    where: { userId: session.userId },
    orderBy: { isDefault: "desc" },
  });

  return NextResponse.json({ addresses });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json();
  const { fullName, phone, province, district, ward, street, isDefault } = body;

  if (!fullName || !phone || !province || !district || !street) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  if (isDefault) {
    await db.address.updateMany({
      where: { userId: session.userId },
      data: { isDefault: false },
    });
  }

  const address = await db.address.create({
    data: {
      userId: session.userId,
      fullName,
      phone,
      province,
      district,
      ward: ward || "",
      street,
      isDefault: isDefault || false,
    },
  });

  return NextResponse.json({ address }, { status: 201 });
}
