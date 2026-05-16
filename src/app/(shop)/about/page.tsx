import Link from "next/link";
import { ArrowRight, Leaf, Heart, Award, Recycle } from "lucide-react";

export const metadata = {
  title: "Về ON/OFF",
  description: "Câu chuyện thương hiệu ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
};

const VALUES = [
  {
    icon: Leaf,
    title: "Chất liệu tự nhiên",
    desc: "Sợi tre, cotton hữu cơ và modal — nhẹ nhàng với làn da, thân thiện với môi trường.",
  },
  {
    icon: Heart,
    title: "Thoải mái tối đa",
    desc: "Thiết kế ergonomic, đường may phẳng, co giãn 4 chiều — tự do trong mọi chuyển động.",
  },
  {
    icon: Award,
    title: "Chất lượng bền vững",
    desc: "Chứng nhận Oeko-Tex Standard 100. Kiểm soát chất lượng nghiêm ngặt từ sợi đến thành phẩm.",
  },
  {
    icon: Recycle,
    title: "Phát triển bền vững",
    desc: "Bao bì tái chế, quy trình sản xuất tiết kiệm nước, cam kết giảm dấu chân carbon.",
  },
];

const MILESTONES = [
  { year: "2018", event: "Thành lập thương hiệu tại TP. Hồ Chí Minh" },
  { year: "2019", event: "Ra mắt dòng BASIC — đồ lót nam cơ bản" },
  { year: "2020", event: "Mở rộng sang đồ lót nữ và đồ mặc nhà" },
  { year: "2021", event: "Đạt chứng nhận Oeko-Tex Standard 100" },
  { year: "2022", event: "Khai trương 10 cửa hàng trên toàn quốc" },
  { year: "2023", event: "Ra mắt dòng LOUNGE — đồ mặc nhà cao cấp" },
  { year: "2024", event: "Xuất khẩu sang thị trường Đông Nam Á" },
  { year: "2025", event: "Đạt 1 triệu khách hàng thân thiết" },
  { year: "2026", event: "Ra mắt bộ sưu tập bền vững 100% sợi tái chế" },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://2885966831.e.cdneverest.net/Simiconnector/BannerSlider/d/e/desktop_2.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/65" />
        <div className="relative max-w-4xl mx-auto px-6 py-32 md:py-44 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
            Câu chuyện thương hiệu
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-background leading-tight mb-6">
            Thoải mái là<br />
            <span className="italic text-accent">sang trọng</span>
          </h1>
          <p className="text-background/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            ON/OFF ra đời từ niềm tin rằng mỗi ngày đều xứng đáng được bắt đầu với sự thoải mái
            — từ lớp vải đầu tiên chạm vào da.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">Triết lý</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 leading-snug">
                Đơn giản.<br />
                Tinh tế.<br />
                <span className="italic text-muted">Bền vững.</span>
              </h2>
              <div className="space-y-4 text-sm text-muted leading-relaxed">
                <p>
                  Chúng tôi không chạy theo xu hướng. ON/OFF tập trung vào những gì thực sự quan trọng:
                  chất liệu tốt nhất, form dáng hoàn hảo, và sự thoải mái không thỏa hiệp.
                </p>
                <p>
                  Mỗi sản phẩm được phát triển qua hàng trăm lần thử nghiệm — từ độ co giãn của sợi vải,
                  đến vị trí từng đường may — để đảm bảo bạn quên đi rằng mình đang mặc chúng.
                </p>
                <p>
                  Từ phòng ngủ đến phòng khách, từ sáng sớm đến tối muộn — ON/OFF đồng hành cùng bạn
                  trong mọi khoảnh khắc riêng tư nhất.
                </p>
              </div>
            </div>
            <div className="relative aspect-[2/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://2885966831.e.cdneverest.net/catalog/category/nu-all_1.webp"
                alt="ON/OFF collection"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-12 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Giá trị cốt lõi</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              Điều chúng tôi<br />
              <span className="italic text-muted">theo đuổi</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <v.icon size={22} className="text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold tracking-wide text-foreground mb-2">{v.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">Hành trình</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              Từ ý tưởng đến<br />
              <span className="italic text-muted">thương hiệu quốc gia</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background -translate-x-1 md:-translate-x-[5px] mt-1.5" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted">{m.year}</span>
                    <p className="text-sm text-foreground mt-1">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 px-6 lg:px-12 bg-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "1M+", label: "Khách hàng" },
              { num: "50+", label: "Cửa hàng" },
              { num: "500+", label: "Mẫu thiết kế" },
              { num: "5", label: "Quốc gia" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl md:text-4xl font-light text-background mb-2">{stat.num}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-background/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
            Trải nghiệm sự khác biệt
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-10">
            Khám phá bộ sưu tập đồ lót và đồ mặc nhà cao cấp — được thiết kế cho sự thoải mái tối đa.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-10 h-12 bg-foreground text-background text-xs tracking-[0.15em] uppercase hover:bg-muted transition-colors duration-300"
          >
            Khám phá ngay
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
