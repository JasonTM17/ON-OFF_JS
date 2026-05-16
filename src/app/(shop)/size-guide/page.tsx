import Link from "next/link";

export const metadata = {
  title: "Hướng dẫn chọn size",
  description: "Bảng size ON/OFF — Hướng dẫn đo và chọn size đồ lót, đồ mặc nhà phù hợp nhất",
};

const MEN_SIZES = [
  { size: "S", height: "155–160", weight: "45–52", waist: "68–72", hip: "84–88" },
  { size: "M", height: "160–165", weight: "52–60", waist: "73–77", hip: "89–93" },
  { size: "L", height: "165–170", weight: "60–68", waist: "78–82", hip: "94–98" },
  { size: "XL", height: "170–175", weight: "68–75", waist: "83–87", hip: "99–103" },
  { size: "XXL", height: "175–180", weight: "75–85", waist: "88–92", hip: "104–108" },
];

const WOMEN_SIZES = [
  { size: "XS", height: "150–155", weight: "40–45", bust: "76–80", waist: "58–62", hip: "82–86" },
  { size: "S", height: "155–160", weight: "45–50", bust: "81–84", waist: "63–66", hip: "87–90" },
  { size: "M", height: "160–165", weight: "50–57", bust: "85–88", waist: "67–70", hip: "91–94" },
  { size: "L", height: "165–170", weight: "57–65", bust: "89–92", waist: "71–74", hip: "95–98" },
  { size: "XL", height: "170–175", weight: "65–72", bust: "93–96", waist: "75–78", hip: "99–102" },
];

const BRA_SIZES = [
  { band: "32 / 70", underbust: "68–72" },
  { band: "34 / 75", underbust: "73–77" },
  { band: "36 / 80", underbust: "78–82" },
  { band: "38 / 85", underbust: "83–87" },
  { band: "40 / 90", underbust: "88–92" },
];

export default function SizeGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <nav className="text-xs text-muted mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">Hướng dẫn chọn size</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Hướng dẫn chọn size
          </h1>
          <p className="text-sm text-muted mt-3 max-w-lg">
            Tìm size phù hợp nhất với bạn. Đo cơ thể vào buổi sáng để có kết quả chính xác nhất.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* How to measure */}
        <section>
          <h2 className="font-serif text-2xl font-light text-foreground mb-6">Cách đo</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: "Vòng ngực", desc: "Đo vòng quanh phần đầy nhất của ngực, giữ thước dây ngang." },
              { label: "Vòng eo", desc: "Đo vòng quanh phần nhỏ nhất của eo, thường trên rốn 2–3cm." },
              { label: "Vòng hông", desc: "Đo vòng quanh phần đầy nhất của hông và mông." },
              { label: "Vòng dưới ngực", desc: "Đo vòng quanh lồng ngực, ngay dưới ngực (dành cho bra)." },
            ].map((item) => (
              <div key={item.label} className="p-5 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.label}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Men's sizes */}
        <section>
          <h2 className="font-serif text-2xl font-light text-foreground mb-2">Bảng size Nam</h2>
          <p className="text-xs text-muted mb-6">Đơn vị: cm / kg</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground">
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Size</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Chiều cao</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Cân nặng</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Vòng eo</th>
                  <th className="text-left py-3 text-xs tracking-[0.1em] uppercase text-muted font-medium">Vòng hông</th>
                </tr>
              </thead>
              <tbody>
                {MEN_SIZES.map((row) => (
                  <tr key={row.size} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium text-foreground">{row.size}</td>
                    <td className="py-3 pr-4 text-muted">{row.height}cm</td>
                    <td className="py-3 pr-4 text-muted">{row.weight}kg</td>
                    <td className="py-3 pr-4 text-muted">{row.waist}cm</td>
                    <td className="py-3 text-muted">{row.hip}cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Women's sizes */}
        <section>
          <h2 className="font-serif text-2xl font-light text-foreground mb-2">Bảng size Nữ</h2>
          <p className="text-xs text-muted mb-6">Đơn vị: cm / kg</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground">
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Size</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Chiều cao</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Cân nặng</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Vòng ngực</th>
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Vòng eo</th>
                  <th className="text-left py-3 text-xs tracking-[0.1em] uppercase text-muted font-medium">Vòng hông</th>
                </tr>
              </thead>
              <tbody>
                {WOMEN_SIZES.map((row) => (
                  <tr key={row.size} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium text-foreground">{row.size}</td>
                    <td className="py-3 pr-4 text-muted">{row.height}cm</td>
                    <td className="py-3 pr-4 text-muted">{row.weight}kg</td>
                    <td className="py-3 pr-4 text-muted">{row.bust}cm</td>
                    <td className="py-3 pr-4 text-muted">{row.waist}cm</td>
                    <td className="py-3 text-muted">{row.hip}cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bra sizes */}
        <section>
          <h2 className="font-serif text-2xl font-light text-foreground mb-2">Bảng size Bra</h2>
          <p className="text-xs text-muted mb-6">Đo vòng dưới ngực (cm)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm max-w-md">
              <thead>
                <tr className="border-b border-foreground">
                  <th className="text-left py-3 pr-4 text-xs tracking-[0.1em] uppercase text-muted font-medium">Size</th>
                  <th className="text-left py-3 text-xs tracking-[0.1em] uppercase text-muted font-medium">Vòng dưới ngực</th>
                </tr>
              </thead>
              <tbody>
                {BRA_SIZES.map((row) => (
                  <tr key={row.band} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium text-foreground">{row.band}</td>
                    <td className="py-3 text-muted">{row.underbust}cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-card p-8 border border-border">
          <h2 className="font-serif text-xl font-light text-foreground mb-4">Mẹo chọn size</h2>
          <ul className="space-y-2.5 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Nếu bạn ở giữa 2 size, hãy chọn size lớn hơn để thoải mái hơn.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Đo vào buổi sáng khi cơ thể chưa bị ảnh hưởng bởi hoạt động trong ngày.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Sử dụng thước dây mềm, không kéo quá chặt hoặc quá lỏng.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground mt-0.5">•</span>
              Nếu không chắc chắn, hãy liên hệ đội ngũ tư vấn qua chat hoặc hotline.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted mb-4">Vẫn chưa chắc chắn về size?</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 h-11 bg-foreground text-background text-xs tracking-[0.12em] uppercase hover:bg-muted transition-colors duration-200"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
