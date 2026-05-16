import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ON/OFF",
    short_name: "ON/OFF",
    description: "Đồ lót & đồ mặc nhà cao cấp — Chất liệu tự nhiên, thiết kế tối giản",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#1A1A1A",
    background_color: "#FAF8F5",
    categories: ["shopping", "lifestyle"],
    lang: "vi",
    icons: [
      {
        src: "/icons/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    screenshots: [],
  };
}
