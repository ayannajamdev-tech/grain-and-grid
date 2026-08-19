"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import ProductCard from "@/components/product-card";
export default function ShopClient() {
  const params = useSearchParams();
const initial = (params.get("cat") as Category) || "All Products";
  const [cat, setCat] = useState<string>(initial || "All Products");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const list = useMemo(() => {
    let a = PRODUCTS.filter(
      (p) => cat === "All Products" || p.category === cat,
    );
    if (q)
      a = a.filter((p) =>
        `${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase()),
      );
    if (sort === "price-asc") a = [...a].sort((x, y) => x.price - y.price);
    if (sort === "price-desc") a = [...a].sort((x, y) => y.price - x.price);
    if (sort === "rating") a = [...a].sort((x, y) => y.rating - x.rating);
    return a;
  }, [cat, q, sort]);
  return (
    <div className="container-grid py-16 lg:py-24">
      <div className="max-w-3xl">
        <div className="eyebrow mb-4">The collection</div>
        <h1 className="font-display text-6xl sm:text-8xl">
          Objects with purpose.
        </h1>
        <p className="mt-6 max-w-xl leading-7 text-walnut/60">
          School furniture, tactile learning materials, plastic-free kitchen
          essentials and heirloom toys — all gathered in one considered
          collection.
        </p>
      </div>
      <div className="mt-14 flex gap-2 overflow-x-auto pb-2">
        {["All Products", ...CATEGORIES.map((c) => c.name)].map((t) => (
          <button
            key={t}
            onClick={() => setCat(t)}
            className={`whitespace-nowrap border px-4 py-2.5 text-[9px] tracking-[.2em] uppercase transition ${cat === t ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4 border-y border-ink/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-walnut/40"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the collection"
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[.2em] uppercase text-sage">
            {list.length} pieces
          </span>
          <div className="relative">
            <SlidersHorizontal
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field w-auto pl-9"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>
      {list.length ? (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="py-28 text-center">
          <div className="font-display text-3xl italic">
            Nothing matched your search.
          </div>
          <button
            onClick={() => {
              setQ("");
              setCat("All Products");
            }}
            className="btn-outline mt-6"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
