# Event Discovery Platform

A bilingual (English + Arabic) event discovery platform built with **Next.js (App Router)**, **React**, and **Tailwind CSS**.  
Users can browse, search, and view event details with an SEO-optimized, performant frontend architecture.

## Features

✅ **Next.js 14+ (App Router)** — Server Components for data fetching, Client Components for interactivity  
✅ **Bilingual Support (English + Arabic)** — automatic RTL layout for Arabic  
✅ **SEO Optimized** — Metadata API, Open Graph, Twitter Cards, JSON-LD schema, and dynamic sitemap  
✅ **Responsive Design** — fully mobile-first and optimized with Tailwind CSS  
✅ **Dynamic Filtering and Search** — by title, category, location, or date  
✅ **Mock API Layer** — realistic JSON-based mock endpoints  
✅ **Booking Simulation** — submit ticket form with validation + success popup  
✅ **My Tickets Page** — mock data table with print option  
✅ **Optimized Performance** — SSR, SSG, caching, and lazy image loading  

---

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/arsumelahi21/event-discovery.git
cd event-platform
````

### Install dependencies

```bash
npm install
```
---

### Run the development server

```bash
npm run dev
```

Then open in your browser:

```
http://localhost:3000/en/events
http://localhost:3000/ar/events
```

---

## Supported Locales

| Locale  | Path Prefix | Direction     |
| ------- | ----------- | ------------- |
| English | `/en`       | Left-to-Right |
| Arabic  | `/ar`       | Right-to-Left |

Example URLs:

* English → [`/en/events`](http://localhost:3000/en/events)
* Arabic → [`/ar/events`](http://localhost:3000/ar/events)

---

## Key Pages

| Page              | Path                           | Description                                         |
| ----------------- | ------------------------------ | --------------------------------------------------- |
| **Home / Events** | `/[locale]/events`             | Grid of upcoming events with filters and search     |
| **Event Detail**  | `/[locale]/events/[slug]`      | Full event info with SEO meta + structured data     |
| **Book Ticket**   | `/[locale]/events/[slug]/book` | Ticket booking form with validation & success popup |
| **My Tickets**    | `/[locale]/tickets`            | Mock list of booked tickets with print action       |

---

## SEO & Metadata

Implemented via Next.js Metadata API:

* Dynamic titles & descriptions per event
* Open Graph & Twitter Cards
* JSON-LD event schema for search engines
* Dynamic sitemap generation (`app/sitemap.ts`)
* Robots.txt configuration

---

## Styling

* Built with **Tailwind CSS** (utility-first approach)
* Fully responsive (mobile-first)
* RTL styling auto-applied for Arabic locale
* Skeleton loaders for better UX while fetching

---

## Tech Stack

| Tech                         | Purpose           |
| ---------------------------- | ----------------- |
| **Next.js 14+ (App Router)** | SSR, routing, SEO |
| **React 18**                 | UI components     |
| **TypeScript**               | Static typing     |
| **Tailwind CSS**             | Styling           |
| **Lucide Icons**             | Iconography       |
| **Mock JSON API**            | Data source       |

---



