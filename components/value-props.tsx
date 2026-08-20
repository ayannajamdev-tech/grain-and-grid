import { Leaf, ShieldCheck, BookOpen, Recycle, Ruler } from "lucide-react";
import { Reveal } from "./reveal";

const props = [
  {
    icon: Leaf,
    title: "Natural Materials",
    text: "Thoughtfully selected solid wood and low-VOC, child-safe finishes throughout.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    text: "Joined, not glued-and-stapled — furniture designed for daily institutional use.",
  },
  {
    icon: BookOpen,
    title: "Made for Learning",
    text: "Educational materials designed to encourage exploration, not just occupy hands.",
  },
  {
    icon: Recycle,
    title: "Plastic Alternatives",
    text: "Everyday kitchen and home products that replace plastic with something honest.",
  },
  {
    icon: Ruler,
    title: "Custom Solutions",
    text: "Furniture and materials tailored to your classroom, kitchen or nursery brief.",
  },
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <h2 className="font-display text-3xl md:text-4xl text-ink text-center">
          Crafted with purpose
        </h2>
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {props.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="text-center flex flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-cream-deep flex items-center justify-center text-wood">
              <p.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 font-medium text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
