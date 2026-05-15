"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, X } from "lucide-react";

const SIZE_DATA = {
  tops: {
    label: "Áo",
    headers: ["Size", "Ngực (cm)", "Vai (cm)", "Dài (cm)"],
    rows: [
      ["S", "86-90", "38-40", "66-68"],
      ["M", "90-94", "40-42", "68-70"],
      ["L", "94-98", "42-44", "70-72"],
      ["XL", "98-102", "44-46", "72-74"],
    ],
  },
  bottoms: {
    label: "Quần",
    headers: ["Size", "Eo (cm)", "Hông (cm)", "Dài (cm)"],
    rows: [
      ["S", "66-70", "88-92", "96-98"],
      ["M", "70-74", "92-96", "98-100"],
      ["L", "74-78", "96-100", "100-102"],
      ["XL", "78-82", "100-104", "102-104"],
    ],
  },
};

export function SizeGuideModal() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"tops" | "bottoms">("tops");
  const data = SIZE_DATA[tab];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
      >
        <Ruler size={14} />
        <span>Hướng dẫn chọn size</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto bg-background border border-border p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-medium tracking-wide">HƯỚNG DẪN CHỌN SIZE</h3>
                <button onClick={() => setOpen(false)}>
                  <X size={18} className="text-muted hover:text-foreground" />
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                {(Object.keys(SIZE_DATA) as Array<keyof typeof SIZE_DATA>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`px-4 py-2 text-xs transition-colors ${
                      tab === key
                        ? "bg-foreground text-background"
                        : "border border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {SIZE_DATA[key].label}
                  </button>
                ))}
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    {data.headers.map((h) => (
                      <th key={h} className="py-2 px-3 text-left font-medium text-muted">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-border last:border-0">
                      {row.map((cell, i) => (
                        <td key={i} className={`py-2.5 px-3 ${i === 0 ? "font-medium" : "text-muted"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 text-xs text-muted">
                * Đo cơ thể ở trạng thái thoải mái, không mặc quần áo dày.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
