"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-200"
      aria-label={theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
