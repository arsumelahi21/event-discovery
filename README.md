# Event Discovery Platform

A multilingual (English & Arabic) **event discovery platform** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand**.
It allows users to browse, search, and book events, with SEO optimization, structured data, and client-side persistence of booked tickets.

## Features

### Core Pages

| Page              | Route                          | Features                                                                  |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------- |
| **Homepage**      | `/[locale]/events`             | Event grid, search, category filter, pagination, SSR                      |
| **Event Details** | `/[locale]/events/[slug]`      | Full event info, SEO metadata, JSON-LD structured data, "Book Ticket" CTA |
| **Book Ticket**   | `/[locale]/events/[slug]/book` | Client form with validation, simulated API, Zustand integration           |
| **My Tickets**    | `/[locale]/tickets`            | Persisted tickets (Zustand + localStorage), Print and Delete actions      |

---


### Architecture Highlights

* **App Router (Next.js 14+)** with proper separation of server/client components.
* **Zustand** for state management (booked tickets stored locally and persisted).
* **Mock API layer** via local JSON data simulating network delay.
* **SEO-ready** with Metadata API, Open Graph, Twitter Cards, and JSON-LD.
* **Dynamic sitemap.xml** and **robots.txt** generated at build.
* **Multilingual**: English and Arabic (`/[locale]/...`) with automatic RTL layout.
* **Tailwind CSS** for styling, responsive grid and skeleton loaders.
* **TypeScript strict mode** for type safety across the entire project.

---

## Tech Stack

| Layer            | Technology                                         |
| ---------------- | -------------------------------------------------- |
| Framework        | [Next.js 14 (App Router)](https://nextjs.org/docs) |
| Language         | TypeScript                                         |
| Styling          | Tailwind CSS                                       |
| State Management | Zustand (persist middleware)                       |
| Mock API         | Local JSON (simulated async)                       |
| Icons            | Lucide React                                       |
| SEO              | Metadata API, JSON-LD, OpenGraph, Sitemap, Robots  |
| Persistence      | LocalStorage via Zustand persist                   |
| Localization     | Arabic & English with direction and labels         |

---

## Setup & Run Instructions

### Clone the Repository

```bash
git clone https://github.com/arsumelahi21/event-discovery.git
cd event-discovery-platform
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Your app will be live at:

```
http://localhost:3000/en/events
```
---

## Booking & Ticket Management

### Booking Flow

1. Navigate to an event → click **“Book Ticket”**.
2. Fill the form (name, email, date).
3. Submitting will simulate an API call and store your ticket in **Zustand (localStorage)**.

### My Tickets Page

* Displays all booked tickets in a responsive table.
* **Delete** → removes ticket from storage.
* **Print** → opens formatted ticket in new tab and triggers browser print.

---

## Multilingual Support

* English (`/en/...`) and Arabic (`/ar/...`)
* Direction and text alignment switch dynamically (`dir="ltr"` or `dir="rtl"`).
* UI text and headings adapt to the selected locale.

---

## SEO Implementation

* Dynamic meta tags per page using Next.js Metadata API.
* Open Graph & Twitter cards.
* Structured data (JSON-LD for event schema).
* Auto-generated `sitemap.xml` and `robots.txt` with correct URLs and frequencies.

---

## Additional Notes

* **Pagination**: Implemented client-side with load-more style interaction.
* **Mock Data**: 20 events across 3 categories (Technology, Music, Design).
* **Accessibility**: Proper semantic HTML and ARIA-friendly controls.
* **Error Handling**: Friendly error states and fallback UIs.

---
