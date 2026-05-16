import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  robots: { index: false },
};

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={32} className="text-green-600" />
      </div>

      <h1 className="font-serif text-3xl mb-3">Đặt hàng thành công!</h1>
      <p className="text-sm text-muted max-w-md">
        Cảm ơn bạn đã mua sắm tại ON/OFF. Đơn hàng của bạn đã được tiếp nhận
        và sẽ được xử lý trong thời gian sớm nhất.
      </p>

      <div className="mt-8 p-6 border border-border w-full max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <Package size={18} className="text-muted" />
          <span className="text-xs tracking-wide text-muted">THÔNG TIN ĐƠN HÀNG</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Trạng thái</span>
            <span className="text-green-600 font-medium">Đã tiếp nhận</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Phương thức</span>
            <span>COD</span>
          </div>
        </div>
        <p className="text-xs text-muted mt-4 pt-4 border-t border-border">
          Bạn sẽ nhận được email xác nhận đơn hàng trong ít phút.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/account/orders"
          className="px-8 h-11 flex items-center justify-center gap-2 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
        >
          Xem đơn hàng
        </Link>
        <Link
          href="/products"
          className="px-8 h-11 flex items-center justify-center gap-2 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          Tiếp tục mua sắm
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
