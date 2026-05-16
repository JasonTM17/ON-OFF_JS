import Link from "next/link";

export const metadata = {
  title: "Câu hỏi thường gặp",
  description: "Giải đáp các thắc mắc phổ biến về sản phẩm, đặt hàng, giao hàng và đổi trả tại ON/OFF",
};

const FAQ_SECTIONS = [
  {
    title: "Đặt hàng & Thanh toán",
    items: [
      {
        q: "Tôi có thể đặt hàng mà không cần tạo tài khoản không?",
        a: "Có, bạn có thể đặt hàng với tư cách khách. Tuy nhiên, tạo tài khoản giúp bạn theo dõi đơn hàng, tích điểm và nhận ưu đãi độc quyền.",
      },
      {
        q: "ON/OFF chấp nhận những phương thức thanh toán nào?",
        a: "Chúng tôi chấp nhận: COD (thanh toán khi nhận hàng), chuyển khoản ngân hàng, ví MoMo, ZaloPay, VNPay, và thẻ Visa/Mastercard.",
      },
      {
        q: "Tôi có thể hủy đơn hàng không?",
        a: "Bạn có thể hủy đơn hàng miễn phí trước khi đơn được giao cho đơn vị vận chuyển. Sau đó, vui lòng liên hệ CSKH để được hỗ trợ.",
      },
      {
        q: "Mã giảm giá có thể dùng chung với khuyến mãi khác không?",
        a: "Mỗi đơn hàng chỉ áp dụng được 1 mã giảm giá. Mã giảm giá không áp dụng chung với các chương trình khuyến mãi đang diễn ra.",
      },
    ],
  },
  {
    title: "Sản phẩm & Size",
    items: [
      {
        q: "Làm sao để chọn đúng size?",
        a: "Tham khảo bảng size chi tiết tại trang Hướng dẫn chọn size. Nếu bạn ở giữa 2 size, nên chọn size lớn hơn. Bạn cũng có thể nhắn tin cho chatbot để được tư vấn.",
      },
      {
        q: "Chất liệu sản phẩm ON/OFF có an toàn không?",
        a: "Tất cả sản phẩm ON/OFF đều đạt chứng nhận Oeko-Tex Standard 100 — đảm bảo không chứa chất gây hại cho da và sức khỏe.",
      },
      {
        q: "Sản phẩm có bị co rút sau khi giặt không?",
        a: "Sản phẩm ON/OFF được xử lý chống co rút trước khi may. Tuy nhiên, nên giặt ở nhiệt độ dưới 40°C và không sấy khô ở nhiệt độ cao.",
      },
      {
        q: "Tôi có thể đổi size miễn phí không?",
        a: "Có, mỗi đơn hàng được đổi size miễn phí 1 lần trong vòng 30 ngày, với điều kiện sản phẩm còn nguyên tem nhãn.",
      },
    ],
  },
  {
    title: "Giao hàng",
    items: [
      {
        q: "Thời gian giao hàng là bao lâu?",
        a: "Nội thành TP.HCM và Hà Nội: 1–2 ngày. Tỉnh thành khác: 3–5 ngày làm việc. Không tính ngày lễ và Chủ nhật.",
      },
      {
        q: "Phí ship bao nhiêu?",
        a: "Miễn phí ship cho đơn từ 500.000₫. Đơn dưới 500.000₫ phí ship 30.000₫ toàn quốc.",
      },
      {
        q: "Tôi có thể theo dõi đơn hàng ở đâu?",
        a: "Đăng nhập tài khoản → Đơn hàng để xem trạng thái. Hoặc dùng mã vận đơn trong email xác nhận để tra cứu trên website đơn vị vận chuyển.",
      },
    ],
  },
  {
    title: "Đổi trả & Hoàn tiền",
    items: [
      {
        q: "Chính sách đổi trả như thế nào?",
        a: "Đổi trả trong 30 ngày, sản phẩm còn nguyên tem nhãn, chưa qua sử dụng. Chi tiết tại trang Chính sách đổi trả.",
      },
      {
        q: "Bao lâu thì tôi nhận được tiền hoàn?",
        a: "Chuyển khoản: 3–5 ngày. Ví điện tử: 1–3 ngày. Thẻ tín dụng: 7–14 ngày tùy ngân hàng.",
      },
      {
        q: "Ai chịu phí ship khi đổi trả?",
        a: "ON/OFF chịu toàn bộ phí ship đổi trả nếu lỗi từ phía chúng tôi (sai sản phẩm, lỗi sản xuất). Đổi size theo ý muốn: miễn phí 1 lần.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Câu hỏi thường gặp</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Câu hỏi thường gặp
          </h1>
          <p className="text-sm text-muted mt-3">
            Tìm câu trả lời nhanh cho các thắc mắc phổ biến. Nếu không tìm thấy, hãy liên hệ đội ngũ hỗ trợ.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {FAQ_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-serif text-xl font-light text-foreground mb-6 pb-2 border-b border-border">
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.q}>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="bg-card p-6 border border-border text-center">
          <h2 className="font-serif text-lg font-light text-foreground mb-2">Không tìm thấy câu trả lời?</h2>
          <p className="text-sm text-muted mb-4">
            Đội ngũ CSKH sẵn sàng hỗ trợ bạn 8:00 – 22:00 hàng ngày.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 border border-border text-xs tracking-wide text-muted">
              Hotline: 1900 272 737
            </span>
            <span className="px-4 py-2 border border-border text-xs tracking-wide text-muted">
              Email: hello@onoff.vn
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
