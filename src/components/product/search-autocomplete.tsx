"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(value.trim())}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || data);
          setOpen(true);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full h-10 pl-9 pr-10 border border-border bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
        {loading && (
          <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-1 bg-background border border-border shadow-lg z-50 max-h-80 overflow-y-auto"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-card transition-colors"
              >
                {product.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt=""
                    className="w-10 h-12 object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-1">{product.name}</p>
                  <p className="text-xs text-muted">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
            <Link
              href={`/products?q=${encodeURIComponent(query)}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-center text-xs text-muted hover:text-foreground border-t border-border transition-colors"
            >
              Xem tất cả kết quả
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
