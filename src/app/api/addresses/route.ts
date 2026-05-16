import { NextResponse } from "next/server";
import { db } from "@/lib/db"
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

  const addresses = await db.address.findMany({
    where: { userId },
    orderBy: { isDefault: "desc" },
  });

  return NextResponse.json({ addresses });
}

export async function POST(request: Request) {
  const userId = await getUser();
  if (!userId) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json();
  const { fullName, phone, province, district, ward, street, isDefault } = body;

  if (!fullName || !phone || !province || !district || !street) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  if (isDefault) {
    await db.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }

  const address = await db.address.create({
    data: {
      userId,
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
