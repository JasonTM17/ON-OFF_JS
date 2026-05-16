"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  "Tôi muốn kiểm tra đơn hàng",
  "Chính sách đổi trả",
  "Hướng dẫn chọn size",
  "Liên hệ tư vấn viên",
];

export function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Xin chào! Tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Cảm ơn bạn đã liên hệ. Nhân viên tư vấn sẽ phản hồi trong ít phút.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={22} />
        </motion.button>
      )}

      {open && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 w-80 h-[480px] bg-background border border-border shadow-xl flex flex-col"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-foreground text-background">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs font-medium">Hỗ trợ trực tuyến</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-6 h-6 bg-card border border-border flex items-center justify-center shrink-0">
                    <Bot size={12} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-card border border-border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="px-2.5 py-1 text-[10px] border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex items-center gap-2 px-4 py-3 border-t border-border"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 h-8 px-3 border border-border bg-transparent text-xs placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-8 h-8 flex items-center justify-center bg-foreground text-background disabled:opacity-30"
            >
              <Send size={12} />
            </button>
          </form>
        </motion.div>
      )}
    </>
  );
}
