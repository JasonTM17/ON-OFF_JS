import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const FOOTER_LINKS = {
  "Sản phẩm": [
    { label: "Đồ lót nam", href: "/products?category=do-lot-nam" },
    { label: "Đồ lót nữ", href: "/products?category=do-lot-nu" },
    { label: "Đồ mặc nhà", href: "/products?category=do-mac-nha" },
    { label: "Phụ kiện", href: "/products?category=phu-kien" },
    { label: "Sale", href: "/products?sort=price-asc" },
  ],
  "Hỗ trợ": [
    { label: "Hướng dẫn chọn size", href: "/size-guide" },
    { label: "Chính sách đổi trả", href: "#" },
    { label: "Chính sách vận chuyển", href: "#" },
    { label: "Câu hỏi thường gặp", href: "#" },
    { label: "Liên hệ", href: "#" },
  ],
  "Về ONFIT": [
    { label: "Câu chuyện thương hiệu", href: "/about" },
    { label: "Chất liệu", href: "#" },
    { label: "Phát triển bền vững", href: "#" },
    { label: "Tuyển dụng", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-wider text-background font-semibold inline-block mb-5">
              ONFIT
            </Link>
            <p className="text-sm leading-relaxed text-background/50 max-w-xs mb-6">
              Đồ lót & đồ mặc nhà cao cấp. Thiết kế tối giản, chất liệu thoáng mát, thoải mái mỗi ngày.
            </p>
            <div className="space-y-2.5 text-sm text-background/50">
              <div className="flex items-center gap-2">
                <Phone size={14} strokeWidth={1.5} />
                <span>1900 xxxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} strokeWidth={1.5} />
                <span>hello@onfit.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
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
            &copy; 2026 ONFIT. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-background/30">
            <Link href="#" className="hover:text-background/60 transition-colors">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-background/60 transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-background/60 transition-colors">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
