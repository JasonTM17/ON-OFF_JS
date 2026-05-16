"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <motion.div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 flex items-center gap-2 text-xs shadow-lg ${
        isOnline
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {isOnline ? (
        <>
          <Wifi size={14} />
          <span>Đã kết nối lại</span>
        </>
      ) : (
        <>
          <WifiOff size={14} />
          <span>Mất kết nối mạng</span>
        </>
      )}
    </motion.div>
  );
}
