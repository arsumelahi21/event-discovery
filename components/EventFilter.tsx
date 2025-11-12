"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  locale: string;
}

export default function EventFilter({ locale }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const isArabic = locale === "ar";

  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (category) params.set("category", category);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex flex-wrap gap-3 items-center ${
        isArabic ? "flex-row-reverse" : ""
      }`}
    >
      <input
        type="text"
        placeholder={isArabic ? "ابحث عن فعالية..." : "Search events..."}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        dir={isArabic ? "rtl" : "ltr"}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <option value="">{isArabic ? "كل الفئات" : "All Categories"}</option>
        <option value="music">{isArabic ? "موسيقى" : "Music"}</option>
        <option value="technology">{isArabic ? "مؤتمر" : "Technology"}</option>
        <option value="design">{isArabic ? "رياضة" : "Design"}</option>
        <option value="art">{isArabic ? "فن" : "Art"}</option>
      </select>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {isArabic ? "بحث" : "Search"}
      </button>
    </form>
  );
}
