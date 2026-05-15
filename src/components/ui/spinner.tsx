import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border",
  md: "w-6 h-6 border-2",
  lg: "w-9 h-9 border-2",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Đang tải"
      className={cn(
        "inline-block rounded-full border-foreground/20 border-t-foreground animate-spin",
        sizeMap[size],
        className
      )}
    />
  );
}
