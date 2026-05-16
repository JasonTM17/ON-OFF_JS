"use client";

import dynamic from "next/dynamic";

const ProgressBar = dynamic(() => import("@/components/ui/progress-bar").then((m) => m.ProgressBar), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/chat/chat-widget").then((m) => m.ChatWidget), { ssr: false });
const BackToTop = dynamic(() => import("@/components/ui/back-to-top").then((m) => m.BackToTop), { ssr: false });
const ScrollReveal = dynamic(() => import("@/components/ui/scroll-reveal").then((m) => m.ScrollReveal), { ssr: false });
const PromotionPopup = dynamic(() => import("@/components/layout/promotion-popup").then((m) => m.PromotionPopup), { ssr: false });

export function ClientProviders() {
  return (
    <>
      <ProgressBar />
      <ChatWidget />
      <BackToTop />
      <ScrollReveal />
      <PromotionPopup />
    </>
  );
}
