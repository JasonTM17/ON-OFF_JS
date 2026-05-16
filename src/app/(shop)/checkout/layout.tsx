import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán",
  description:
    "Hoàn tất đơn hàng của bạn tại ON/OFF — Giao hàng nhanh, đổi trả 30 ngày, thanh toán an toàn.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
