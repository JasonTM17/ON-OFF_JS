"use client";

import Image from "next/image";
import Link from "next/link";
import type { ChatMessage as ChatMessageType } from "@/store/chat";
import { cn } from "@/lib/utils";

interface Props {
  message: ChatMessageType;
  onQuickReply: (text: string) => void;
}

export function ChatMessage({ message, onQuickReply }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}>
      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-zinc-900 text-white rounded-br-sm"
            : "bg-zinc-100 text-zinc-800 rounded-bl-sm"
        )}
      >
        {message.content}
      </div>

      {/* Product cards */}
      {message.products && message.products.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
          {message.products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="flex-shrink-0 w-32 bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-24 bg-zinc-50">
                <Image
                  src={p.images[0] || "/placeholder.jpg"}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-zinc-800 line-clamp-2 leading-tight">{p.name}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {(p.salePrice ?? p.price).toLocaleString("vi-VN")}đ
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick replies */}
      {message.quickReplies && message.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 max-w-[90%]">
          {message.quickReplies.map((qr) => (
            <button
              key={qr}
              onClick={() => onQuickReply(qr)}
              className="text-xs px-3 py-1.5 border border-zinc-300 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
