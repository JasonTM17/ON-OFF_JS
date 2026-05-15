"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";

interface PromoCodeBannerProps {
  code: string;
  description: string;
  expiresAt?: string;
}

export function PromoCodeBanner({ code, description, expiresAt }: PromoCodeBannerProps) {
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="bg-card border border-border p-4 flex items-center gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Tag size={16} className="text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">{description}</p>
            {expiresAt && (
              <p className="text-xs text-muted mt-0.5">Hết hạn: {expiresAt}</p>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 px-4 py-1.5 border border-dashed border-foreground text-xs font-mono tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            {copied ? "Đã sao chép!" : code}
          </button>
          <button onClick={() => setVisible(false)} className="shrink-0 text-muted hover:text-foreground">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
