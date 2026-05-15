"use client";

import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email của bạn"
        className="flex-1 h-11 px-4 bg-transparent border border-background/30 text-sm placeholder:text-background/40 focus:outline-none focus:border-background"
      />
      <Button className="bg-background text-foreground hover:bg-background/90">Đăng ký</Button>
    </form>
  );
}
