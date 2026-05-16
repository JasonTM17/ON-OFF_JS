"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AddressFormData {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
}

interface AddressFormProps {
  initialData?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function AddressForm({ initialData, onSubmit, onCancel, loading = false }: AddressFormProps) {
  const [form, setForm] = useState<AddressFormData>({
    fullName: initialData?.fullName || "",
    phone: initialData?.phone || "",
    province: initialData?.province || "",
    district: initialData?.district || "",
    ward: initialData?.ward || "",
    street: initialData?.street || "",
    isDefault: initialData?.isDefault || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const update = (key: keyof AddressFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted mb-1.5 block">Họ và tên *</label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="w-full h-10 px-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted mb-1.5 block">Số điện thoại *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full h-10 px-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted mb-1.5 block">Tỉnh/Thành phố *</label>
          <input
            type="text"
            required
            value={form.province}
            onChange={(e) => update("province", e.target.value)}
            className="w-full h-10 px-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted mb-1.5 block">Quận/Huyện *</label>
          <input
            type="text"
            required
            value={form.district}
            onChange={(e) => update("district", e.target.value)}
            className="w-full h-10 px-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted mb-1.5 block">Phường/Xã</label>
          <input
            type="text"
            value={form.ward}
            onChange={(e) => update("ward", e.target.value)}
            className="w-full h-10 px-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted mb-1.5 block">Địa chỉ cụ thể *</label>
        <input
          type="text"
          required
          placeholder="Số nhà, tên đường..."
          value={form.street}
          onChange={(e) => update("street", e.target.value)}
          className="w-full h-10 px-3 border border-border bg-transparent text-sm placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => update("isDefault", e.target.checked)}
          className="w-4 h-4 accent-foreground"
        />
        <span className="text-xs text-muted">Đặt làm địa chỉ mặc định</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 h-10 border border-border text-sm text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 h-10 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu địa chỉ"}
        </button>
      </div>
    </motion.form>
  );
}
