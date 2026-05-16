import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "Đăng nhập vào tài khoản ON/OFF để theo dõi đơn hàng và nhận ưu đãi độc quyền.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
