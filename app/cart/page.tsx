"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/product-art";
import { Breadcrumb } from "@/components/breadcrumb";

const DELIVERY_FEE = 250;
const FREE_DELIVERY_THRESHOLD = 5000;

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal } = useStore();
  const delivery = cart.length === 0 || cartSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = cartSubtotal + delivery;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumb items={[{ label: "Cart" }]} />
      <h1 className="font-display text-3xl md:text-4xl text-ink mt-4">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-ink-soft">Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-wood underline underline-offset-4">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-[1fr_340px] gap-12">
          <div className="divide-y divide-line">
            {cart.map((line) => (
              <div key={line.productId} className="py-6 flex gap-5">
                <div className="h-24 w-24 shrink-0 rounded-xl bg-cream-deep p-4">
                  <ProductArt art={line.art} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <div className="min-w-0">
                    <Link href={`/product/${line.slug}`} className="font-medium text-ink hover:text-wood">
                      {line.name}
                    </Link>
                    <p className="text-sm text-ink-soft mt-1">{formatPrice(line.price)} each</p>
                    <button
                      onClick={() => removeFromCart(line.productId)}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-ink-soft hover:text-wood"
                    >
                      <X size={13} /> Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="inline-flex items-center border border-line rounded-full">
                      <button
                        className="p-2"
                        onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        className="p-2"
                        onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="w-24 text-right font-medium text-ink">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit bg-cream-deep rounded-2xl p-6">
            <h2 className="font-display text-xl text-ink">Order Summary</h2>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="text-ink">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Delivery</span>
                <span className="text-ink">{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-sage-dark">
                  Add {formatPrice(FREE_DELIVERY_THRESHOLD - cartSubtotal)} more for free delivery
                </p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-line flex justify-between font-semibold text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block text-center bg-wood hover:bg-wood-dark text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="mt-3 block text-center text-sm text-ink-soft hover:text-wood">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
