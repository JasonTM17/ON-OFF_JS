import Link from "next/link";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Liên hệ",
  description: "Liên hệ ON/OFF — Hotline, email, địa chỉ cửa hàng và form liên hệ trực tuyến",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Liên hệ</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Liên hệ
          </h1>
          <p className="text-sm text-muted mt-3">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-xl font-light text-foreground mb-6">Thông tin liên hệ</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Hotline</h3>
                    <p className="text-sm text-muted">1900 xxxx (miễn phí)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-sm text-muted">hello@onoff.vn</p>
                    <p className="text-xs text-muted mt-0.5">Phản hồi trong vòng 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Văn phòng</h3>
                    <p className="text-sm text-muted">123 Nguyễn Huệ, Quận 1</p>
                    <p className="text-sm text-muted">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Giờ làm việc</h3>
                    <p className="text-sm text-muted">Thứ 2 – Thứ 7: 8:00 – 22:00</p>
                    <p className="text-sm text-muted">Chủ nhật: 9:00 – 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={16} className="text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Chat trực tuyến</h3>
                    <p className="text-sm text-muted">Nhấn vào biểu tượng chat ở góc phải màn hình</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store locations */}
            <div>
              <h2 className="font-serif text-xl font-light text-foreground mb-4">Cửa hàng</h2>
              <div className="space-y-4">
                {[
                  { name: "ON/OFF Nguyễn Huệ", addr: "123 Nguyễn Huệ, Q.1, TP.HCM" },
                  { name: "ON/OFF Vincom Đồng Khởi", addr: "Tầng 2, Vincom Center, Q.1, TP.HCM" },
                  { name: "ON/OFF Hoàn Kiếm", addr: "45 Tràng Tiền, Hoàn Kiếm, Hà Nội" },
                  { name: "ON/OFF Aeon Mall", addr: "Tầng 1, Aeon Mall Tân Phú, TP.HCM" },
                ].map((store) => (
                  <div key={store.name} className="p-4 border border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{store.name}</h3>
                    <p className="text-xs text-muted">{store.addr}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-serif text-xl font-light text-foreground mb-6">Gửi tin nhắn</h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
                  Họ tên
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full h-11 px-4 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full h-11 px-4 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full h-11 px-4 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="0912 345 678"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
                  Chủ đề
                </label>
                <select
                  id="subject"
                  className="w-full h-11 px-4 border border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="order">Đơn hàng</option>
                  <option value="product">Sản phẩm</option>
                  <option value="return">Đổi trả</option>
                  <option value="feedback">Góp ý</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.1em] uppercase text-muted mb-2 font-medium">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-foreground text-background text-sm tracking-[0.12em] uppercase hover:bg-muted transition-colors duration-200"
              >
                Gửi tin nhắn
              </button>
              <p className="text-xs text-muted text-center">
                Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
