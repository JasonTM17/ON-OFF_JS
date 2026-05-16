export const SITE_NAME = "ON/OFF";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://onoff.vn";

export const FREE_SHIPPING_THRESHOLD = 500_000; // VND
export const MAX_CART_QUANTITY = 10;
export const PAGINATION_LIMIT = 20;

export const ORDER_STATUSES = {
  PENDING: {
    label: "Chờ xác nhận",
    color: "text-amber-600 bg-amber-50",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    color: "text-blue-600 bg-blue-50",
  },
  SHIPPING: {
    label: "Đang giao",
    color: "text-purple-600 bg-purple-50",
  },
  DELIVERED: {
    label: "Đã giao",
    color: "text-green-600 bg-green-50",
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "text-red-600 bg-red-50",
  },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;

export const PAYMENT_METHODS = [
  { value: "COD", label: "Thanh toán khi nhận hàng (COD)" },
  { value: "BANK_TRANSFER", label: "Chuyển khoản ngân hàng" },
  { value: "MOMO", label: "Ví MoMo" },
  { value: "VNPAY", label: "VNPay" },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]["value"];

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/onoff.vn",
  instagram: "https://instagram.com/onoff.vn",
  tiktok: "https://tiktok.com/@onoff.vn",
} as const;
