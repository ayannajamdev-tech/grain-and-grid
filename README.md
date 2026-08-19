# Grain & Grid — Next.js Ecommerce

Converted from the supplied Kimi Vite/React mockup into a Next.js App Router project.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Zustand persistence for cart, reviews and local prototype orders
- Framer Motion dependency ready for interaction polish
- Lucide React icons
- Client-supplied Grain & Grid logo and product imagery

## Run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Routes
- `/` homepage
- `/shop` product collection, search, category filters and sorting
- `/product/[id]` product detail, reviews and cart actions
- `/cart` shopping cart
- `/checkout` order form with COD / bank transfer
- `/about` brand story
- `/contact` enquiry form

## Important
This is intentionally a frontend prototype. Orders, reviews and cart state persist in the browser using Zustand/localStorage. No real payment gateway, email service or database is connected yet.
