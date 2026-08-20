"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/product-art";

interface OrderRecord {
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  country: string;
  payment: "cod" | "bank";
  items: { productId: string; name: string; art: string; price: number; quantity: number }[];
  subtotal: number;
  delivery: number;
  total: number;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gg_last_order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  if (loaded && !order) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">No recent order found</h1>
        <p className="mt-3 text-ink-soft">Place an order to see your confirmation here.</p>
        <Link href="/shop" className="mt-6 inline-block bg-wood hover:bg-wood-dark text-white rounded-full px-7 py-3.5 font-medium">
          Browse products
        </Link>
      </div>
    );
  }

  if (!order) return null;

  const firstName = String(order.name).split(" ")[0];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-sage/15 flex items-center justify-center text-sage-dark">
        <CheckCircle2 size={32} />
      </div>
      <h1 className="font-display text-3xl md:text-4xl text-ink mt-6">Order Received</h1>
      <p className="mt-3 text-ink-soft">Thank you, {firstName}.</p>
      <p className="text-ink-soft">Your order has been received successfully.</p>
      <p className="mt-4 inline-flex items-center gap-2 bg-cream-deep rounded-full px-5 py-2 text-sm font-medium text-ink">
        Order #{order.orderNumber}
      </p>
      <p className="mt-4 text-sm text-ink-soft max-w-md mx-auto">
        We&rsquo;ll contact you at {order.phone} to confirm your order and delivery details.
        {order.payment === "bank" && " Bank transfer details have also been sent to your email."}
      </p>

      <div className="mt-10 text-left bg-white border border-line rounded-2xl p-6">
        <div className="flex items-center justify-between text-sm text-ink-soft border-b border-line pb-4 mb-4">
          <span>
            Deliver to <span className="text-ink">{order.address}, {order.area}, {order.city}</span>
          </span>
          <span className="uppercase text-xs">{order.payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}</span>
        </div>
        <div className="divide-y divide-line">
          {order.items.map((item) => (
            <div key={item.productId} className="py-3 flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-lg bg-cream-deep p-2">
                <ProductArt art={item.art} />
              </div>
              <p className="flex-1 text-sm text-ink truncate">
                {item.name} × {item.quantity}
              </p>
              <p className="text-sm font-medium text-ink">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-line space-y-1.5 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Delivery</span>
            <span>{order.delivery === 0 ? "Free" : formatPrice(order.delivery)}</span>
          </div>
          <div className="flex justify-between font-semibold text-ink text-base pt-1.5">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <Link
        href="/shop"
        className="mt-8 inline-block bg-wood hover:bg-wood-dark text-white rounded-full px-7 py-3.5 font-medium btn-shadow transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
