"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  cta?: string;
  link: string;
}

interface HeroBannerProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export function HeroBanner({ slides, autoPlay = true, interval = 5000 }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useState(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  });

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className="relative w-full aspect-[16/7] md:aspect-[16/6] overflow-hidden bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {slide.subtitle && (
          <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-80">{slide.subtitle}</p>
        )}
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light max-w-3xl">
          {slide.title}
        </h2>
        {slide.cta && (
          <Link
            href={slide.link}
            className="mt-6 px-8 py-3 border border-white text-sm tracking-wide hover:bg-white hover:text-black transition-colors"
          >
            {slide.cta}
          </Link>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-8 h-0.5 transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
