import Link from "next/link";

export const metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật thông tin cá nhân của ON/OFF — Cam kết bảo vệ dữ liệu khách hàng",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Chính sách bảo mật</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Chính sách bảo mật
          </h1>
          <p className="text-xs text-muted mt-3">Cập nhật lần cuối: 01/01/2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">1. Thu thập thông tin</h2>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>Chúng tôi thu thập thông tin khi bạn:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Đăng ký tài khoản (họ tên, email, số điện thoại)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Đặt hàng (địa chỉ giao hàng, thông tin thanh toán)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Liên hệ hỗ trợ (nội dung tin nhắn, lịch sử chat)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Truy cập website (cookie, địa chỉ IP, thiết bị sử dụng)
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">2. Mục đích sử dụng</h2>
          <div className="space-y-2 text-sm text-muted leading-relaxed">
            <p>Thông tin của bạn được sử dụng để:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Xử lý đơn hàng và giao hàng
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Cung cấp dịch vụ chăm sóc khách hàng
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Gửi thông tin khuyến mãi (nếu bạn đồng ý)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Cải thiện trải nghiệm mua sắm
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Phân tích và thống kê (ẩn danh)
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">3. Bảo mật thông tin</h2>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>
              Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Mã hóa SSL 256-bit cho mọi giao dịch
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Không lưu trữ thông tin thẻ tín dụng
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Mật khẩu được mã hóa một chiều (bcrypt)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Giới hạn quyền truy cập dữ liệu nội bộ
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">4. Chia sẻ thông tin</h2>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>Chúng tôi <strong className="text-foreground">không bán</strong> thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Đơn vị vận chuyển (để giao hàng)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Cổng thanh toán (để xử lý giao dịch)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Cơ quan pháp luật (khi có yêu cầu hợp pháp)
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">5. Cookie</h2>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>Website sử dụng cookie để:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Duy trì phiên đăng nhập
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Lưu giỏ hàng và danh sách yêu thích
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Phân tích lưu lượng truy cập (Google Analytics)
              </li>
            </ul>
            <p>Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng một số tính năng có thể bị ảnh hưởng.</p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">6. Quyền của bạn</h2>
          <div className="space-y-2 text-sm text-muted leading-relaxed">
            <p>Bạn có quyền:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Truy cập và xem thông tin cá nhân đã cung cấp
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Yêu cầu chỉnh sửa thông tin không chính xác
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Yêu cầu xóa tài khoản và dữ liệu liên quan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Hủy đăng ký nhận email marketing bất kỳ lúc nào
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">7. Liên hệ</h2>
          <p className="text-sm text-muted leading-relaxed">
            Nếu có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ:
          </p>
          <div className="mt-4 p-5 border border-border space-y-2 text-sm text-muted">
            <p><strong className="text-foreground">ON/OFF Vietnam</strong></p>
            <p>Email: privacy@onoff.vn</p>
            <p>Hotline: 1900 xxxx</p>
            <p>Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
          </div>
        </section>
      </div>
    </div>
  );
}
