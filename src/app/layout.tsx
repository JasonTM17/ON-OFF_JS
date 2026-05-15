import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ChatWidget } from "@/components/chat/chat-widget";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "ONFIT - Premium Underwear & Loungewear",
  description: "Đồ lót và đồ mặc nhà cao cấp cho nam và nữ. Chất liệu thoáng mát, thiết kế tối giản.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
        <Toaster />
        <ChatWidget />
        <ScrollReveal />
      </body>
    </html>
  );
}
