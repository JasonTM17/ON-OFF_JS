"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function LazyImage({ src, alt, className = "", aspectRatio = "3/4" }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-card flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <ImageIcon size={24} className="text-muted/40" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-card ${className}`} style={{ aspectRatio }}>
      {!loaded && (
        <div className="absolute inset-0 bg-card animate-pulse" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
