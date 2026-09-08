import type { MetadataRoute } from "next";
import { cars } from "@/content/cars";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/cars`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/book`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...cars.map((car) => ({
      url: `${siteConfig.url}/cars/${car.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
