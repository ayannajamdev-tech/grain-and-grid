"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShieldCheck, Truck, Wallet } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";
import { StarRating } from "./star-rating";
import { ProductArt } from "./product-art";

const tints = [
  "linear-gradient(160deg, var(--cream-deep), var(--cream-deeper))",
  "linear-gradient(160deg, #efe6d3, #ddd0ae)",
  "linear-gradient(160deg, #e7e9dc, #d3d8c1)",
];

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const [activeTint, setActiveTint] = useState(0);
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
      <div>
        <div
          className="aspect-square rounded-3xl p-12 md:p-16"
          style={{ background: tints[activeTint] }}
        >
          <ProductArt art={product.art} />
        </div>
        <div className="mt-4 flex gap-3">
          {tints.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTint(i)}
              aria-label={`View angle ${i + 1}`}
              className={`h-16 w-16 rounded-xl p-3.5 border-2 transition-colors ${
                activeTint === i ? "border-wood" : "border-transparent"
              }`}
              style={{ background: t }}
            >
              <ProductArt art={product.art} />
            </button>
          ))}
        </div>
      </div>

      <div>
        {product.badges && product.badges.length > 0 && (
          <div className="flex gap-2 mb-3">
            {product.badges.map((b) => (
              <span
                key={b}
                className="text-[10px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full bg-ink text-cream"
              >
                {b}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs uppercase tracking-wide text-ink-soft">
          {product.category.split("-").join(" ")}
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-ink mt-1.5 text-balance">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <StarRating rating={product.rating} size={16} />
          <a href="#reviews" className="text-sm text-ink-soft hover:text-wood">
            {product.reviewCount} Reviews
          </a>
        </div>

        <p className="mt-4 text-2xl font-semibold text-ink">
          {product.purchaseType === "quote" ? "From " : ""}
          {formatPrice(product.price)}
        </p>
        {product.bulkPricing && (
          <p className="text-sm text-sage-dark mt-1">Bulk pricing available for institutional orders</p>
        )}

        <p className="mt-5 text-ink-soft leading-relaxed">{product.tagline}</p>

        {product.purchaseType === "cart" ? (
          <>
            <div className="mt-7 flex items-center gap-4">
              <div className="inline-flex items-center border border-line rounded-full">
                <button
                  className="p-3"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-9 text-center text-sm">{qty}</span>
                <button className="p-3" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                  <Plus size={15} />
                </button>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="p-3.5 border border-line rounded-full hover:border-wood transition-colors"
              >
                <Heart size={18} className={wishlisted ? "fill-wood text-wood" : "text-ink"} />
              </button>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  addToCart(product, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="bg-wood hover:bg-wood-dark text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <Link
                href="/checkout"
                onClick={() => addToCart(product, qty)}
                className="text-center border border-ink rounded-full py-3.5 font-medium hover:bg-ink hover:text-cream transition-colors"
              >
                Buy Now
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/schools#quote-form"
              id="quote"
              className="text-center bg-ink hover:bg-wood-dark text-cream rounded-full py-3.5 px-8 font-medium transition-colors"
            >
              Request a Quote
            </Link>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="inline-flex items-center justify-center gap-2 border border-line rounded-full py-3.5 px-6 hover:border-wood transition-colors"
            >
              <Heart size={16} className={wishlisted ? "fill-wood text-wood" : "text-ink"} />
              {wishlisted ? "Saved" : "Save for later"}
            </button>
          </div>
        )}

        <div className="mt-8 space-y-3 border-t border-line pt-6">
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <Wallet size={17} className="text-wood shrink-0" />
            Cash on delivery or bank transfer accepted
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <Truck size={17} className="text-wood shrink-0" />
            {product.purchaseType === "quote"
              ? "Scheduled delivery or installation on confirmed orders"
              : "Delivery within 2–5 business days across Pakistan"}
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <ShieldCheck size={17} className="text-wood shrink-0" />
            Finished with child-safe, non-toxic materials
          </div>
        </div>
      </div>
    </div>
  );
}
