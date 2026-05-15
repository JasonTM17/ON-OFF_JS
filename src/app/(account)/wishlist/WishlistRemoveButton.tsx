"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function WishlistRemoveButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    setLoading(true);
    try {
      await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      aria-label="Xóa khỏi danh sách yêu thích"
      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-background border border-border text-muted hover:text-foreground hover:border-foreground transition-colors disabled:opacity-40"
    >
      {loading ? (
        <span className="block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
