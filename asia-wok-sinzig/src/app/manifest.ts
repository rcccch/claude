import type { MetadataRoute } from "next";
import { basePath } from "@/lib/data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asia Wok Sinzig",
    short_name: "Asia Wok",
    start_url: `${basePath}/`,
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#f3c841",
    icons: [
      { src: `${basePath}/logo/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${basePath}/logo/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
