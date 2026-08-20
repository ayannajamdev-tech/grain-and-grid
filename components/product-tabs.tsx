"use client";

import { useState } from "react";
import { Product } from "@/lib/types";

export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { key: "description", label: "Description" },
    { key: "specs", label: "Specifications" },
    { key: "care", label: "Care" },
    { key: "shipping", label: "Shipping" },
  ] as const;
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("description");

  return (
    <div>
      <div className="flex gap-6 border-b border-line overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              active === t.key ? "border-wood text-ink" : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm text-ink-soft leading-relaxed">
        {active === "description" && <p>{product.description}</p>}

        {active === "specs" && (
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-soft/70">Material</dt>
              <dd className="text-ink mt-0.5">{product.material}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-soft/70">Dimensions</dt>
              <dd className="text-ink mt-0.5">{product.dimensions}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-soft/70">Finish</dt>
              <dd className="text-ink mt-0.5">{product.finish}</dd>
            </div>
            {product.ageGroup && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-soft/70">Recommended Age</dt>
                <dd className="text-ink mt-0.5">{product.ageGroup}</dd>
              </div>
            )}
          </dl>
        )}

        {active === "care" && <p>{product.care}</p>}

        {active === "shipping" && (
          <p>
            {product.purchaseType === "quote"
              ? "This is a made-to-order item. Once your quote is confirmed, standard production takes 2–4 weeks, followed by scheduled delivery or installation."
              : "In-stock orders are typically dispatched within 2–3 business days. Delivery within Karachi usually arrives in 1–2 days after dispatch; other cities may take longer."}
          </p>
        )}
      </div>
    </div>
  );
}
