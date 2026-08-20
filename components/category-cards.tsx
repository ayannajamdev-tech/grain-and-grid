import Link from "next/link";
import { categories } from "@/lib/data";
import { ProductArt } from "./product-art";
import { Reveal } from "./reveal";

const artByCategory: Record<string, string> = {
  "school-furniture": "desk",
  "educational-materials": "alphabet-board",
  kitchen: "cutting-board",
  toys: "rocking-horse",
};

export function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <Reveal>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-display text-3xl md:text-4xl text-ink">Shop by collection</h2>
          <Link href="/shop" className="text-sm font-medium text-wood underline underline-offset-4">
            View everything
          </Link>
        </div>
      </Reveal>
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 90}>
            <Link
              href={`/shop?category=${c.slug}`}
              className="group relative flex items-center gap-6 rounded-3xl p-8 h-full overflow-hidden"
              style={{
                background:
                  c.accent === "wood"
                    ? "linear-gradient(135deg, #efe1c5, #e6d5ac)"
                    : "linear-gradient(135deg, #e7e9dc, #d9ddc7)",
              }}
            >
              <div className="h-24 w-24 shrink-0 opacity-90 group-hover:scale-105 transition-transform">
                <ProductArt art={artByCategory[c.slug]} />
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink">{c.name}</h3>
                <p className="mt-1.5 text-sm text-ink-soft max-w-[26ch]">{c.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-wood transition-colors">
                  View Collection <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
