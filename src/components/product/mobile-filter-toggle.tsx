"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export function MobileFilterToggle({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden flex items-center gap-2 text-sm border border-[#E8E0D8] px-4 py-2.5 text-[#7A5C45] hover:border-[#1F1F1F] hover:text-[#1F1F1F] transition-colors mb-6"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Bộ lọc"
      >
        {open ? <X size={15} /> : <SlidersHorizontal size={15} />}
        <span>{open ? "Đóng bộ lọc" : "Bộ lọc & Sắp xếp"}</span>
      </button>

      {/* Filter content: always visible on desktop, toggled on mobile */}
      <div className={`${open ? "block" : "hidden"} lg:block`}>
        {children}
      </div>
    </>
  );
}
