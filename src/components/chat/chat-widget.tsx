"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Trash2 } from "lucide-react";
import { useChatStore } from "@/store/chat";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "bot" as const,
  content: "👋 Xin chào! Tôi là trợ lý ảo của **ON/OFF**. Tôi có thể giúp bạn tìm sản phẩm, tư vấn size, hoặc giải đáp thắc mắc.",
  quickReplies: ["Tìm sản phẩm", "Tư vấn size", "Chính sách giao hàng", "Tra cứu đơn hàng"],
  createdAt: 0,
};

export function ChatWidget() {
  const { isOpen, setOpen, messages, isTyping, sendMessage, clearMessages } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const displayMessages = messages.length === 0 ? [WELCOME_MESSAGE] : messages;

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-zinc-900 text-white rounded-full shadow-lg hover:bg-zinc-700 transition-colors flex items-center justify-center"
            aria-label="Mở chat hỗ trợ"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[85vh] sm:h-[500px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-t sm:border border-zinc-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">ON/OFF Assistant</p>
                  <p className="text-xs text-zinc-400">Luôn sẵn sàng hỗ trợ</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Xóa lịch sử chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Đóng chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {displayMessages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onQuickReply={handleQuickReply}
                />
              ))}
              {isTyping && (
                <div className="flex items-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
