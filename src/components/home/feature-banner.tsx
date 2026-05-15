"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FeatureBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  cta?: string;
  align?: "left" | "right" | "center";
}

export function FeatureBanner({
  title,
  subtitle,
  image,
  link,
  cta = "Khám phá",
  align = "center",
}: FeatureBannerProps) {
  const alignClasses = {
    left: "items-start text-left pl-8 md:pl-16",
    right: "items-end text-right pr-8 md:pr-16",
    center: "items-center text-center",
  };

  return (
    <motion.div
      className="relative w-full aspect-[16/7] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className={`absolute inset-0 flex flex-col justify-center px-4 ${alignClasses[align]}`}>
        {subtitle && (
          <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-3">{subtitle}</p>
        )}
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white font-light max-w-lg">
          {title}
        </h2>
        <Link
          href={link}
          className="mt-6 inline-block px-8 py-3 border border-white text-white text-sm tracking-wide hover:bg-white hover:text-black transition-colors"
        >
          {cta}
        </Link>
      </div>
    </motion.div>
  );
}
