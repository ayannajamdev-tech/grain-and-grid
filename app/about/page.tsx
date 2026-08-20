import { Leaf, Hammer, Ruler, Users } from "lucide-react";
import { JoineryDivider } from "@/components/joinery-divider";
import { Reveal } from "@/components/reveal";
import { Breadcrumb } from "@/components/breadcrumb";

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <Breadcrumb items={[{ label: "About Us" }]} />
      </div>

      <section className="mx-auto max-w-3xl px-6 pt-8 pb-16 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-wood font-medium">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 text-balance">
            We started in a workshop full of offcuts nobody wanted.
          </h1>
          <p className="mt-6 text-ink-soft leading-relaxed text-lg">
            Grain &amp; Grid began with a simple frustration: classrooms furnished
            in flexing plastic, kitchens full of boards that warp after a year,
            and toy shelves stacked with things that snap. We started building
            the alternative — one desk, one board, one toy at a time — and kept
            the offcuts, because good wood is never really waste.
          </p>
        </Reveal>
      </section>

      <JoineryDivider />

      <section id="craft" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-wider text-wood font-medium text-center">Our Philosophy</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mt-2 text-center">Why wood, still</h2>
          <p className="mt-4 text-ink-soft leading-relaxed text-center max-w-2xl mx-auto">
            Plastic is cheap because it&rsquo;s disposable. Wood costs more up
            front and less over time — it repairs instead of cracking, it ages
            instead of degrading, and it can be handed down instead of thrown
            out. For schools and families making decade-long decisions, that
            trade only goes one way.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Hammer,
              title: "Our Craftsmanship",
              text: "Every joint is cut, fit and sanded by hand before finishing — no staples, no particleboard shortcuts.",
            },
            {
              icon: Leaf,
              title: "Materials",
              text: "Oak, beech, ash, walnut, acacia and mango wood, sourced from suppliers who share our standards.",
            },
            {
              icon: Ruler,
              title: "Quality Standards",
              text: "Every institutional order is tested for weight, wobble and edge safety before it leaves the workshop.",
            },
            {
              icon: Users,
              title: "Our Customers",
              text: "Schools furnishing classrooms, parents choosing a child's first toy, and kitchens retiring their plastic.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="text-center">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-cream-deep flex items-center justify-center text-wood">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-medium text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <JoineryDivider />

      <section id="sustainability" className="bg-ink text-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-cream/60 font-medium">Sustainability</p>
            <h2 className="font-display text-3xl md:text-4xl mt-2 text-balance">
              A slower supply chain, on purpose
            </h2>
            <p className="mt-5 text-cream/75 leading-relaxed max-w-2xl mx-auto">
              We work with a small number of timber suppliers we can actually
              visit, finish everything in low-VOC, child-safe oils and
              lacquers, and build furniture meant to be repaired rather than
              replaced. It&rsquo;s a smaller catalog than a plastic manufacturer
              could offer — that&rsquo;s the point.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
