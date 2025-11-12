import { getEvents } from "@/lib/api";
import EventGrid from "@/components/EventGrid";
import EventFilter from "@/components/EventFilter";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }> | { locale: string };
  searchParams: Promise<{ q?: string; category?: string }> | { q?: string; category?: string };
}) {
  // ✅ safely resolve both even if they’re Promises
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const locale = resolvedParams?.locale ?? "en";
  const isArabic = locale === "ar";

  const q = resolvedSearchParams?.q?.toLowerCase() || "";
  const category = resolvedSearchParams?.category || "";

  // ✅ load mock data
  const allEvents = await getEvents();

  // ✅ filter based on search text + category
  const filtered = allEvents.filter((e) => {
    const matchesQuery =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.city.toLowerCase().includes(q);

    const matchesCategory = !category || e.category.toLowerCase() === category.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  return (
    <section className={`space-y-6 ${isArabic ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold">
        {isArabic ? "الفعاليات القادمة" : "Upcoming Events"}
      </h1>

      {/* pass locale to children */}
      <EventFilter locale={locale} />
      <EventGrid events={filtered} locale={locale} />
    </section>
  );
}
