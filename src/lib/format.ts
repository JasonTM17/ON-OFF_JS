export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return /^(0[3-9])\d{8}$/.test(digits);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatOrderId(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "PENDING": return "text-amber-600 bg-amber-50";
    case "CONFIRMED": return "text-blue-600 bg-blue-50";
    case "SHIPPING": return "text-purple-600 bg-purple-50";
    case "DELIVERED": return "text-green-600 bg-green-50";
    case "CANCELLED": return "text-red-600 bg-red-50";
    default: return "text-muted bg-card";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "PENDING": return "Chờ xác nhận";
    case "CONFIRMED": return "Đã xác nhận";
    case "SHIPPING": return "Đang giao";
    case "DELIVERED": return "Đã giao";
    case "CANCELLED": return "Đã hủy";
    default: return status;
  }
}
