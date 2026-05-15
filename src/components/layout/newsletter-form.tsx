"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Đăng ký thành công!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Có lỗi xảy ra");
      }
    } catch {
      setStatus("error");
      setMessage("Không thể kết nối server");
    }
  };

  if (status === "success") {
    return (
      <p className="text-sm text-accent tracking-wide">{message}</p>
    );
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email của bạn"
        required
        className="flex-1 h-11 px-4 bg-transparent border border-background/30 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-background text-foreground hover:bg-background/90 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Đăng ký"}
      </Button>
      {status === "error" && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-400">{message}</p>
      )}
    </form>
  );
}
