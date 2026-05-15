import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { handleChat } from "@/lib/chatbot";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(500),
  sessionId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = chatSchema.parse(body);

    // Optional auth — needed only for order lookup
    const session = await getSession();
    const userId = session?.userId;

    // Generate a session ID if not provided
    const sid = sessionId || `anon-${Date.now()}`;

    // Persist user message
    await db.chatMessage.create({
      data: { sessionId: sid, role: "user", content: message },
    });

    // Get chatbot response
    const response = await handleChat(message, userId);

    // Persist bot reply
    await db.chatMessage.create({
      data: { sessionId: sid, role: "bot", content: response.reply },
    });

    return NextResponse.json({ ...response, sessionId: sid });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Tin nhắn không hợp lệ" }, { status: 400 });
    }
    console.error("[chat/route]", e);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
