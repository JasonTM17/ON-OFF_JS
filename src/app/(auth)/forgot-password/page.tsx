"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Đã xảy ra lỗi, vui lòng thử lại.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Kiểm tra hộp thư của bạn để tiếp tục.");
    } catch {
      setStatus("error");
      setMessage("Lỗi kết nối, vui lòng thử lại.");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-center mb-3">Quên mật khẩu</h1>
        <p className="text-sm text-muted text-center mb-8">
          Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
        </p>

        {status === "success" ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded text-sm text-green-800">
              {message}
            </div>
            <p className="text-center text-sm text-muted">
              <Link href="/login" className="underline hover:text-foreground">
                Quay lại đăng nhập
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            {status === "error" && (
              <p className="text-sm text-red-600">{message}</p>
            )}
            <Button type="submit" className="w-full h-11" disabled={status === "loading"}>
              {status === "loading" ? "Đang xử lý..." : "Gửi hướng dẫn"}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted mt-6">
          Nhớ mật khẩu rồi?{" "}
          <Link href="/login" className="underline hover:text-foreground">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
