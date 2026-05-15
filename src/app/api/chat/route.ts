import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { handleChat } from "@/lib/chatbot";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(500),
  sessionId: z.string().optional(),
});

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/chat";
const N8N_TIMEOUT = 5000;

async function tryN8nAI(message: string, sessionId: string, userId?: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT);

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId, userId }),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.reply) return data;
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = chatSchema.parse(body);

    const session = await getSession();
    const userId = session?.userId;
    const sid = sessionId || `anon-${Date.now()}`;

    await db.chatMessage.create({
      data: { sessionId: sid, role: "user", content: message },
    });

    // Try n8n AI first, fallback to rule-based
    let response = await tryN8nAI(message, sid, userId);
    if (!response) {
      response = await handleChat(message, userId);
    }

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
