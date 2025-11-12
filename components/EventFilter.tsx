"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EventFilter({ locale }: { locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) params.set("q", query);
    else params.delete("q");
    if (category) params.set("category", category);
    else params.delete("category");
    params.delete("page");
    router.push(`/${locale}/events?${params.toString()}`);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set("category", value);
    else params.delete("category");
    params.delete("page"); // reset to page 1
    router.push(`/${locale}/events?${params.toString()}`);
  };

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-3 sm:items-center"
    >
      <input
        type="text"
        placeholder={locale === "ar" ? "ابحث عن فعالية..." : "Search events..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{locale === "ar" ? "جميع الفئات" : "All Categories"}</option>
        <option value="Technology">{locale === "ar" ? "تكنولوجيا" : "Technology"}</option>
        <option value="Music">{locale === "ar" ? "موسيقى" : "Music"}</option>
        <option value="Design">{locale === "ar" ? "تصميم" : "Design"}</option>
      </select>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {locale === "ar" ? "بحث" : "Search"}
      </button>
    </form>
  );
}
