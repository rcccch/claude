import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://studio-fluss.example", changeFrequency: "monthly", priority: 1 }];
}
