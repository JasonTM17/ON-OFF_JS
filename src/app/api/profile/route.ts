import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        addresses: { orderBy: { isDefault: "desc" } },
        _count: { select: { orders: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy tài khoản" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e) {
    console.error("[profile]", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone } = body;

    const updated = await db.user.update({
      where: { id: session.userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
      },
      select: { id: true, name: true, email: true, phone: true },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error("[profile/patch]", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
