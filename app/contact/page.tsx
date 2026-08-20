"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

const paths = [
  { label: "For Orders", detail: "Questions about an existing order or delivery." },
  { label: "For Schools", detail: "Furnishing a classroom or institution." },
  { label: "For Custom Projects", detail: "A build we don't currently list." },
  { label: "For Wholesale", detail: "Stocking Grain & Grid in your store." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumb items={[{ label: "Contact" }]} />
      <div className="mt-4 grid lg:grid-cols-[1fr_380px] gap-14">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-ink">Get in Touch</h1>
          <p className="mt-3 text-ink-soft max-w-lg">
            Whether it&rsquo;s a single gift or a full school fit-out, tell us
            what you need and we&rsquo;ll get back to you within one business day.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-cream-deep p-8 text-center max-w-lg">
              <p className="font-display text-2xl text-ink">Message sent</p>
              <p className="mt-2 text-ink-soft">
                Thank you for reaching out — our team will reply shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-8 space-y-4 max-w-lg"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Phone" name="phone" type="tel" />
              <label className="block">
                <span className="text-xs text-ink-soft">Subject</span>
                <select
                  name="subject"
                  className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood bg-white"
                  defaultValue="Orders"
                >
                  <option>Orders</option>
                  <option>Schools &amp; Institutions</option>
                  <option>Custom Projects</option>
                  <option>Wholesale</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-ink-soft">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood bg-white resize-none"
                />
              </label>
              <button
                type="submit"
                className="bg-wood hover:bg-wood-dark text-white rounded-full px-7 py-3.5 font-medium btn-shadow transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-cream-deep rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3 text-sm">
              <Phone size={17} className="text-wood mt-0.5 shrink-0" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Mail size={17} className="text-wood mt-0.5 shrink-0" />
              <span>hello@grainandgrid.pk</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={17} className="text-wood mt-0.5 shrink-0" />
              <span>Workshop &amp; showroom, Karachi, Pakistan</span>
            </div>
          </div>

          <div id="wholesale" className="space-y-3">
            {paths.map((p) => (
              <div key={p.label} className="border border-line rounded-xl p-4">
                <p className="text-sm font-medium text-ink">{p.label}</p>
                <p className="text-xs text-ink-soft mt-1">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-ink-soft">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood bg-white"
      />
    </label>
  );
}
