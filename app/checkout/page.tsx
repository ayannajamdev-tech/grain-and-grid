"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Banknote, Landmark } from "lucide-react";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/product-art";
import { Breadcrumb } from "@/components/breadcrumb";

const DELIVERY_FEE = 250;
const FREE_DELIVERY_THRESHOLD = 5000;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useStore();
  const [payment, setPayment] = useState<"cod" | "bank">("cod");
  const [submitting, setSubmitting] = useState(false);

  const delivery = cart.length === 0 || cartSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = cartSubtotal + delivery;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderNumber = `WM-${Math.floor(10000 + Math.random() * 89999)}`;
    const order = {
      orderNumber,
      name: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      area: formData.get("area"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
      payment,
      items: cart,
      subtotal: cartSubtotal,
      delivery,
      total,
      placedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("gg_last_order", JSON.stringify(order));
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-3 text-ink-soft">Add something to your cart before checking out.</p>
        <Link href="/shop" className="mt-6 inline-block bg-wood hover:bg-wood-dark text-white rounded-full px-7 py-3.5 font-medium">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="font-display text-3xl md:text-4xl text-ink mt-4">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="space-y-10">
          <section>
            <h2 className="font-medium text-ink text-lg">Customer Information</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="fullName" required className="sm:col-span-2" />
              <Field label="Email Address" name="email" type="email" required />
              <Field label="Phone Number" name="phone" type="tel" required />
            </div>
          </section>

          <section>
            <h2 className="font-medium text-ink text-lg">Delivery Address</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Field label="Address" name="address" required className="sm:col-span-2" />
              <Field label="City" name="city" required />
              <Field label="Location / Area" name="area" required />
              <Field label="Postal Code" name="postalCode" required />
              <Field label="Country" name="country" defaultValue="Pakistan" required />
            </div>
          </section>

          <section>
            <h2 className="font-medium text-ink text-lg">Payment Method</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <label
                className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors ${
                  payment === "cod" ? "border-wood bg-cream-deep/60" : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mt-1 accent-[var(--wood)]"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                />
                <span>
                  <span className="flex items-center gap-2 font-medium text-ink text-sm">
                    <Banknote size={16} /> Cash on Delivery
                  </span>
                  <span className="text-xs text-ink-soft mt-1 block">Pay in cash when your order arrives.</span>
                </span>
              </label>
              <label
                className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors ${
                  payment === "bank" ? "border-wood bg-cream-deep/60" : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mt-1 accent-[var(--wood)]"
                  checked={payment === "bank"}
                  onChange={() => setPayment("bank")}
                />
                <span>
                  <span className="flex items-center gap-2 font-medium text-ink text-sm">
                    <Landmark size={16} /> Bank Transfer
                  </span>
                  <span className="text-xs text-ink-soft mt-1 block">Bank details are sent after you place your order.</span>
                </span>
              </label>
            </div>
            {payment === "bank" && (
              <div className="mt-4 rounded-xl bg-cream-deep p-4 text-sm text-ink-soft">
                <p className="text-ink font-medium mb-1">Grain &amp; Grid — Meezan Bank</p>
                <p>Account Title: Grain &amp; Grid (Pvt.) Ltd.</p>
                <p>Account No: 0123 4567 8901 · IBAN: PK00 MEZN 0000 0001 2345 6789</p>
                <p className="mt-1.5 text-xs">A payment reference will also be emailed after checkout.</p>
              </div>
            )}
          </section>
        </div>

        <div className="h-fit bg-cream-deep rounded-2xl p-6">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <div className="mt-4 divide-y divide-line/70">
            {cart.map((line) => (
              <div key={line.productId} className="py-3 flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-white p-2">
                  <ProductArt art={line.art} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink truncate">
                    {line.name} <span className="text-ink-soft">× {line.quantity}</span>
                  </p>
                </div>
                <p className="text-sm text-ink font-medium whitespace-nowrap">
                  {formatPrice(line.price * line.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-line space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span className="text-ink">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Delivery</span>
              <span className="text-ink">{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
            </div>
            <div className="flex justify-between font-semibold text-ink text-base pt-2 border-t border-line">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-wood hover:bg-wood-dark disabled:opacity-60 text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
          <p className="mt-3 text-xs text-ink-soft text-center">
            This is a front-end preview — no payment is processed.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-ink-soft">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood bg-white"
      />
    </label>
  );
}
