"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";
import { StarRating } from "./star-rating";
import { ProductArt } from "./product-art";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="relative bg-cream rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-cream-deep z-10"
        >
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="aspect-square rounded-2xl bg-cream-deep p-12">
            <ProductArt art={product.art} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wide text-ink-soft">
              {product.category.split("-").join(" ")}
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-ink mt-1">{product.name}</h2>
            <div className="mt-2">
              <StarRating rating={product.rating} showValue count={product.reviewCount} />
            </div>
            <p className="mt-3 text-xl font-semibold text-ink">{formatPrice(product.price)}</p>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">{product.tagline}</p>

            {product.purchaseType === "cart" ? (
              <>
                <div className="mt-5 inline-flex items-center border border-line rounded-full w-fit">
                  <button className="p-2.5" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button className="p-2.5" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    addToCart(product, qty);
                    onClose();
                  }}
                  className="mt-4 w-full bg-wood hover:bg-wood-dark text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <Link
                href={`/product/${product.slug}#quote`}
                onClick={onClose}
                className="mt-5 w-full text-center bg-ink hover:bg-wood-dark text-cream rounded-full py-3.5 font-medium transition-colors"
              >
                Request a Quote
              </Link>
            )}

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="mt-3 text-center text-sm text-wood underline underline-offset-4"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
