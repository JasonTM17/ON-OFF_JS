"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: Record<string, string>) => Promise<void>;
  error?: string;
}

export function AuthForm({ mode, onSubmit, error }: AuthFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl">
          {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
        </h1>
        <p className="text-xs text-muted mt-2">
          {mode === "login"
            ? "Chào mừng bạn quay lại"
            : "Đăng ký để nhận ưu đãi độc quyền"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {mode === "register" && (
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Họ và tên"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-11 pl-9 pr-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        )}

        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-11 pl-9 pr-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {mode === "register" && (
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full h-11 pl-9 pr-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        )}

        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full h-11 pl-9 pr-10 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        {mode === "register" && (
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full h-11 pl-9 pr-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        )}
      </div>

      {mode === "login" && (
        <div className="flex justify-end mt-3">
          <Link href="/forgot-password" className="text-xs text-muted hover:text-foreground transition-colors">
            Quên mật khẩu?
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 mt-6 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading
          ? "Đang xử lý..."
          : mode === "login"
          ? "Đăng nhập"
          : "Tạo tài khoản"}
      </button>

      <p className="text-center text-xs text-muted mt-6">
        {mode === "login" ? (
          <>
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-foreground hover:underline">
              Đăng ký ngay
            </Link>
          </>
        ) : (
          <>
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-foreground hover:underline">
              Đăng nhập
            </Link>
          </>
        )}
      </p>
    </motion.form>
  );
}
