import "../globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Event Discovery Platform",
    template: "%s | Event Discovery Platform",
  },
  description: "Discover and book events easily — SEO-optimized platform.",
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Global navbar */}
          <Navbar locale={locale} />

          {/* Main page content */}
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>

          {/* Simple footer */}
          <footer className="text-center py-6 text-sm text-gray-500 border-t mt-8">
            © {new Date().getFullYear()} Event Discovery Platform
          </footer>
        </div>
      </body>
    </html>
  );
}
