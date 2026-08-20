"use client";

import { useState } from "react";
import { GraduationCap, PackageCheck, Ruler, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/reveal";
import { ProductArt } from "@/components/product-art";
import { JoineryDivider } from "@/components/joinery-divider";

const offerings = [
  "Classroom furniture",
  "Kindergarten furniture",
  "Educational materials",
  "Custom furniture",
  "Bulk orders",
  "Institutional solutions",
];

export default function SchoolsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Breadcrumb items={[{ label: "For Schools" }]} />
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-6 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-wood font-medium">
            <GraduationCap size={16} /> Built for schools
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 text-balance">
            Furniture and materials for classrooms, not just customers.
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed">
            We work with schools directly — planning quantities against your
            floor plan, staging delivery around your term dates, and building
            to the safety spec your youngest students need.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cream-deep rounded-2xl p-6 h-28"><ProductArt art="desk" /></div>
            <div className="bg-cream-deep rounded-2xl p-6 h-28 mt-8"><ProductArt art="bookshelf" /></div>
            <div className="bg-cream-deep rounded-2xl p-6 h-28"><ProductArt art="alphabet-board" /></div>
            <div className="bg-cream-deep rounded-2xl p-6 h-28 mt-8"><ProductArt art="bench" /></div>
          </div>
        </Reveal>
      </section>

      <JoineryDivider />

      <section id="bulk" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: PackageCheck, title: "Bulk pricing", text: "Tiered pricing on classroom-sized and school-wide orders." },
            { icon: Ruler, title: "Custom specs", text: "Corner radius, sizing and finish adjusted to your safety policy." },
            { icon: Truck, title: "Staged delivery", text: "Furniture arrives on a schedule that fits your renovation, not ours." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="mx-auto h-14 w-14 rounded-2xl bg-cream-deep flex items-center justify-center text-wood">
                <f.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-medium text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{f.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-2.5">
          {offerings.map((o) => (
            <span key={o} className="text-sm bg-cream-deep rounded-full px-4 py-2 text-ink-soft">
              {o}
            </span>
          ))}
        </div>
      </section>

      <section id="quote-form" className="bg-cream-deep">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="font-display text-3xl text-ink text-center">Request a School Quote</h2>
          <p className="mt-2 text-ink-soft text-center">
            Tell us what you need and we&rsquo;ll help you plan your order.
          </p>

          {submitted ? (
            <div className="mt-8 bg-white rounded-2xl p-8 text-center">
              <p className="font-display text-2xl text-ink">Quote request received</p>
              <p className="mt-2 text-ink-soft">
                A member of our institutional team will follow up within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-8 bg-white rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Contact Name" name="name" required />
                <Field label="School / Institution" name="school" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <label className="block">
                <span className="text-xs text-ink-soft">What do you need?</span>
                <select
                  name="need"
                  className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood"
                  defaultValue="Classroom furniture"
                >
                  <option>Classroom furniture</option>
                  <option>Kindergarten furniture</option>
                  <option>Educational materials</option>
                  <option>A mix of furniture and materials</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Approximate Quantity" name="quantity" placeholder="e.g. 40 desks" />
                <Field label="Target Timeline" name="timeline" placeholder="e.g. Before next term" />
              </div>
              <label className="block">
                <span className="text-xs text-ink-soft">Anything else we should know?</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood resize-none"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-wood hover:bg-wood-dark text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
              >
                Submit Quote Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-ink-soft">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood"
      />
    </label>
  );
}
