"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  selected: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ options, selected, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === selected) || options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 h-9 border border-border text-xs tracking-wide text-muted hover:text-foreground hover:border-foreground transition-colors"
      >
        <span>Sắp xếp: <span className="text-foreground">{current.label}</span></span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-background border border-border shadow-sm z-40 min-w-[160px]">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                  opt.value === selected
                    ? "text-foreground font-medium bg-card"
                    : "text-muted hover:text-foreground hover:bg-card"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
