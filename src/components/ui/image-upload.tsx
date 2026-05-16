"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 6 }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList) => {
    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") && images.length + newImages.length < maxImages) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target?.result as string);
          if (newImages.length === Math.min(files.length, maxImages - images.length)) {
            onChange([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? "border-foreground bg-card" : "border-border"
        }`}
      >
        <Upload size={24} className="mx-auto text-muted mb-3" />
        <p className="text-xs text-muted">Kéo thả ảnh vào đây hoặc</p>
        <label className="mt-2 inline-block px-4 py-2 border border-border text-xs text-muted hover:text-foreground hover:border-foreground transition-colors cursor-pointer">
          Chọn ảnh
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>
        <p className="text-[10px] text-muted/60 mt-2">Tối đa {maxImages} ảnh, mỗi ảnh không quá 5MB</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative aspect-square bg-card border border-border overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-foreground text-background text-[8px]">
                  Chính
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
