"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    if (!confirm("Bạn có chắc muốn hủy đơn hàng này không?")) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      router.refresh();
    } catch {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      {error && (
        <p className="text-sm text-red-600 mb-3">{error}</p>
      )}
      <button
        onClick={handleCancel}
        disabled={loading}
        className="text-sm border border-red-300 text-red-600 px-4 py-2 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Đang hủy..." : "Hủy đơn hàng"}
      </button>
    </div>
  );
}
