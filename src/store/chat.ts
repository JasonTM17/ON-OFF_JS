"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  products?: Product[];
  quickReplies?: string[];
  createdAt: number;
}

interface ChatStore {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  sessionId: string | null;
  setOpen: (open: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      isOpen: false,
      isTyping: false,
      sessionId: null,

      setOpen: (open) => set({ isOpen: open }),

      sendMessage: async (text) => {
        const userMsg: ChatMessage = {
          id: Math.random().toString(36).slice(2),
          role: "user",
          content: text,
          createdAt: Date.now(),
        };

        set((s) => ({ messages: [...s.messages, userMsg], isTyping: true }));

        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, sessionId: get().sessionId }),
          });

          const data = await res.json();

          const botMsg: ChatMessage = {
            id: Math.random().toString(36).slice(2),
            role: "bot",
            content: data.reply || "Xin lỗi, có lỗi xảy ra.",
            products: data.products,
            quickReplies: data.quickReplies,
            createdAt: Date.now(),
          };

          set((s) => ({
            messages: [...s.messages, botMsg],
            isTyping: false,
            sessionId: data.sessionId || s.sessionId,
          }));
        } catch {
          const errMsg: ChatMessage = {
            id: Math.random().toString(36).slice(2),
            role: "bot",
            content: "😔 Xin lỗi, không thể kết nối. Vui lòng thử lại sau.",
            createdAt: Date.now(),
          };
          set((s) => ({ messages: [...s.messages, errMsg], isTyping: false }));
        }
      },

      clearMessages: () => set({ messages: [], sessionId: null }),
    }),
    {
      name: "onfit-chat",
      partialize: (s) => ({ messages: s.messages, sessionId: s.sessionId }),
    }
  )
);
