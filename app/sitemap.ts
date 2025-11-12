import { getEvents } from "@/lib/api";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = new URL("http://localhost:3000"); 
  const events = await getEvents();

  const locales = ["en", "ar"];

  const localizedPages = locales.flatMap(locale => [
    { url: `${baseUrl}/${locale}`, priority: 1 },
    { url: `${baseUrl}/${locale}/events`, priority: 0.9 },
    { url: `${baseUrl}/${locale}/tickets`, priority: 0.6 },
  ]);

  const eventPages = events.flatMap((event: any) =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/events/${event.slug}`,
      lastModified: new Date(event.createdAt).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString(), priority: 1 },
    ...localizedPages,
    ...eventPages,
  ];
}
