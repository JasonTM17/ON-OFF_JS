import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const { id } = await params;

  const address = await db.address.findFirst({
    where: { id, userId: session.userId },
  });

  if (!address) {
    return NextResponse.json({ error: "Không tìm thấy địa chỉ" }, { status: 404 });
  }

  await db.address.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { fullName, phone, province, district, ward, street, isDefault } = body;

  const address = await db.address.findFirst({
    where: { id, userId: session.userId },
  });

  if (!address) {
    return NextResponse.json({ error: "Không tìm thấy địa chỉ" }, { status: 404 });
  }

  if (isDefault) {
    await db.address.updateMany({
      where: { userId: session.userId },
      data: { isDefault: false },
    });
  }

  const updated = await db.address.update({
    where: { id },
    data: { fullName, phone, province, district, ward, street, isDefault },
  });

  return NextResponse.json({ address: updated });
}
