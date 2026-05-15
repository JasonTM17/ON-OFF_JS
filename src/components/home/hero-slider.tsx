"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=85&auto=format&fit=crop",
    eyebrow: "Bộ sưu tập 2024",
    heading: ["Thoải mái", "là sang trọng"],
    sub: "Đồ lót & đồ mặc nhà cao cấp. Chất liệu tự nhiên, thiết kế tối giản.",
    cta: { label: "Khám phá ngay", href: "/products" },
    align: "left" as const,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&q=85&auto=format&fit=crop",
    eyebrow: "BASIC Collection",
    heading: ["Đơn giản", "tinh tế"],
    sub: "Những thiết kế cơ bản không bao giờ lỗi thời — dành cho mọi ngày.",
    cta: { label: "Xem BASIC", href: "/products?brand=basic" },
    align: "center" as const,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=85&auto=format&fit=crop",
    eyebrow: "LOUNGE Collection",
    heading: ["Thư giãn", "theo phong cách"],
    sub: "Đồ mặc nhà sang trọng — từ sáng sớm đến tối muộn.",
    cta: { label: "Xem LOUNGE", href: "/products?brand=lounge" },
    align: "right" as const,
  },
];

const TRANSITION = { duration: 0.9, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] };

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent((next + SLIDES.length) % SLIDES.length);
    },
    []
  );

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(current + 1, 1), 6000);
    return () => clearInterval(id);
  }, [current, paused, go]);

  const slide = SLIDES[current];
  const alignClass =
    slide.align === "center"
      ? "items-center text-center"
      : slide.align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  return (
    <section
      className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="absolute inset-0"
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-foreground/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className={`relative h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24 ${alignClass}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-xl ${slide.align === "center" ? "mx-auto" : slide.align === "right" ? "ml-auto" : ""}`}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 flex items-center gap-3">
              {slide.align !== "right" && <span className="inline-block w-8 h-px bg-accent" />}
              {slide.eyebrow}
              {slide.align === "right" && <span className="inline-block w-8 h-px bg-accent" />}
            </p>

            <h1 className="font-serif font-light leading-[1.05] mb-6">
              <span className="block text-[clamp(2.8rem,6vw,5rem)] text-background tracking-tight">
                {slide.heading[0]}
              </span>
              <span className="block text-[clamp(2.8rem,6vw,5rem)] text-accent tracking-tight italic">
                {slide.heading[1]}
              </span>
            </h1>

            <p className="text-background/70 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
              {slide.sub}
            </p>

            <Link
              href={slide.cta.href}
              className="inline-flex items-center gap-3 px-8 h-12 bg-background text-foreground text-xs tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-300"
            >
              {slide.cta.label}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-px overflow-hidden"
              style={{ width: i === current ? 40 : 20 }}
            >
              <span className="absolute inset-0 bg-background/30" />
              {i === current && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-background"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: paused ? 0 : 6, ease: "linear" }}
                  key={`prog-${slide.id}-${paused}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-background/30 text-background hover:bg-background/10 transition-colors duration-200"
        aria-label="Slide trước"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-background/30 text-background hover:bg-background/10 transition-colors duration-200"
        aria-label="Slide tiếp"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 md:right-16 text-background/50 text-xs tracking-[0.2em] font-light">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}
