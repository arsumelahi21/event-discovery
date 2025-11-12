import EventCard from "./EventCard";

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: {
    city: string;
  };
  category: string;
}

interface EventGridProps {
  events: Event[];
  locale?: string;
}

export default function EventGrid({ events, locale = "en" }: EventGridProps) {
  const isArabic = locale === "ar";

  if (!events.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        {isArabic ? "لا توجد فعاليات حالياً" : "No events found."}
      </p>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
        isArabic ? "rtl" : ""
      }`}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} locale={locale} />
      ))}
    </div>
  );
}
