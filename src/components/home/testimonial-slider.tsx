"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl md:text-3xl mb-10">Khách hàng nói gì</h2>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < t.rating ? "text-foreground" : "text-border"}`}>
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-muted leading-relaxed italic max-w-xl mx-auto">
            &ldquo;{t.content}&rdquo;
          </p>
          <p className="text-xs font-medium text-foreground">{t.name}</p>
        </motion.div>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs text-muted">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
