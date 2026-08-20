"use client";

import Link from "next/link";
import { useStore } from "@/context/store-context";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";
import { Breadcrumb } from "@/components/breadcrumb";
import { useState } from "react";
import { Product } from "@/lib/types";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="font-display text-3xl md:text-4xl text-ink mt-4">Your Wishlist</h1>

      {saved.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-ink-soft">Nothing saved yet — tap the heart on any product to keep it here.</p>
          <Link href="/shop" className="mt-4 inline-block text-wood underline underline-offset-4">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      )}
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
