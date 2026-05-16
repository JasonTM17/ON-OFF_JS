"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Package, Tag, Info } from "lucide-react";
import { useNotificationStore } from "@/store/notification";

const ICON_MAP = {
  order: Package,
  promo: Tag,
  system: Info,
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } =
    useNotificationStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-muted hover:text-foreground transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-background text-[9px] flex items-center justify-center rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 bg-background border border-border shadow-lg z-50"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-xs font-medium tracking-wide">THÔNG BÁO</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] text-muted hover:text-foreground"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-6 text-center text-xs text-muted">Không có thông báo</p>
                ) : (
                  notifications.map((n) => {
                    const Icon = ICON_MAP[n.type];
                    return (
                      <div
                        key={n.id}
                        className={`flex gap-3 px-4 py-3 border-b border-border last:border-0 ${
                          !n.read ? "bg-card/50" : ""
                        }`}
                        onClick={() => markAsRead(n.id)}
                      >
                        <Icon size={14} className="shrink-0 mt-0.5 text-muted" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">{n.title}</p>
                          <p className="text-[11px] text-muted mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                          className="shrink-0 text-muted hover:text-foreground"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
