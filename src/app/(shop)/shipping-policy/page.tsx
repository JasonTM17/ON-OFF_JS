import Link from "next/link";

export const metadata = {
  title: "Chính sách vận chuyển",
  description: "Thông tin chi tiết về chính sách giao hàng và vận chuyển của ON/OFF",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Chính sách vận chuyển</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Chính sách vận chuyển
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose-custom space-y-10">
          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Phạm vi giao hàng</h2>
            <p className="text-sm text-muted leading-relaxed">
              ON/OFF giao hàng trên toàn quốc 63 tỉnh thành Việt Nam. Chúng tôi hợp tác với các đơn vị
              vận chuyển uy tín như GHN, GHTK, và J&T Express để đảm bảo đơn hàng đến tay bạn nhanh chóng
              và an toàn.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Thời gian giao hàng</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground">
                    <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Khu vực</th>
                    <th className="text-left py-3 text-xs tracking-[0.1em] uppercase text-muted font-medium">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">Nội thành TP.HCM</td>
                    <td className="py-3">1–2 ngày làm việc</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">Nội thành Hà Nội</td>
                    <td className="py-3">1–2 ngày làm việc</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">Các thành phố lớn khác</td>
                    <td className="py-3">2–3 ngày làm việc</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">Tỉnh thành khác</td>
                    <td className="py-3">3–5 ngày làm việc</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">Vùng sâu, vùng xa</td>
                    <td className="py-3">5–7 ngày làm việc</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-4 italic">
              * Thời gian trên không bao gồm ngày lễ, Tết và Chủ nhật.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Phí vận chuyển</h2>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p><strong className="text-foreground">Miễn phí ship</strong> cho đơn hàng từ 500.000đ</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p>Đơn hàng dưới 500.000đ: phí ship <strong className="text-foreground">30.000đ</strong> (toàn quốc)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p>Giao hàng nhanh (nội thành): phí ship <strong className="text-foreground">15.000₫</strong> (giao trong 2h)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Theo dõi đơn hàng</h2>
            <p className="text-sm text-muted leading-relaxed">
              Sau khi đặt hàng thành công, bạn sẽ nhận được email/SMS xác nhận kèm mã vận đơn.
              Bạn có thể theo dõi trạng thái đơn hàng tại mục{" "}
              <Link href="/account" className="text-foreground underline underline-offset-4 hover:text-muted transition-colors">
                Tài khoản → Đơn hàng
              </Link>{" "}
              hoặc qua chatbot hỗ trợ.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Lưu ý khi nhận hàng</h2>
            <ul className="space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Vui lòng kiểm tra kỹ sản phẩm trước khi ký nhận.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Quay video mở hàng để làm bằng chứng nếu có vấn đề.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Nếu sản phẩm bị hư hỏng do vận chuyển, liên hệ ngay trong vòng 24h.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Shipper sẽ gọi điện trước khi giao — vui lòng giữ điện thoại thông suốt.
              </li>
            </ul>
          </section>

          <section className="bg-card p-6 border border-border">
            <h2 className="font-serif text-lg font-light text-foreground mb-3">Cần hỗ trợ?</h2>
            <p className="text-sm text-muted leading-relaxed">
              Liên hệ đội ngũ chăm sóc khách hàng qua hotline <strong className="text-foreground">1900 272 737</strong> hoặc
              chat trực tiếp trên website. Thời gian hỗ trợ: 8:00 – 22:00 hàng ngày.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
