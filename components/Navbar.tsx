"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "ar" : "en";

  
  const stripLocale = (path: string) => path.replace(/^\/(en|ar)/, "");
  const localizedPath = `/${otherLocale}${stripLocale(pathname)}`;

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link
        href={`/${locale}/events`}
        className="text-xl font-bold text-primary"
      >
     Event Discovery
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-gray-700">
        {/* Discover Events */}
        <Link
          href={`/${locale}/events`}
          className={clsx(
            "hover:text-primary transition",
            isActive(`/${locale}/events`) && "text-primary font-semibold border-b-2 border-primary pb-1"
          )}
        >
          {locale === "ar" ? "اكتشف الفعاليات" : "Discover Events"}
        </Link>

        {/* My Tickets */}
        <Link
          href={`/${locale}/tickets`}
          className={clsx(
            "hover:text-primary transition",
            isActive(`/${locale}/tickets`) && "text-primary font-semibold border-b-2 border-primary pb-1"
          )}
        >
          {locale === "ar" ? "تذاكري" : "My Tickets"}
        </Link>

        {/* Language Switch */}
        <Link
          href={localizedPath}
          className="text-sm text-gray-500 hover:text-primary border px-3 py-1 rounded-md"
        >
          {locale === "ar" ? "English" : "العربية"}
        </Link>
      </div>
    </nav>
  );
}
