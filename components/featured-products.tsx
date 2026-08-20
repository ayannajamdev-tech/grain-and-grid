"use client";

import { useState } from "react";
import Link from "next/link";
import { getFeaturedProducts, products } from "@/lib/data";
import { ProductCard } from "./product-card";
import { QuickViewModal } from "./quick-view-modal";
import { Product } from "@/lib/types";
import { Reveal } from "./reveal";

export function FeaturedProducts() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const featured = getFeaturedProducts();
  const list = featured.length >= 4 ? featured : products.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-wood font-medium">Customer favourites</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-1">Most loved</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-wood underline underline-offset-4">
            View all products
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {list.slice(0, 8).map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 70}>
            <ProductCard product={p} onQuickView={setQuickView} />
          </Reveal>
        ))}
      </div>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
