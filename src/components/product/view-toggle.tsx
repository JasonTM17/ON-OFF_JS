"use client";

import { useState } from "react";
import { Grid3X3, List } from "lucide-react";

interface ViewToggleProps {
  defaultView?: "grid" | "list";
  onChange?: (view: "grid" | "list") => void;
}

export function ViewToggle({ defaultView = "grid", onChange }: ViewToggleProps) {
  const [view, setView] = useState(defaultView);

  const handleChange = (v: "grid" | "list") => {
    setView(v);
    onChange?.(v);
  };

  return (
    <div className="flex border border-border">
      <button
        onClick={() => handleChange("grid")}
        className={`w-9 h-9 flex items-center justify-center transition-colors ${
          view === "grid" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
        }`}
        aria-label="Xem dạng lưới"
      >
        <Grid3X3 size={14} />
      </button>
      <button
        onClick={() => handleChange("list")}
        className={`w-9 h-9 flex items-center justify-center border-l border-border transition-colors ${
          view === "list" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
        }`}
        aria-label="Xem dạng danh sách"
      >
        <List size={14} />
      </button>
    </div>
  );
}
