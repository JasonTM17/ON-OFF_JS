interface ProductBadgeProps {
  isNew?: boolean;
  isBestseller?: boolean;
  salePercent?: number;
}

export function ProductBadge({ isNew, isBestseller, salePercent }: ProductBadgeProps) {
  const badges: { label: string; className: string }[] = [];

  if (salePercent && salePercent > 0) {
    badges.push({
      label: `-${salePercent}%`,
      className: "bg-red-600 text-white",
    });
  }
  if (isNew) {
    badges.push({
      label: "Mới",
      className: "bg-foreground text-background",
    });
  }
  if (isBestseller) {
    badges.push({
      label: "Bán chạy",
      className: "bg-accent text-background",
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
