"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Copy, Check } from "lucide-react";

interface ReferralWidgetProps {
  referralCode: string;
  discount: string;
}

export function ReferralWidget({ referralCode, discount }: ReferralWidgetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = `https://onoff.vn?ref=${referralCode}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-border text-xs text-muted hover:text-foreground hover:border-foreground transition-colors"
      >
        <Gift size={14} />
        Giới thiệu bạn bè
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-background border border-border p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-muted hover:text-foreground"
              >
                <X size={16} />
              </button>

              <div className="text-center">
                <Gift size={32} className="mx-auto text-accent mb-4" />
                <h3 className="font-serif text-lg">Giới thiệu bạn bè</h3>
                <p className="text-xs text-muted mt-2">
                  Chia sẻ mã giới thiệu và cả hai cùng nhận {discount} cho đơn hàng tiếp theo
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-card border border-border font-mono text-sm text-center tracking-wider">
                  {referralCode}
                </div>
                <button
                  onClick={handleCopy}
                  className="w-11 h-11 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 flex items-center justify-center text-xs border border-border hover:bg-card transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 flex items-center justify-center text-xs border border-border hover:bg-card transition-colors"
                >
                  Zalo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
