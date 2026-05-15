"use client";

interface Color {
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorSelector({ colors, selected, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          aria-pressed={selected === color.name}
          aria-label={color.name}
          title={color.name}
          className={`w-8 h-8 rounded-full transition-all
            ${
              selected === color.name
                ? "ring-2 ring-offset-2 ring-foreground"
                : "ring-1 ring-border hover:ring-muted"
            }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}
