"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

interface AddressCardProps {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  isDefault: boolean;
  onSetDefault?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function AddressCard({
  id,
  fullName,
  phone,
  address,
  isDefault,
  onSetDefault,
  onDelete,
  onEdit,
}: AddressCardProps) {
  return (
    <motion.div
      className={`border p-4 transition-colors ${
        isDefault ? "border-foreground" : "border-border hover:border-foreground/30"
      }`}
      whileHover={{ y: -1 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{fullName}</span>
            {isDefault && (
              <span className="px-2 py-0.5 text-[9px] bg-foreground text-background tracking-wide">
                MẶC ĐỊNH
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-1 flex items-center gap-1.5">
            <Phone size={10} />
            {phone}
          </p>
          <p className="text-xs text-muted mt-1 flex items-start gap-1.5">
            <MapPin size={10} className="shrink-0 mt-0.5" />
            {address}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
        {onEdit && (
          <button
            onClick={() => onEdit(id)}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Chỉnh sửa
          </button>
        )}
        {!isDefault && onSetDefault && (
          <button
            onClick={() => onSetDefault(id)}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Đặt mặc định
          </button>
        )}
        {!isDefault && onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            Xóa
          </button>
        )}
      </div>
    </motion.div>
  );
}
