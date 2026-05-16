import Link from "next/link";

export const metadata = {
  title: "Chính sách đổi trả",
  description: "Chính sách đổi trả hàng 30 ngày của ON/OFF — Đổi trả dễ dàng, hoàn tiền nhanh chóng",
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Chính sách đổi trả</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Chính sách đổi trả
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Thời gian đổi trả</h2>
            <p className="text-sm text-muted leading-relaxed">
              ON/OFF chấp nhận đổi trả trong vòng <strong className="text-foreground">30 ngày</strong> kể từ ngày
              bạn nhận được sản phẩm. Sau thời gian này, chúng tôi không thể xử lý yêu cầu đổi trả.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Điều kiện đổi trả</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Được chấp nhận</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Sản phẩm còn nguyên tem, nhãn mác
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Chưa qua sử dụng, giặt ủi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Còn nguyên bao bì, hộp đựng
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    Có hóa đơn mua hàng
                  </li>
                </ul>
              </div>
              <div className="p-5 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Không chấp nhận</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Sản phẩm đã qua sử dụng
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Hư hỏng do người dùng
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Sản phẩm sale trên 50%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    Quà tặng kèm, phụ kiện miễn phí
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Lý do đổi trả</h2>
            <ul className="space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Sản phẩm bị lỗi sản xuất (rách, bung chỉ, phai màu bất thường)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Giao sai sản phẩm, sai size, sai màu so với đơn hàng
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Sản phẩm không đúng mô tả trên website
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                Đổi size (miễn phí 1 lần cho mỗi đơn hàng)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Quy trình đổi trả</h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "Liên hệ", desc: "Nhắn tin qua chat hoặc gọi hotline 1900 272 737 để yêu cầu đổi trả." },
                { step: "02", title: "Xác nhận", desc: "Đội ngũ CSKH xác nhận yêu cầu và hướng dẫn gửi hàng trong vòng 24h." },
                { step: "03", title: "Gửi hàng", desc: "Đóng gói sản phẩm cẩn thận và gửi về địa chỉ kho ON/OFF (miễn phí ship đổi trả)." },
                { step: "04", title: "Xử lý", desc: "Kiểm tra sản phẩm và xử lý đổi/hoàn tiền trong 3–5 ngày làm việc." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <span className="font-serif text-2xl font-light text-accent/60 leading-none mt-0.5">{item.step}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-light text-foreground mb-4">Hoàn tiền</h2>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>Sau khi yêu cầu đổi trả được chấp nhận:</p>
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p><strong className="text-foreground">Chuyển khoản:</strong> hoàn tiền trong 3–5 ngày làm việc</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p><strong className="text-foreground">Ví điện tử:</strong> hoàn tiền trong 1–3 ngày làm việc</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p><strong className="text-foreground">Thẻ tín dụng:</strong> hoàn tiền trong 7–14 ngày làm việc (tùy ngân hàng)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <p><strong className="text-foreground">COD:</strong> hoàn tiền qua chuyển khoản trong 3–5 ngày làm việc</p>
              </div>
            </div>
          </section>

          <section className="bg-card p-6 border border-border">
            <h2 className="font-serif text-lg font-light text-foreground mb-3">Cam kết của ON/OFF</h2>
            <p className="text-sm text-muted leading-relaxed">
              Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu. Nếu bạn không hài lòng với
              sản phẩm vì bất kỳ lý do gì, hãy liên hệ ngay — chúng tôi sẽ tìm giải pháp tốt nhất cho bạn.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
