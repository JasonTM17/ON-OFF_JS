"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, X, Trash2 } from "lucide-react";
import { useCompareStore } from "@/store/compare";

export function CompareDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeFromCompare, clearCompare } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 bg-foreground text-background flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
      >
        <ArrowLeftRight size={18} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-background text-[10px] flex items-center justify-center rounded-full">
          {items.length}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-3xl bg-background border-t border-border p-6 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium tracking-wide">
                SO SÁNH SẢN PHẨM ({items.length}/4)
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  Xóa tất cả
                </button>
                <button onClick={() => setOpen(false)}>
                  <X size={18} className="text-muted hover:text-foreground" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {items.map((item) => (
                <div key={item.id} className="relative border border-border p-2">
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="absolute top-1 right-1 p-1 text-muted hover:text-foreground"
                  >
                    <Trash2 size={12} />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <p className="text-xs mt-2 line-clamp-1">{item.name}</p>
                </div>
              ))}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border border-dashed border-border flex items-center justify-center aspect-[3/4]"
                >
                  <span className="text-xs text-muted">Thêm sản phẩm</span>
                </div>
              ))}
            </div>

            {items.length >= 2 && (
              <Link
                href={`/compare?ids=${items.map((i) => i.id).join(",")}`}
                onClick={() => setOpen(false)}
                className="mt-4 block w-full text-center py-3 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                So sánh ngay
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
