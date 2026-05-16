import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toaster";
import { PromoBar } from "@/components/layout/promo-bar";
import { ClientProviders } from "@/components/layout/client-providers";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://onoff.vn"),
  title: {
    template: "%s | ON/OFF",
    default: "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
  },
  description:
    "Đồ lót & đồ mặc nhà cao cấp Việt Nam — Chất liệu tự nhiên, thiết kế tối giản",
  keywords: [
    "đồ lót cao cấp",
    "đồ mặc nhà",
    "underwear Việt Nam",
    "loungewear",
    "ON/OFF",
    "chất liệu tự nhiên",
  ],
  openGraph: {
    siteName: "ON/OFF",
    locale: "vi_VN",
    type: "website",
    title: "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
    description:
      "Đồ lót & đồ mặc nhà cao cấp Việt Nam — Chất liệu tự nhiên, thiết kế tối giản",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam",
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
        <ToastProvider>
          <PromoBar />
          <Header />
          <main className="flex-1 page-enter">{children}</main>
          <Footer />
          <ClientProviders />
        </ToastProvider>
      </body>
    </html>
  );
}
