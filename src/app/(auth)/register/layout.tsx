import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description:
    "Tạo tài khoản ON/OFF để mua sắm nhanh hơn, theo dõi đơn hàng và nhận ưu đãi thành viên.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
