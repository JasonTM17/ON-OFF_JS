"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Imperative API (callable from Zustand stores, utils, etc.) ────────────────
let _imperativeToast: ((t: Omit<Toast, "id">) => void) | null = null;

/** Call from anywhere — Zustand stores, server actions, utilities. */
export function toast(t: Omit<Toast, "id">) {
  _imperativeToast?.(t);
}

// ─── Types ─────────────────────────────────────────────────────────────────────
export type ToastVariant = "default" | "success" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // ms, default 4000
}

interface ToastContextType {
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

// ─── Context ───────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  dismiss: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

// ─── Icon map ──────────────────────────────────────────────────────────────────
const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle size={15} className="shrink-0 text-emerald-400" />,
  error:   <AlertCircle size={15} className="shrink-0 text-red-400" />,
  info:    <Info        size={15} className="shrink-0 text-blue-400" />,
  default: null,
};

// ─── Single toast item ─────────────────────────────────────────────────────────
function ToastItem({ t, onDismiss }: { t: Toast; onDismiss: (id: string) => void }) {
  const duration = t.duration ?? 4000;

  // Auto-dismiss per toast
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(t.id), duration);
    return () => clearTimeout(timer);
  }, [t.id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0,  scale: 1    }}
      exit={{    opacity: 0, x: 40, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.32, 0, 0.67, 0] }}
      className={cn(
        "relative flex items-start gap-3 px-4 py-3.5 shadow-lg min-w-[260px] max-w-sm",
        "border border-border/60",
        t.variant === "error"   ? "bg-foreground text-background" :
        t.variant === "success" ? "bg-foreground text-background" :
        t.variant === "info"    ? "bg-foreground text-background" :
        "bg-foreground text-background"
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      {t.variant && ICONS[t.variant] && (
        <span className="mt-0.5">{ICONS[t.variant]}</span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug">{t.title}</p>
        {t.description && (
          <p className="text-xs opacity-70 mt-0.5 leading-relaxed">{t.description}</p>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(t.id)}
        className="shrink-0 p-0.5 opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Đóng thông báo"
      >
        <X size={13} />
      </button>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-background/30"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

// ─── Provider ──────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  // Register imperative handler so toast() works outside React
  useEffect(() => {
    _imperativeToast = addToast;
    return () => { _imperativeToast = null; };
  }, [addToast]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast, dismiss }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"
        aria-label="Thông báo"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem t={t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// ─── Toaster (used in layout) ─────────────────────────────────────────────────
export function Toaster() {
  return null; // ToastProvider wraps the app; this is a no-op placeholder
}
