"use client";

import Link from "next/link";

export default function AccountError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-serif font-light text-foreground/10 mb-4">Oops</p>
      <h1 className="font-serif text-2xl mb-3">Không thể tải trang</h1>
      <p className="text-sm text-muted mb-8 max-w-sm">
        Có lỗi xảy ra. Vui lòng thử lại hoặc đăng nhập lại.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="h-11 px-8 border border-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
        >
          Thử lại
        </button>
        <Link
          href="/login"
          className="h-11 px-8 bg-foreground text-background text-sm font-medium flex items-center hover:opacity-90 transition-opacity"
        >
          Đăng nhập lại
        </Link>
      </div>
    </div>
  );
}
