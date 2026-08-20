"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "./product-art";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartSubtotal } =
    useStore();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-2xl text-ink">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="p-2 hover:bg-cream-deep rounded-full">
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-ink-soft">Your cart is empty for now.</p>
            <button
              onClick={() => setCartOpen(false)}
              className="text-wood underline underline-offset-4 text-sm"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
              {cart.map((line) => (
                <div key={line.productId} className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-xl bg-cream-deep p-3">
                    <ProductArt art={line.art} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${line.slug}`}
                        className="text-sm font-medium text-ink hover:text-wood line-clamp-2"
                      >
                        {line.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(line.productId)}
                        aria-label="Remove item"
                        className="text-ink-soft hover:text-wood shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-ink-soft mt-1">{formatPrice(line.price)}</p>
                    <div className="mt-2 inline-flex items-center border border-line rounded-full">
                      <button
                        className="p-1.5 hover:text-wood"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm">{line.quantity}</span>
                      <button
                        className="p-1.5 hover:text-wood"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5 space-y-4">
              <div className="flex items-center justify-between text-sm text-ink-soft">
                <span>Subtotal</span>
                <span className="text-ink font-medium text-base">{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="text-xs text-ink-soft">
                Delivery and payment method are confirmed at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="block w-full text-center bg-wood hover:bg-wood-dark text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={() => setCartOpen(false)}
                className="block w-full text-center text-ink underline underline-offset-4 text-sm"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
