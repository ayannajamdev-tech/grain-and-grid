"use client";

import { useState } from "react";
import { PenTool, UploadCloud } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

export default function CustomPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumb items={[{ label: "Custom Projects" }]} />
      <div className="mt-4 text-center">
        <span className="mx-auto h-12 w-12 rounded-full bg-cream-deep flex items-center justify-center text-wood">
          <PenTool size={20} />
        </span>
        <h1 className="font-display text-3xl md:text-4xl text-ink mt-5">
          Have something specific in mind?
        </h1>
        <p className="mt-3 text-ink-soft max-w-lg mx-auto">
          From classroom furniture to custom educational materials, we build
          to your dimensions, quantities and reference designs.
        </p>
      </div>

      {submitted ? (
        <div className="mt-10 bg-cream-deep rounded-2xl p-10 text-center">
          <p className="font-display text-2xl text-ink">Project details received</p>
          <p className="mt-2 text-ink-soft">
            We&rsquo;ll review your brief and reach out to discuss feasibility and pricing.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mt-10 bg-white border border-line rounded-2xl p-6 sm:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Company / School (optional)" name="company" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <label className="block">
            <span className="text-xs text-ink-soft">Product Requirement</span>
            <textarea
              name="requirement"
              required
              rows={3}
              placeholder="Describe what you'd like built"
              className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood resize-none"
            />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Quantity" name="quantity" placeholder="e.g. 25 units" />
            <Field label="Dimensions" name="dimensions" placeholder="If known" />
          </div>
          <label className="block">
            <span className="text-xs text-ink-soft">Reference Image (optional)</span>
            <div className="mt-1.5 border border-dashed border-line rounded-lg px-3.5 py-6 text-center">
              <input
                id="ref-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              <label htmlFor="ref-upload" className="cursor-pointer inline-flex flex-col items-center gap-2 text-ink-soft">
                <UploadCloud size={22} className="text-wood" />
                <span className="text-sm">{fileName ?? "Click to upload a reference image"}</span>
              </label>
            </div>
          </label>
          <label className="block">
            <span className="text-xs text-ink-soft">Message</span>
            <textarea
              name="message"
              rows={3}
              className="mt-1.5 w-full border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-wood resize-none"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-wood hover:bg-wood-dark text-white rounded-full py-3.5 font-medium btn-shadow transition-colors"
          >
            Discuss This Project
          </button>
        </form>
      )}
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
