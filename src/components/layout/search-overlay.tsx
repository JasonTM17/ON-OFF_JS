"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, TrendingUp, Clock } from "lucide-react";

const TRENDING_SEARCHES = [
  "Áo thun nam",
  "Quần lót nữ",
  "Đồ mặc nhà",
  "Áo lót cotton",
  "Quần boxer",
];

const RECENT_SEARCHES_KEY = "onoff-recent-searches";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    window.location.href = `/products?q=${encodeURIComponent(term)}`;
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(query); }}
          className="flex items-center gap-3 border-b border-border pb-4"
        >
          <Search size={18} className="text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            autoFocus
            className="flex-1 text-lg bg-transparent outline-none placeholder:text-muted/50"
          />
          <button type="button" onClick={onClose} className="text-muted hover:text-foreground">
            <X size={18} />
          </button>
        </form>

        <div className="mt-8 space-y-8">
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-medium tracking-wide text-muted flex items-center gap-2">
                  <Clock size={12} />
                  TÌM KIẾM GẦN ĐÂY
                </h3>
                <button onClick={clearRecent} className="text-[10px] text-muted hover:text-foreground">
                  Xóa tất cả
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 text-xs border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs font-medium tracking-wide text-muted flex items-center gap-2 mb-3">
              <TrendingUp size={12} />
              TÌM KIẾM PHỔ BIẾN
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-1.5 text-xs border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
