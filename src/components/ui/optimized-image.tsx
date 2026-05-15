"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { generateBlurDataURL } from "@/lib/image-utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  const blurDataURL = generateBlurDataURL(width ?? 400, height ?? 533);

  return (
    <div className={cn("relative overflow-hidden bg-card", className)}>
      {!loaded && (
        <Skeleton
          variant="card"
          className="absolute inset-0 w-full h-full"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={!width || !height}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
