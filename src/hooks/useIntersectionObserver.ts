"use client";

import { useEffect, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

interface UseIntersectionObserverResult {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult {
  const { threshold = 0, rootMargin = "0px", root = null } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setIsIntersecting(observerEntry.isIntersecting);
        setEntry(observerEntry);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, root]);

  return { isIntersecting, entry };
}
