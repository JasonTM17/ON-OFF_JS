"use client";

import { useState } from "react";
import { Share2, Facebook, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonProps {
  url?: string;
  title?: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || "ON/OFF";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareTitle, url: shareUrl });
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="p-2 border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
        aria-label="Chia sẻ"
      >
        <Share2 size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-background border border-border shadow-sm p-2 flex gap-1 z-10">
          <button
            onClick={handleFacebook}
            className="p-2 text-muted hover:text-blue-600 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Sao chép link"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <LinkIcon size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
