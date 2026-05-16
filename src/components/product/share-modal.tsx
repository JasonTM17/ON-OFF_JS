"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Facebook, MessageCircle } from "lucide-react";

interface ShareModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function ShareModal({ url, title, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Zalo",
      icon: MessageCircle,
      url: `https://zalo.me/share?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        className="relative bg-background border border-border p-6 w-full max-w-sm"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-sm font-medium mb-4">Chia sẻ sản phẩm</h3>
        <p className="text-xs text-muted mb-6 line-clamp-1">{title}</p>

        <div className="flex gap-3 mb-6">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-10 flex items-center justify-center gap-2 border border-border text-xs hover:border-foreground transition-colors"
            >
              <link.icon size={14} />
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-10 px-3 flex items-center border border-border text-xs text-muted truncate">
            {url}
          </div>
          <button
            onClick={handleCopy}
            className="h-10 px-4 bg-foreground text-background text-xs flex items-center gap-1.5"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Đã sao chép" : "Sao chép"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
