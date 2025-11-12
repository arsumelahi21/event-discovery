import { getPaginatedEvents } from "@/lib/api";
import EventGrid from "@/components/EventGrid";
import EventFilter from "@/components/EventFilter";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }> | { locale: string };
  searchParams:
    | Promise<{ q?: string; category?: string; page?: string }>
    | { q?: string; category?: string; page?: string };
}) {

  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const locale = resolvedParams?.locale ?? "en";
  const isArabic = locale === "ar";

  const q = resolvedSearchParams?.q?.toLowerCase() || "";
  const category = resolvedSearchParams?.category || "";
  const page = parseInt(resolvedSearchParams?.page || "1");
  const limit = 6;


  const { events, total } = await getPaginatedEvents(page, limit, q, category);
  const totalPages = Math.ceil(total / limit);

  return (
    <section className={`space-y-6 ${isArabic ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold">
        {isArabic ? "الفعاليات القادمة" : "Upcoming Events"}
      </h1>

      {/* Filters */}
      <EventFilter locale={locale} />

      {/* Events */}
      <EventGrid events={events} locale={locale} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          className={`flex items-center justify-center gap-3 mt-8 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          {page > 1 && (
            <Link
              href={`/${locale}/events?q=${q}&category=${category}&page=${page - 1}`}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              {isArabic ? "السابق" : "Previous"}
            </Link>
          )}

          <span className="text-sm text-gray-600">
            {isArabic
              ? `صفحة ${page} من ${totalPages}`
              : `Page ${page} of ${totalPages}`}
          </span>

          {page < totalPages && (
            <Link
              href={`/${locale}/events?q=${q}&category=${category}&page=${page + 1}`}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              {isArabic ? "التالي" : "Next"}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
