"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={24} className="text-green-600" />
        </div>
        <h3 className="font-serif text-xl">Cảm ơn bạn!</h3>
        <p className="text-sm text-muted mt-2">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-xs text-muted hover:text-foreground underline"
        >
          Gửi tin nhắn khác
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Họ và tên *"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full h-11 px-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
        <input
          type="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full h-11 px-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full h-11 px-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
        <input
          type="text"
          placeholder="Chủ đề *"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full h-11 px-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
      </div>
      <textarea
        placeholder="Nội dung tin nhắn *"
        required
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Đang gửi..." : "Gửi tin nhắn"}
      </button>
    </form>
  );
}
