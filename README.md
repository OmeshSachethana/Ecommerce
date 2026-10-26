# Aurora — modern e‑commerce storefront

A design-led, fully client-interactive storefront built on the latest web stack.

**Stack:** Next.js 16 (App Router, Cache Components, Partial Prefetching, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Zustand · Lucide · Sonner

## Features

- **Home** — animated aurora-gradient hero with parallax product showcase, marquee, bento category grid, tabbed product edit, scroll-scaled spotlight, reviews masonry and newsletter signup
- **Shop** — category, price, brand and sale filters plus sorting and search, all synced to the URL (shareable links), with a mobile bottom-sheet for filters
- **Product pages** — statically generated for every product, image gallery with hover zoom, colour/size pickers with validation, quantity, wishlist, reviews breakdown, related products and JSON-LD for SEO
- **Cart** — slide-over drawer and a full cart page, free-shipping progress meter, promo codes (`AURORA10`, `WELCOME20`), persistent across reloads
- **Checkout** — 3-step animated flow (information → delivery → payment) with inline validation, live card preview and an order confirmation page
- **⌘K / Ctrl+K command search**, wishlist, dark mode with no flash on load, toast notifications, reduced-motion support and accessible keyboard and screen-reader interactions

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Project structure

```
src/
  app/                  routes (/, /shop, /product/[slug], /cart, /checkout, /checkout/success, /wishlist)
  components/           UI (header, cart drawer, command search, product card…)
    home/ shop/ product/ checkout/
  lib/products.ts       product catalogue & categories (swap for a CMS/API)
  store/shop.ts         cart, wishlist & promo state (Zustand + localStorage)
```

Product photos are loaded from Unsplash. If an image can't be loaded, a styled placeholder is shown in its place. Checkout is a demo, so no payment is ever taken.
