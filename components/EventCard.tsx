"use client";

import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  locale?: string;
}

export default function EventCard({ event, locale = "en" }: EventCardProps) {
  const isArabic = locale === "ar";

 
  const city = event.location?.city || (isArabic ? "غير محدد" : "Unknown");
  const formattedDate = new Date(event.date).toLocaleDateString(
    isArabic ? "ar-EG" : "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Link
      href={`/${locale}/events/${event.slug}`}
      className={`bg-white rounded-2xl shadow hover:shadow-lg transition p-3 flex flex-col ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">
            {event.title}
          </h3>

          <p className="text-sm text-gray-500">
            {formattedDate} · {city}
          </p>
        </div>

        <div className={`${isArabic ? "self-start" : "self-end"} mt-3`}>
          <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
