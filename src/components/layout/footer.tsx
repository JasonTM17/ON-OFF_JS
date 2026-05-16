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
  { label: "Instagram", href: "https://instagram.com/onoff.vn", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 10a2 2 0 110-4 2 2 0 010 4zm4.5-6a.5.5 0 110-1 .5.5 0 010 1z" },
  { label: "TikTok", href: "https://tiktok.com/@onoff.vn", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .55.04.81.1v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.7a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 003.76.92V6.87a4.85 4.85 0 01-.01-.18z" },
];

const PAYMENT_METHODS = ["VISA", "MasterCard", "Momo", "ZaloPay", "COD"];

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
          <div className="flex items-center gap-4">
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className="text-[10px] tracking-wide text-background/40 border border-background/15 px-2 py-0.5 rounded">
                {m}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 text-xs text-background/30">
            <Link href="/terms" className="hover:text-background/60 transition-colors">Điều khoản</Link>
            <Link href="/privacy-policy" className="hover:text-background/60 transition-colors">Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
