"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="text-sm text-sage-light">You&rsquo;re on the list — thank you.</p>;
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Your email"
        className="min-w-0 flex-1 rounded-full bg-cream/10 border border-cream/20 px-4 py-2.5 text-sm placeholder:text-cream/40 outline-none focus:border-cream/50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-sage px-4 py-2.5 text-sm font-medium hover:bg-sage-dark transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
