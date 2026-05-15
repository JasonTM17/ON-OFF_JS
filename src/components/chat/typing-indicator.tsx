"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-zinc-100 rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
