"use client";

import Link from "next/link";

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-serif font-light text-foreground/10 mb-4">Oops</p>
      <h1 className="font-serif text-2xl mb-3">Đã xảy ra lỗi</h1>
      <p className="text-sm text-muted mb-8 max-w-sm">
        Có lỗi xảy ra khi tải trang. Vui lòng thử lại hoặc quay về trang chủ.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="h-11 px-8 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="h-11 px-8 bg-foreground text-background text-sm font-medium flex items-center hover:opacity-90 transition-opacity"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
