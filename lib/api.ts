import { Event } from "@/lib/types";
import data from "@/data/events.json";

const events: Event[] = data as Event[];

/**
 * Simulate API call to fetch all events
 */
export async function getEvents(): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 300)); // simulate delay
  return events;
}

/**
 * Fetch single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const all = await getEvents();
  return all.find((event) => event.slug === slug) || null;
}

/**
 * Search and filter events
 */
export async function searchEvents(query?: string, category?: string): Promise<Event[]> {
  const all = await getEvents();
  return all.filter((event) => {
    const matchesQuery =
      !query ||
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.location.city.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || event.category === category;
    return matchesQuery && matchesCategory;
  });
}

/**
 * Paginated events (added)
 */
export async function getPaginatedEvents(
  page: number = 1,
  limit: number = 6,
  query?: string,
  category?: string
): Promise<{ events: Event[]; total: number }> {
  const all = await searchEvents(query, category);
  const total = all.length;
  const start = (page - 1) * limit;
  const paginated = all.slice(start, start + limit);
  return { events: paginated, total };
}
