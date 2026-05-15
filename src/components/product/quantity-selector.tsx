"use client";

interface QuantitySelectorProps {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };
  const increment = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decrement}
        disabled={value <= min}
        aria-label="Giảm số lượng"
        className="w-10 h-10 border border-border text-lg hover:border-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span
        className="w-12 h-10 border-t border-b border-border flex items-center justify-center text-sm tabular-nums"
        aria-live="polite"
        aria-label={`Số lượng: ${value}`}
      >
        {value}
      </span>
      <button
        onClick={increment}
        disabled={max !== undefined && value >= max}
        aria-label="Tăng số lượng"
        className="w-10 h-10 border border-border text-lg hover:border-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
