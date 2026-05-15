import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p
        className="text-6xl font-serif font-light mb-4"
        style={{ color: "#D8C3A5" }}
      >
        404
      </p>
      <h1
        className="font-serif text-2xl mb-3"
        style={{ color: "#1F1F1F" }}
      >
        Sản phẩm không tồn tại
      </h1>
      <p
        className="text-sm mb-8 max-w-sm"
        style={{ color: "#7A5C45" }}
      >
        Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium transition-colors hover:opacity-90"
        style={{ backgroundColor: "#1F1F1F", color: "#FAF7F2" }}
      >
        Xem tất cả sản phẩm
      </Link>
    </div>
  );
}
