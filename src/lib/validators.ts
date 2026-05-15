import { z } from "zod";
import { PAYMENT_METHODS } from "./constants";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    phone: z
      .string()
      .regex(/^(0[3-9])\d{8}$/, "Số điện thoại không hợp lệ")
      .optional(),
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Address ─────────────────────────────────────────────────────────────────

export const addressSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^(0[3-9])\d{8}$/, "Số điện thoại không hợp lệ"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  street: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
});

export type AddressInput = z.infer<typeof addressSchema>;

// ─── Order ───────────────────────────────────────────────────────────────────

const orderItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
});

const paymentMethodValues = PAYMENT_METHODS.map((m) => m.value) as [
  string,
  ...string[],
];

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Giỏ hàng không được trống"),
  addressId: z.string().min(1, "Vui lòng chọn địa chỉ giao hàng"),
  paymentMethod: z.enum(paymentMethodValues, {
    errorMap: () => ({ message: "Phương thức thanh toán không hợp lệ" }),
  }),
  couponCode: z.string().optional(),
  note: z.string().max(500, "Ghi chú không được vượt quá 500 ký tự").optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

// ─── Product search ──────────────────────────────────────────────────────────

export const productSearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "UNISEX"]).optional(),
  sort: z
    .enum(["newest", "price_asc", "price_desc", "best_selling"])
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ProductSearchInput = z.infer<typeof productSearchSchema>;
