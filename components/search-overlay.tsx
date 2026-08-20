"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useStore } from "@/context/store-context";
import { products, categories } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "./product-art";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], categories: [] };
    const q = query.toLowerCase();
    return {
      products: products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6),
      categories: categories.filter(
        (c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!searchOpen) return null;

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/60" onClick={close} />
      <div className="absolute inset-x-0 top-0 bg-cream shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
            <Search size={22} className="text-ink-soft" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, furniture, toys…"
              className="flex-1 bg-transparent outline-none text-lg placeholder:text-ink-soft/60"
            />
            <button onClick={close} aria-label="Close search" className="p-1.5 hover:bg-cream-deep rounded-full">
              <X size={20} />
            </button>
          </div>

          {query.trim() === "" ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft mb-3">Browse collections</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop?category=${c.slug}`}
                    onClick={close}
                    className="px-4 py-2 rounded-full border border-line text-sm hover:border-wood hover:text-wood transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {results.categories.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-soft mb-2">Collections</p>
                  <div className="flex flex-wrap gap-2">
                    {results.categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/shop?category=${c.slug}`}
                        onClick={close}
                        className="px-4 py-2 rounded-full border border-line text-sm hover:border-wood hover:text-wood"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-soft mb-2">Products</p>
                {results.products.length === 0 ? (
                  <p className="text-sm text-ink-soft">No products matched “{query}”.</p>
                ) : (
                  <div className="flex flex-col divide-y divide-line">
                    {results.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-4 py-3 hover:bg-cream-deep/60 -mx-2 px-2 rounded-lg"
                      >
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-cream-deep p-2">
                          <ProductArt art={p.art} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                          <p className="text-xs text-ink-soft">{formatPrice(p.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
