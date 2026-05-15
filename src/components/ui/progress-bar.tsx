"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function ProgressBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const prevPathname = useRef(pathname);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start progress on internal link click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Same-page navigation — skip
      if (href === pathname) return;

      if (hideRef.current) clearTimeout(hideRef.current);
      if (tickRef.current) clearInterval(tickRef.current);

      setWidth(15);
      setVisible(true);

      // Slowly advance toward 85% while waiting for the route to resolve
      tickRef.current = setInterval(() => {
        setWidth((w) => {
          if (w >= 85) {
            if (tickRef.current) clearInterval(tickRef.current);
            return 85;
          }
          // Decelerate as it approaches 85
          return w + (85 - w) * 0.08;
        });
      }, 200);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // Complete and hide when pathname changes (navigation done)
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    if (tickRef.current) clearInterval(tickRef.current);

    setWidth(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 350);

    return () => {
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed top-0 left-0 z-[9999] h-[2px] bg-foreground pointer-events-none"
          initial={{ width: "0%" }}
          animate={{ width: `${width}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
