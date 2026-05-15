"use client";

interface AvatarProps {
  name?: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ name, image, size = "md" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  const getInitials = (n?: string) => {
    if (!n) return "?";
    const parts = n.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name || "Avatar"}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-accent/30 flex items-center justify-center font-medium text-foreground`}>
      {getInitials(name)}
    </div>
  );
}
