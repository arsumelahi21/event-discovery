import { getEvents } from "@/lib/api";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000"; 
  const events = await getEvents();

  const eventPages = events.map((event: any) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.createdAt).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString(), priority: 1 },
    { url: `${baseUrl}/events`, lastModified: new Date().toISOString(), priority: 1 },
    { url: `${baseUrl}/tickets`, lastModified: new Date().toISOString(), priority: 0.6 },
    ...eventPages,
  ];
}
