# Grain & Grid — E-commerce Front End (Prototype)

A front-end-only Next.js storefront built to give the client something real
to react to. No backend / payments are wired up — the "Place Order" button
produces a polished confirmation screen instead of processing a transaction.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Cart & wishlist state in `context/store-context.tsx`, persisted to
  localStorage so it survives a page refresh
- Mock catalog data in `lib/data.ts` — 18 products across your 4 categories,
  each with specs, badges and sample reviews. Swap in real data/CMS later.
- Product visuals are custom line-art icons (`components/product-art.tsx`)
  rather than stock photos — swap in real product photography per item
  when it's available; each product already has an `art` key you can map
  an image to instead.

## Pages

/, /shop (filters + sort), /product/[slug] (gallery, tabs, reviews),
/cart, /checkout (order form: name, email, phone, address, city, area,
postal code, country, COD/bank payment), /order-confirmation, /about,
/contact, /schools (B2B quote form), /custom (bespoke project form),
/wishlist.

## Brand

Colors and type are pulled from the Grain & Grid logo — see the CSS
variables at the top of `app/globals.css` (`--wood`, `--sage`, `--cream`,
`--ink`) if the client wants to adjust the palette.
