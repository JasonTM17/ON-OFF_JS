"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-serif font-light text-foreground/10 mb-4">Oops</p>
      <h1 className="font-serif text-2xl mb-3">Đã xảy ra lỗi</h1>
      <p className="text-sm text-muted mb-8 max-w-sm">
        Có lỗi xảy ra khi tải trang. Vui lòng thử lại.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center h-11 px-8 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
}
