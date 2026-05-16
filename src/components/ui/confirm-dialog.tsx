"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-600 hover:bg-amber-700",
    default: "bg-foreground hover:opacity-90",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-background border border-border p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X size={16} />
            </button>

            {variant !== "default" && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                variant === "danger" ? "bg-red-50" : "bg-amber-50"
              }`}>
                <AlertTriangle size={18} className={variant === "danger" ? "text-red-600" : "text-amber-600"} />
              </div>
            )}

            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <p className="text-xs text-muted mt-2 leading-relaxed">{message}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onCancel}
                className="flex-1 h-10 border border-border text-xs text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 h-10 text-white text-xs transition-colors ${variantStyles[variant]}`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
