# Architecture Documentation

The **Event Discovery Platform** follows a **modular and layered architecture** leveraging **Next.js App Router** to separate **server** and **client** responsibilities cleanly.
It uses **Zustand** for persistent local state (tickets), **mock JSON APIs** for event data, and **Next.js SEO utilities** for metadata and sitemap generation.

###  Key Architectural Principles

1. **SSR for SEO & performance**:
   Event listings and details are fetched server-side for faster first paint and crawlable markup.
2. **Client interactivity only where needed**:
   Components like filters, search, form submission, and ticket management run fully client-side.
3. **Persistent state** via Zustand’s localStorage middleware ensures tickets remain across sessions.
4. **Localization**:
   Every route is namespaced by locale (`/[locale]/...`) and layout switches text direction dynamically (`ltr`/`rtl`).
5. **Scalable mock API layer**:
   Event data is simulated via async functions using `data/events.json`, easily replaceable with a real backend.
6. **SEO Layer**:
   Dynamic `generateMetadata`, Open Graph, Twitter Cards, JSON-LD schema, and auto-generated `sitemap.xml` and `robots.txt`.
