import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const user = await db.user.findUnique({ where: { email: data.email } });

    // Always return success to avoid email enumeration
    if (!user) {
      return NextResponse.json({
        message: "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/reset-password?token=${resetToken}`;

    // TODO: persist resetToken to user record and send via email service
    // For now, log for development use
    console.log(`[forgot-password] userId=${user.id} token=${resetToken} url=${resetUrl}`);

    return NextResponse.json({
      message: "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.",
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
