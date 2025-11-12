import { getEvents } from "@/lib/api";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://youreventsite.com"),
  title: {
    default: "Event Discovery Platform",
    template: "%s | Event Discovery Platform",
  },
  description:
    "Discover and book events easily — a modern, SEO-optimized event discovery platform.",
  openGraph: {
    type: "website",
    siteName: "Event Discovery Platform",
    locale: "en_US",
    url: "https://youreventsite.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@youreventsite",
  },
};

export default async function Home() {
   redirect("/events");
}
