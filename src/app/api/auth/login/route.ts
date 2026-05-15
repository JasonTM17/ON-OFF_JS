import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const user = await db.user.findUnique({ where: { email: data.email } });
    if (!user || !(await verifyPassword(data.password, user.password))) {
      return NextResponse.json({ error: "Email hoặc mật khẩu không đúng" }, { status: 401 });
    }

    const token = await createToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    response.cookies.set("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
