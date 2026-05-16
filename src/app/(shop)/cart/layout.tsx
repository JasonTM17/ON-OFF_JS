import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description:
    "Xem và quản lý giỏ hàng của bạn tại ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam.",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
