import { MetadataRoute } from "next";
import { countries } from "./data/countries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://travels.nicolasvazquez.com.ar";

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  // Country-specific routes
  const countryRoutes = countries.map((country) => ({
    url: `${baseUrl}/?country=${country.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...countryRoutes];
}
