import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ONFIT",
    short_name: "ONFIT",
    description: "Thời trang ON/OFF — phong cách sống hiện đại",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#1A1A1A",
    background_color: "#FAF8F5",
    categories: ["shopping", "lifestyle"],
    lang: "vi",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [],
  };
}
