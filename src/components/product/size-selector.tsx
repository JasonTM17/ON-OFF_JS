"use client";

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
  outOfStock?: string[];
}

export function SizeSelector({
  sizes,
  selected,
  onSelect,
  outOfStock = [],
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isOOS = outOfStock.includes(size);
        const isSelected = selected === size;

        return (
          <button
            key={size}
            onClick={() => !isOOS && onSelect(size)}
            disabled={isOOS}
            aria-pressed={isSelected}
            aria-label={isOOS ? `${size} — hết hàng` : size}
            className={`min-w-[48px] h-10 px-3 border text-sm transition-all
              ${
                isSelected
                  ? "bg-foreground text-background border-foreground"
                  : isOOS
                    ? "border-border text-muted/40 line-through cursor-not-allowed"
                    : "border-border text-foreground hover:border-foreground"
              }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
