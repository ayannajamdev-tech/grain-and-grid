"use client";

import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";
import { StarRating } from "./star-rating";
import { ProductArt } from "./product-art";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const accent = product.category === "kitchen" || product.category === "school-furniture" ? "wood" : "sage";

  return (
    <div className="group relative flex flex-col">
      <div
        className="relative aspect-square rounded-2xl overflow-hidden"
        style={{
          background:
            accent === "wood"
              ? "linear-gradient(160deg, var(--cream-deep), var(--cream-deeper))"
              : "linear-gradient(160deg, var(--cream-deep), #e3e6d6)",
        }}
      >
        <Link href={`/product/${product.slug}`} className="block h-full w-full p-10">
          <ProductArt art={product.art} />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges?.map((b) => (
            <span
              key={b}
              className="text-[10px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full bg-ink/90 text-cream"
            >
              {b}
            </span>
          ))}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/85 hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-wood text-wood" : "text-ink"}
          />
        </button>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 bg-white text-ink text-xs font-medium px-4 py-2 rounded-full shadow-md"
          >
            <Eye size={14} /> Quick View
          </button>
        )}
      </div>

      <div className="mt-3.5 flex-1 flex flex-col">
        <p className="text-[11px] uppercase tracking-wide text-ink-soft">
          {product.category
            .split("-")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ")}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-0.5 font-medium text-ink leading-snug hover:text-wood transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5">
          <StarRating rating={product.rating} showValue count={product.reviewCount} />
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-3">
          <div>
            {product.purchaseType === "quote" ? (
              <p className="text-sm text-ink-soft">
                From <span className="font-semibold text-ink">{formatPrice(product.price)}</span>
              </p>
            ) : (
              <p className="font-semibold text-ink">{formatPrice(product.price)}</p>
            )}
            {product.bulkPricing && (
              <p className="text-[11px] text-sage-dark">Bulk pricing available</p>
            )}
          </div>

          {product.purchaseType === "quote" ? (
            <Link
              href={`/product/${product.slug}`}
              className="text-xs font-medium border border-ink rounded-full px-3.5 py-2 hover:bg-ink hover:text-cream transition-colors whitespace-nowrap"
            >
              Request Quote
            </Link>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="text-xs font-medium bg-wood text-white rounded-full px-3.5 py-2 hover:bg-wood-dark transition-colors whitespace-nowrap"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
