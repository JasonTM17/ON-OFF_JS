"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

const STORES: StoreLocation[] = [
  {
    id: "1",
    name: "ON/OFF Nguyễn Trãi",
    address: "123 Nguyễn Trãi, Quận 1, TP.HCM",
    phone: "028 1234 5678",
    hours: "09:00 - 22:00",
    lat: 10.7626,
    lng: 106.6822,
  },
  {
    id: "2",
    name: "ON/OFF Lê Văn Sỹ",
    address: "456 Lê Văn Sỹ, Quận 3, TP.HCM",
    phone: "028 2345 6789",
    hours: "09:00 - 22:00",
    lat: 10.7856,
    lng: 106.6714,
  },
  {
    id: "3",
    name: "ON/OFF Cầu Giấy",
    address: "789 Cầu Giấy, Hà Nội",
    phone: "024 3456 7890",
    hours: "09:00 - 21:30",
    lat: 21.0365,
    lng: 105.7982,
  },
  {
    id: "4",
    name: "ON/OFF Đà Nẵng",
    address: "321 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    phone: "0236 456 7890",
    hours: "09:00 - 21:30",
    lat: 16.0544,
    lng: 108.2022,
  },
];

export function StoreLocator() {
  const [selected, setSelected] = useState<string>(STORES[0].id);
  const activeStore = STORES.find((s) => s.id === selected)!;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        {STORES.map((store) => (
          <motion.button
            key={store.id}
            onClick={() => setSelected(store.id)}
            className={`w-full text-left p-4 border transition-colors ${
              store.id === selected
                ? "border-foreground bg-card"
                : "border-border hover:border-foreground/50"
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-sm font-medium text-foreground">{store.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted flex items-center gap-2">
                <MapPin size={12} /> {store.address}
              </p>
              <p className="text-xs text-muted flex items-center gap-2">
                <Phone size={12} /> {store.phone}
              </p>
              <p className="text-xs text-muted flex items-center gap-2">
                <Clock size={12} /> {store.hours}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="bg-card border border-border aspect-square flex flex-col items-center justify-center p-8 text-center">
        <Navigation size={32} className="text-muted mb-4" />
        <h3 className="text-sm font-medium">{activeStore.name}</h3>
        <p className="text-xs text-muted mt-2">{activeStore.address}</p>
        <a
          href={`https://www.google.com/maps?q=${activeStore.lat},${activeStore.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-6 py-2 border border-foreground text-xs tracking-wide hover:bg-foreground hover:text-background transition-colors"
        >
          Chỉ đường
        </a>
      </div>
    </div>
  );
}
