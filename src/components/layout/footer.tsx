import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const FOOTER_LINKS = {
  "Sản phẩm": [
    { label: "Đồ lót nam", href: "/products?category=do-lot-nam" },
    { label: "Đồ lót nữ", href: "/products?category=do-lot-nu" },
    { label: "Đồ mặc nhà", href: "/products?category=do-mac-nha" },
    { label: "Phụ kiện", href: "/products?category=phu-kien" },
    { label: "Sale", href: "/sale" },
  ],
  "Hỗ trợ": [
    { label: "Hướng dẫn chọn size", href: "/size-guide" },
    { label: "Chính sách đổi trả", href: "/return-policy" },
    { label: "Chính sách vận chuyển", href: "/shipping-policy" },
    { label: "Câu hỏi thường gặp", href: "/faq" },
    { label: "Liên hệ", href: "/contact" },
  ],
  "Về ON/OFF": [
    { label: "Câu chuyện thương hiệu", href: "/about" },
    { label: "Chất liệu", href: "/about" },
    { label: "Phát triển bền vững", href: "/about" },
    { label: "Hệ thống cửa hàng", href: "/contact" },
  ],
};

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/onoff.vn", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  {
    label: "Instagram",
    href: "https://instagram.com/onoff.vn",
    // Outer rounded rect + inner circle + top-right dot
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  { label: "TikTok", href: "https://tiktok.com/@onoff.vn", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .55.04.81.1v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.7a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 003.76.92V6.87a4.85 4.85 0 01-.01-.18z" },
];

const PAYMENT_METHODS = [
  { label: "VISA", path: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 0v4h16V6H4zm3 8h2v2H7v-2zm4 0h2v2h-2v-2z" },
  { label: "MC", path: "M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 1.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" },
  { label: "Momo", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" },
  { label: "ZaloPay", path: "M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 0v12h14V6H5zm2 2h10v2H7V8zm0 4h6v2H7v-2z" },
  { label: "COD", path: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      {/* Newsletter section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl text-background mb-1">Đăng ký nhận ưu đãi</h3>
            <p className="text-sm text-background/50">Nhận ngay voucher 10% cho đơn hàng đầu tiên</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-wider text-background font-semibold inline-block mb-5">
              ON/OFF
            </Link>
            <p className="text-sm leading-relaxed text-background/50 max-w-xs mb-6">
              Đồ lót & đồ mặc nhà cao cấp. Thiết kế tối giản, chất liệu thoáng mát, thoải mái mỗi ngày.
            </p>
            <div className="space-y-2.5 text-sm text-background/50">
              <div className="flex items-center gap-2">
                <Phone size={14} strokeWidth={1.5} />
                <span>1900 272 737</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} strokeWidth={1.5} />
                <span>hello@onoff.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border border-background/20 rounded-full text-background/50 hover:text-background hover:border-background/50 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* App download QR */}
            <div className="mt-8">
              <h4 className="text-[11px] tracking-[0.15em] uppercase text-background/30 mb-4 font-medium">Tải ứng dụng</h4>
              <div className="w-24 h-24 border border-border flex items-center justify-center text-background/30 text-xs">
                QR
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] tracking-[0.15em] uppercase text-background/30 mb-5 font-medium">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30">
            &copy; 2026 ON/OFF. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m.label}
                className="flex items-center justify-center w-10 h-7 border border-background/15 text-background/50"
                title={m.label}
                aria-label={m.label}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={m.path} />
                </svg>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-wide uppercase border border-background/20 text-background/40 px-2 py-1 leading-tight">
              Đã đăng ký Bộ Công Thương
            </span>
            <div className="flex items-center gap-6 text-xs text-background/30">
              <Link href="/terms" className="hover:text-background/60 transition-colors">Điều khoản</Link>
              <Link href="/privacy-policy" className="hover:text-background/60 transition-colors">Bảo mật</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
