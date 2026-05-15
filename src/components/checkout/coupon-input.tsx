"use client";

import { useState } from "react";
import { Tag, Check, X, Loader2 } from "lucide-react";

interface CouponInputProps {
  onApply: (code: string) => Promise<{ discount: number; type: string } | null>;
  onRemove: () => void;
  applied?: { code: string; discount: number; type: string } | null;
}

export function CouponInput({ onApply, onRemove, applied }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");

    const result = await onApply(code.trim().toUpperCase());
    if (!result) {
      setError("Mã giảm giá không hợp lệ hoặc đã hết hạn");
    } else {
      setCode("");
    }
    setLoading(false);
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50/50">
        <div className="flex items-center gap-2">
          <Check size={14} className="text-green-600" />
          <span className="text-sm text-foreground font-medium">{applied.code}</span>
          <span className="text-xs text-green-600">
            -{applied.type === "PERCENT" ? `${applied.discount}%` : `${applied.discount.toLocaleString("vi-VN")}₫`}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-muted hover:text-foreground transition-colors"
          aria-label="Xóa mã giảm giá"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
            placeholder="Nhập mã giảm giá"
            className="w-full h-10 pl-9 pr-3 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors uppercase tracking-wide"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="h-10 px-4 bg-foreground text-background text-xs tracking-[0.1em] uppercase hover:bg-muted transition-colors disabled:opacity-40"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Áp dụng"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
