"use client";

import { useState, useEffect } from "react";
import { Bell, X, Package, Tag, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "order" | "promo" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Đơn hàng đang giao",
    message: "Đơn #A1B2C3D4 đang trên đường đến bạn",
    time: "2 giờ trước",
    read: false,
  },
  {
    id: "2",
    type: "promo",
    title: "Flash Sale cuối tuần",
    message: "Giảm 20% tất cả đồ mặc nhà — chỉ 2 ngày",
    time: "5 giờ trước",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "Chào mừng bạn mới!",
    message: "Dùng mã WELCOME10 để giảm 10% đơn đầu tiên",
    time: "1 ngày trước",
    read: true,
  },
];

const ICONS = {
  order: Package,
  promo: Tag,
  system: Megaphone,
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(MOCK_NOTIFICATIONS);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full text-muted hover:text-foreground hover:bg-accent/20 transition-colors duration-200 relative"
        aria-label="Thông báo"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 bg-background border border-border shadow-lg z-50"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-medium text-foreground">Thông báo</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] tracking-wide text-muted hover:text-foreground transition-colors"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted text-center py-8">Không có thông báo</p>
                ) : (
                  notifications.map((n) => {
                    const Icon = ICONS[n.type];
                    return (
                      <div
                        key={n.id}
                        className={`flex gap-3 px-4 py-3 border-b border-border last:border-b-0 ${
                          !n.read ? "bg-accent/5" : ""
                        }`}
                      >
                        <div className="shrink-0 w-8 h-8 rounded-full bg-card flex items-center justify-center">
                          <Icon size={14} className="text-muted" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">{n.title}</p>
                          <p className="text-[11px] text-muted mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-muted/60 mt-1">{n.time}</p>
                        </div>
                        <button
                          onClick={() => removeNotification(n.id)}
                          className="shrink-0 p-1 text-muted/40 hover:text-muted transition-colors"
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
