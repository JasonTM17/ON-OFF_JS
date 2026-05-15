import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-serif font-light text-foreground/10 mb-4">404</p>
      <h1 className="font-serif text-2xl mb-3">Không tìm thấy trang</h1>
      <p className="text-sm text-muted mb-8 max-w-sm">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-11 px-8 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
