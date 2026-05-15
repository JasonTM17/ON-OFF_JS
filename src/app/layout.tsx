import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ChatWidget } from "@/components/chat/chat-widget";
import { BackToTop } from "@/components/ui/back-to-top";
import { PromoBar } from "@/components/layout/promo-bar";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL("https://onfit.vn"),
  title: {
    template: "%s | ONFIT",
    default: "ONFIT — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
  },
  description:
    "Đồ lót & đồ mặc nhà cao cấp Việt Nam — Chất liệu tự nhiên, thiết kế tối giản",
  keywords: [
    "đồ lót cao cấp",
    "đồ mặc nhà",
    "underwear Việt Nam",
    "loungewear",
    "ONFIT",
    "chất liệu tự nhiên",
  ],
  openGraph: {
    siteName: "ONFIT",
    locale: "vi_VN",
    type: "website",
    title: "ONFIT — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
    description:
      "Đồ lót & đồ mặc nhà cao cấp Việt Nam — Chất liệu tự nhiên, thiết kế tối giản",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ONFIT — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONFIT — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
    description:
      "Đồ lót & đồ mặc nhà cao cấp Việt Nam — Chất liệu tự nhiên, thiết kế tối giản",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <PromoBar />
        <Header />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
        <Toaster />
        <ChatWidget />
        <BackToTop />
        <ScrollReveal />
      </body>
    </html>
  );
}
