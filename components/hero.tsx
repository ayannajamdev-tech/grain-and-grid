import Link from "next/link";
import { ProductArt } from "./product-art";

export function Hero() {
  return (
    <section className="relative overflow-hidden wood-grain-bg">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-wood bg-wood/10 px-3 py-1.5 rounded-full">
            Solid wood · Est. for schools, kitchens &amp; nurseries
          </span>
          <h1 className="font-display text-balance text-[2.75rem] leading-[1.05] md:text-6xl md:leading-[1.05] text-ink mt-5">
            Made from wood.
            <br />
            Made to <span className="italic text-wood">matter.</span>
          </h1>
          <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-md">
            Thoughtfully crafted furniture, educational materials, toys and
            everyday products — designed for learning, living and lasting
            use, one grain at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="bg-wood hover:bg-wood-dark text-white rounded-full px-7 py-3.5 font-medium btn-shadow transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              href="/schools"
              className="border border-ink/20 hover:border-ink text-ink rounded-full px-7 py-3.5 font-medium transition-colors"
            >
              For Schools &amp; Institutions
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square max-w-md rounded-[2.5rem] bg-gradient-to-br from-cream-deep to-cream-deeper grid-texture-bg overflow-hidden">
            <div className="absolute left-8 bottom-14 h-28 w-28 md:h-36 md:w-36 drop-shadow-sm">
              <ProductArt art="alphabet-board" />
            </div>
            <div className="absolute right-6 top-10 h-24 w-24 md:h-32 md:w-32 drop-shadow-sm">
              <ProductArt art="rocking-horse" />
            </div>
            <div className="absolute right-10 bottom-8 h-20 w-20 md:h-28 md:w-28 drop-shadow-sm">
              <ProductArt art="cutting-board" />
            </div>
            <div className="absolute left-1/2 top-6 -translate-x-1/2 h-16 w-16 md:h-20 md:w-20 drop-shadow-sm">
              <ProductArt art="stacking-rings" />
            </div>
            <div
              aria-hidden
              className="absolute left-6 right-6 bottom-6 h-2 rounded-full bg-wood/15"
            />
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 bg-white rounded-2xl shadow-lg px-5 py-3.5 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {["#7a4a26", "#6f7856", "#a97b4c"].map((c) => (
                <span
                  key={c}
                  className="h-7 w-7 rounded-full border-2 border-white"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">4.8/5 average rating</p>
              <p className="text-xs text-ink-soft">700+ families &amp; schools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
