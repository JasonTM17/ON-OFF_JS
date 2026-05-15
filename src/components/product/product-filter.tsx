"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface ProductFilterProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (groupId: string, values: string[]) => void;
  onClear: () => void;
}

export function ProductFilter({ groups, selected, onChange, onClear }: ProductFilterProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalActive = Object.values(selected).flat().length;

  const toggleValue = (groupId: string, value: string) => {
    const current = selected[groupId] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange(groupId, updated);
  };

  const filterContent = (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.id}>
          <h4 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3 font-medium">
            {group.label}
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const isActive = (selected[group.id] || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleValue(group.id, opt.value)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {totalActive > 0 && (
        <button
          onClick={onClear}
          className="text-xs text-muted hover:text-foreground transition-colors underline underline-offset-4"
        >
          Xóa tất cả bộ lọc ({totalActive})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">{filterContent}</div>

      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-border text-sm text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          <Filter size={14} />
          Bộ lọc
          {totalActive > 0 && (
            <span className="w-5 h-5 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
              {totalActive}
            </span>
          )}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border max-h-[70vh] overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-background">
                  <h3 className="text-sm font-medium text-foreground">Bộ lọc</h3>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 text-muted hover:text-foreground transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="px-6 py-5">{filterContent}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
