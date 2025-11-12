import { getEventBySlug } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// ---------- Dynamic SEO ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found | Event Platform" };
  }

  return {
    title: `${event.title} | Event Platform`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [{ url: event.imageUrl }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
  };
}

// ---------- Page Component ----------
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = await getEventBySlug(slug);
  const isArabic = locale === "ar";

  if (!event) {
    return (
      <div className="p-10 text-center text-gray-500">
        {isArabic ? "الفعالية غير موجودة" : "Event not found"}
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: event.location.country,
      },
    },
    image: event.imageUrl,
    description: event.longDescription || event.description,
    offers: {
      "@type": "Offer",
      price: event.price === "free" ? 0 : event.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://localhost:3000/${locale}/events/${event.slug}`,
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer.name,
    },
  };

  return (
    <section
      className={`container mx-auto px-4 py-10 max-w-4xl ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {/* ---------- Structured Data ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- Back Button ---------- */}
      <div className="mb-4">
        <Link
          href={`/${locale}/events`}
          className="text-primary hover:underline text-sm flex items-center gap-1"
        >
          {isArabic ? "← العودة إلى الفعاليات" : "← Back to Events"}
        </Link>
      </div>

      {/* ---------- Event Image ---------- */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ---------- Event Info ---------- */}
      <h1 className="mt-6 text-3xl font-bold text-gray-900">{event.title}</h1>

      <p className="text-gray-500 mt-2">
        {new Date(event.date).toLocaleDateString(
          isArabic ? "ar-EG" : "en-GB",
          {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )}{" "}
        — {event.location.city}, {event.location.country}
      </p>

      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        {event.longDescription || event.description}
      </p>

      {/* ---------- Organizer + Booking ---------- */}
      <div
        className={`mt-6 flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <div>
          <p className="text-sm text-gray-600">
            {isArabic ? "من تنظيم" : "Organized by"}{" "}
            <strong>{event.organizer.name}</strong>
          </p>
        </div>
        <Link
          href={`/${locale}/events/${event.slug}/book`}
          className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {isArabic ? "احجز تذكرتك الآن" : "Book Ticket"}
        </Link>
      </div>
    </section>
  );
}
