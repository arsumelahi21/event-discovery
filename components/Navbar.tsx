"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ locale = "en" }: { locale?: string }) {
  const pathname = usePathname();

  const navItems = [
    { name: locale === "ar" ? "الفعاليات" : "Events", href: `/${locale}/events` },
    { name: locale === "ar" ? "تذاكري" : "My Tickets", href: `/${locale}/tickets` },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="text-xl font-bold text-primary">
          Event<span className="text-gray-800"> Discovery</span>
        </Link>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium ${
                pathname.startsWith(item.href)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Language Switcher */}
          <Link
            href={pathname.replace(`/${locale}`, locale === "ar" ? "/en" : "/ar")}
            className="text-sm text-gray-500 hover:text-primary border px-2 py-1 rounded-md"
          >
            {locale === "ar" ? "English" : "العربية"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
