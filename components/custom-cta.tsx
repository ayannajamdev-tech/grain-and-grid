import Link from "next/link";
import { PenTool } from "lucide-react";
import { Reveal } from "./reveal";

export function CustomCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <div className="rounded-3xl border border-line bg-white p-10 md:p-14 text-center flex flex-col items-center">
          <span className="h-12 w-12 rounded-full bg-cream-deep flex items-center justify-center text-wood">
            <PenTool size={20} />
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink mt-5 text-balance max-w-xl">
            Have something specific in mind?
          </h2>
          <p className="mt-4 text-ink-soft max-w-lg leading-relaxed">
            From classroom furniture to custom educational materials, we build
            to your dimensions, quantities and reference designs.
          </p>
          <Link
            href="/custom"
            className="mt-7 bg-wood hover:bg-wood-dark text-white rounded-full px-7 py-3.5 font-medium btn-shadow transition-colors"
          >
            Discuss a Custom Project →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
