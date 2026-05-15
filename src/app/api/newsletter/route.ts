import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const existing = await db.newsletter.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Email đã được đăng ký" });
    }

    await db.newsletter.create({ data: { email } });

    return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }
    console.error("[newsletter]", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
