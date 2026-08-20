"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";
import { Product, CategorySlug } from "@/lib/types";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

const ageGroups = ["0–2 years", "2–4 years", "4–6 years", "6+ years"];

function ageMatches(productAge: string | undefined, bucket: string) {
  if (!productAge) return false;
  const nums = productAge.match(/\d+/g)?.map(Number) ?? [];
  const [lo, hi] = nums.length ? [Math.min(...nums), Math.max(...nums)] : [0, 99];
  const [bLo, bHi] = bucket.includes("+") ? [6, 99] : bucket.match(/\d+/g)!.map(Number);
  return lo <= bHi && hi >= bLo;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") as CategorySlug | null;

  const [sort, setSort] = useState<SortKey>("featured");
  const [priceMax, setPriceMax] = useState(30000);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const setCategory = (slug: CategorySlug | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    router.push(`/shop?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= priceMax);
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (inStockOnly) list = list.filter((p) => p.inStock && p.purchaseType === "cart");
    if (selectedAges.length) {
      list = list.filter((p) => selectedAges.some((a) => ageMatches(p.ageGroup, a)));
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => (b.badges?.includes("New") ? 1 : 0) - (a.badges?.includes("New") ? 1 : 0));
        break;
      default:
        list = [...list].sort(
          (a, b) => (b.badges?.includes("Bestseller") ? 1 : 0) - (a.badges?.includes("Bestseller") ? 1 : 0)
        );
    }
    return list;
  }, [activeCategory, priceMax, inStockOnly, selectedAges, sort]);

  const activeCat = categories.find((c) => c.slug === activeCategory);

  const toggleAge = (a: string) =>
    setSelectedAges((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-ink mb-3">Category</p>
        <div className="space-y-2">
          <button
            onClick={() => setCategory(null)}
            className={`block text-sm ${!activeCategory ? "text-wood font-medium" : "text-ink-soft hover:text-ink"}`}
          >
            All products
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`block text-sm ${activeCategory === c.slug ? "text-wood font-medium" : "text-ink-soft hover:text-ink"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-3">Price up to PKR {priceMax.toLocaleString()}</p>
        <input
          type="range"
          min={1500}
          max={30000}
          step={500}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-wood"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-3">Age Group</p>
        <div className="space-y-2">
          {ageGroups.map((a) => (
            <label key={a} className="flex items-center gap-2.5 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={selectedAges.includes(a)}
                onChange={() => toggleAge(a)}
                className="accent-wood h-4 w-4 rounded"
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-3">Availability</p>
        <label className="flex items-center gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-wood h-4 w-4 rounded"
          />
          In stock, ready to ship
        </label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-wood font-medium">
          {activeCat ? activeCat.name : "All Products"}
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-ink mt-1">
          {activeCat ? activeCat.tagline : "The full collection"}
        </h1>
        {activeCat && <p className="mt-2 text-ink-soft max-w-2xl">{activeCat.description}</p>}
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <button
          onClick={() => setFiltersOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 text-sm border border-line rounded-full px-4 py-2"
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
        <p className="text-sm text-ink-soft hidden sm:block">{filtered.length} products</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="ml-auto text-sm border border-line rounded-full px-4 py-2 bg-white outline-none"
        >
          <option value="featured">Sort: Featured</option>
          <option value="newest">Sort: Newest</option>
          <option value="price-asc">Sort: Price, Low to High</option>
          <option value="price-desc">Sort: Price, High to Low</option>
          <option value="rating">Sort: Best Rated</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/50" onClick={() => setFiltersOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-cream shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <p className="font-medium">Filters</p>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
              {FilterPanel}
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-8 w-full bg-wood text-white rounded-full py-3 text-sm font-medium"
              >
                Show {filtered.length} products
              </button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-ink-soft">
            No products match those filters yet — try widening your price range.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-20 text-ink-soft">Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
