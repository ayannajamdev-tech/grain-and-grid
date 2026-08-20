import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { ProductArt } from "./product-art";
import { Reveal } from "./reveal";

export function SchoolsCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink text-cream grid md:grid-cols-[1.3fr_1fr] items-center">
          <div className="p-10 md:p-14">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-cream/70">
              <GraduationCap size={16} /> Built for schools
            </span>
            <h2 className="font-display text-3xl md:text-4xl mt-3 text-balance">
              Furnishing an entire school?
            </h2>
            <p className="mt-4 text-cream/70 max-w-lg leading-relaxed">
              Classroom furniture, kindergarten sets, educational materials and
              custom builds — planned around your floor plan, budget and term
              dates, not a one-size checkout.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/schools"
                className="bg-sage hover:bg-sage-dark rounded-full px-6 py-3 text-sm font-medium transition-colors"
              >
                Request a School Quote →
              </Link>
              <Link
                href="/schools"
                className="border border-cream/25 hover:border-cream/60 rounded-full px-6 py-3 text-sm font-medium transition-colors"
              >
                See what we provide
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4 p-10 opacity-90">
            <div className="h-28 w-28"><ProductArt art="desk" /></div>
            <div className="h-28 w-28 mt-8"><ProductArt art="bookshelf" /></div>
            <div className="h-28 w-28"><ProductArt art="chair" /></div>
            <div className="h-28 w-28 mt-8"><ProductArt art="bench" /></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
