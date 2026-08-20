"use client";

import { useState } from "react";
import { Product, Review } from "@/lib/types";
import { StarRating } from "./star-rating";

export function Reviews({ product }: { product: Product }) {
  const [extraReviews, setExtraReviews] = useState<Review[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const allReviews = [...extraReviews, ...product.reviews];
  const totalCount = product.reviewCount + extraReviews.length;
  const avgRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : product.rating;

  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = allReviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, pct: allReviews.length ? (count / allReviews.length) * 100 : 0 };
  });

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !comment.trim()) return;
    setExtraReviews((prev) => [
      {
        id: `local-${Date.now()}`,
        name: name.trim(),
        rating,
        title: title.trim(),
        comment: comment.trim(),
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
    setName("");
    setTitle("");
    setComment("");
    setRating(5);
    setFormOpen(false);
  };

  return (
    <div id="reviews" className="grid md:grid-cols-[280px_1fr] gap-10">
      <div>
        <p className="text-5xl font-display text-ink">{avgRating.toFixed(1)}</p>
        <StarRating rating={avgRating} size={18} />
        <p className="mt-2 text-sm text-ink-soft">Based on {totalCount} reviews</p>
        <div className="mt-5 space-y-1.5">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-xs text-ink-soft">
              <span className="w-8">{d.star}★</span>
              <span className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                <span className="block h-full bg-wood" style={{ width: `${d.pct}%` }} />
              </span>
              <span className="w-5 text-right">{d.count}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="mt-6 w-full border border-ink rounded-full py-2.5 text-sm font-medium hover:bg-ink hover:text-cream transition-colors"
        >
          {formOpen ? "Cancel" : "Write a Review"}
        </button>

        {formOpen && (
          <form onSubmit={submitReview} className="mt-4 space-y-3 bg-white border border-line rounded-2xl p-4">
            <div>
              <label className="text-xs text-ink-soft">Your rating</label>
              <div className="mt-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => setRating(n)} aria-label={`Rate ${n} stars`}>
                    <StarRating rating={n <= rating ? 5 : 0} size={18} />
                  </button>
                ))}
              </div>
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-wood"
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Review title"
              required
              className="w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-wood"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience"
              required
              rows={3}
              className="w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-wood resize-none"
            />
            <button
              type="submit"
              className="w-full bg-wood hover:bg-wood-dark text-white rounded-full py-2.5 text-sm font-medium transition-colors"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>

      <div className="divide-y divide-line">
        {allReviews.length === 0 && (
          <p className="text-sm text-ink-soft py-4">No reviews yet — be the first to share one.</p>
        )}
        {allReviews.map((r) => (
          <div key={r.id} className="py-5 first:pt-0">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-ink text-sm">{r.name}</p>
              <p className="text-xs text-ink-soft">
                {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="mt-1.5">
              <StarRating rating={r.rating} size={13} />
            </div>
            <p className="mt-2 text-sm font-medium text-ink">{r.title}</p>
            <p className="mt-1 text-sm text-ink-soft leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
