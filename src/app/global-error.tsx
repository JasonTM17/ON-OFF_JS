"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="bg-white text-black">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-6xl font-bold">500</h1>
          <p className="mt-4 text-lg text-gray-600">Lỗi hệ thống</p>
          <p className="mt-2 text-sm text-gray-400">
            Hệ thống đang gặp sự cố. Vui lòng thử lại sau.
          </p>
          <button
            onClick={reset}
            className="mt-8 px-8 py-3 bg-black text-white text-sm hover:opacity-90 transition-opacity"
          >
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}
