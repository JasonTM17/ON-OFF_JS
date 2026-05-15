import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "promo" | "system";
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: "1",
      title: "Chào mừng bạn đến ON/OFF",
      message: "Nhận ngay ưu đãi 10% cho đơn hàng đầu tiên",
      type: "promo",
      read: false,
      createdAt: new Date().toISOString(),
      link: "/products",
    },
  ],
  unreadCount: 1,
  addNotification: (n) =>
    set((state) => {
      const notification: Notification = {
        ...n,
        id: Date.now().toString(36),
        read: false,
        createdAt: new Date().toISOString(),
      };
      return {
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => {
      const notifications = state.notifications.filter((n) => n.id !== id);
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
