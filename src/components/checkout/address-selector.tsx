"use client";

import { useState } from "react";
import { MapPin, Plus, Check, Trash2 } from "lucide-react";

interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selected: string | null;
  onSelect: (id: string) => void;
  onAddNew?: () => void;
}

export function AddressSelector({ addresses, selected, onSelect, onAddNew }: AddressSelectorProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-border">
        <MapPin size={24} className="mx-auto text-muted mb-3" />
        <p className="text-sm text-muted mb-3">Chưa có địa chỉ nào</p>
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-foreground text-xs tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <Plus size={12} />
            Thêm địa chỉ
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((addr) => (
        <button
          key={addr.id}
          onClick={() => onSelect(addr.id)}
          className={`w-full text-left p-4 border transition-colors ${
            selected === addr.id
              ? "border-foreground bg-card"
              : "border-border hover:border-foreground/50"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">{addr.fullName}</span>
                <span className="text-xs text-muted">|</span>
                <span className="text-xs text-muted">{addr.phone}</span>
                {addr.isDefault && (
                  <span className="px-1.5 py-0.5 text-[9px] tracking-wide border border-foreground text-foreground uppercase">
                    Mặc định
                  </span>
                )}
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {addr.street}, {addr.ward}, {addr.district}, {addr.province}
              </p>
            </div>
            {selected === addr.id && (
              <Check size={16} className="text-foreground shrink-0 mt-1" />
            )}
          </div>
        </button>
      ))}

      {onAddNew && (
        <button
          onClick={onAddNew}
          className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-border text-xs text-muted hover:text-foreground hover:border-foreground transition-colors"
        >
          <Plus size={14} />
          Thêm địa chỉ mới
        </button>
      )}
    </div>
  );
}
