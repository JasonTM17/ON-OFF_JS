"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";

interface AdminSearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onExport?: () => void;
  showExport?: boolean;
}

export function AdminSearchBar({
  placeholder = "Tìm kiếm...",
  onSearch,
  onExport,
  showExport = false,
}: AdminSearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === "") onSearch("");
          }}
          placeholder={placeholder}
          className="w-full h-9 pl-9 pr-4 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
      </div>
      {showExport && onExport && (
        <button
          type="button"
          onClick={onExport}
          className="h-9 px-4 border border-border text-xs text-muted hover:text-foreground hover:border-foreground transition-colors flex items-center gap-2"
        >
          <Download size={12} />
          Xuất CSV
        </button>
      )}
    </form>
  );
}
