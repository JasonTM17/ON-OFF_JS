import Link from "next/link";

export const metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản và điều kiện sử dụng website ONFIT",
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Điều khoản sử dụng</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Điều khoản sử dụng
          </h1>
          <p className="text-xs text-muted mt-3">Cập nhật lần cuối: 01/01/2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">1. Giới thiệu</h2>
          <p className="text-sm text-muted leading-relaxed">
            Chào mừng bạn đến với ONFIT. Bằng việc truy cập và sử dụng website onfit.vn, bạn đồng ý
            tuân thủ các điều khoản và điều kiện dưới đây. Nếu không đồng ý, vui lòng không sử dụng
            dịch vụ của chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">2. Tài khoản người dùng</h2>
          <ul className="space-y-2.5 text-sm text-muted leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Bạn phải từ 16 tuổi trở lên để tạo tài khoản.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Thông tin đăng ký phải chính xác và đầy đủ.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Bạn chịu trách nhiệm bảo mật tài khoản và mật khẩu.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Mỗi người chỉ được tạo 1 tài khoản.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">3. Đặt hàng và thanh toán</h2>
          <ul className="space-y-2.5 text-sm text-muted leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Giá sản phẩm có thể thay đổi mà không cần thông báo trước.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Đơn hàng chỉ được xác nhận sau khi thanh toán thành công hoặc xác nhận COD.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              ONFIT có quyền từ chối đơn hàng nếu phát hiện gian lận.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Mã giảm giá có thời hạn và điều kiện áp dụng riêng.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">4. Sở hữu trí tuệ</h2>
          <p className="text-sm text-muted leading-relaxed">
            Tất cả nội dung trên website (hình ảnh, văn bản, logo, thiết kế) thuộc quyền sở hữu
            của ONFIT Vietnam. Nghiêm cấm sao chép, phân phối hoặc sử dụng cho mục đích thương mại
            mà không có sự đồng ý bằng văn bản.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">5. Giới hạn trách nhiệm</h2>
          <ul className="space-y-2.5 text-sm text-muted leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              ONFIT không chịu trách nhiệm cho thiệt hại gián tiếp phát sinh từ việc sử dụng website.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Chúng tôi nỗ lực đảm bảo thông tin chính xác nhưng không cam kết website không có lỗi.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Màu sắc sản phẩm có thể khác biệt nhẹ so với hình ảnh do cài đặt màn hình.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">6. Hành vi bị cấm</h2>
          <ul className="space-y-2.5 text-sm text-muted leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Sử dụng bot, scraper hoặc công cụ tự động để truy cập website.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Cố gắng truy cập trái phép vào hệ thống.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Đăng nội dung vi phạm pháp luật hoặc quyền của người khác.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Lạm dụng chương trình khuyến mãi hoặc mã giảm giá.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">7. Thay đổi điều khoản</h2>
          <p className="text-sm text-muted leading-relaxed">
            ONFIT có quyền cập nhật điều khoản sử dụng bất kỳ lúc nào. Thay đổi sẽ có hiệu lực
            ngay khi được đăng tải. Việc tiếp tục sử dụng website sau khi thay đổi đồng nghĩa với
            việc bạn chấp nhận điều khoản mới.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-light text-foreground mb-4">8. Luật áp dụng</h2>
          <p className="text-sm text-muted leading-relaxed">
            Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp sẽ được giải
            quyết tại Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh.
          </p>
        </section>

        <section className="bg-card p-6 border border-border">
          <p className="text-sm text-muted leading-relaxed">
            Nếu có câu hỏi về điều khoản sử dụng, vui lòng liên hệ{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-muted transition-colors">
              đội ngũ hỗ trợ
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
