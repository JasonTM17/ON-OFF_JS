"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface MobileFilterProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (groupId: string, values: string[]) => void;
  onClear: () => void;
  totalResults?: number;
}

export function MobileFilter({ groups, selected, onChange, onClear, totalResults }: MobileFilterProps) {
  const [open, setOpen] = useState(false);
  const totalSelected = Object.values(selected).flat().length;

  const toggleValue = (groupId: string, value: string) => {
    const current = selected[groupId] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange(groupId, next);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 h-9 border border-border text-xs tracking-wide text-muted hover:text-foreground hover:border-foreground transition-colors md:hidden"
      >
        <SlidersHorizontal size={14} />
        <span>Bộ lọc</span>
        {totalSelected > 0 && (
          <span className="w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center">
            {totalSelected}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border max-h-[80vh] overflow-y-auto md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
                <h3 className="text-sm font-medium tracking-wide">BỘ LỌC</h3>
                <button onClick={() => setOpen(false)}>
                  <X size={18} className="text-muted" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {groups.map((group) => (
                  <div key={group.id}>
                    <h4 className="text-xs font-medium tracking-wide text-muted mb-3">
                      {group.label.toUpperCase()}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => {
                        const isSelected = (selected[group.id] || []).includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            onClick={() => toggleValue(group.id, opt.value)}
                            className={`px-3 py-1.5 text-xs border transition-colors ${
                              isSelected
                                ? "border-foreground bg-foreground text-background"
                                : "border-border text-muted hover:border-foreground hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                            {opt.count !== undefined && (
                              <span className="ml-1 opacity-60">({opt.count})</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-3">
                <button
                  onClick={onClear}
                  className="flex-1 h-11 border border-border text-sm text-muted hover:text-foreground transition-colors"
                >
                  Xóa bộ lọc
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 h-11 bg-foreground text-background text-sm"
                >
                  Xem {totalResults !== undefined ? `${totalResults} sản phẩm` : "kết quả"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
