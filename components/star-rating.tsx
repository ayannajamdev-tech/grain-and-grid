import { Star } from "lucide-react";

export function StarRating({
  rating,
  size = 14,
  showValue = false,
  count,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-wood text-wood" : "fill-none text-line"}
              strokeWidth={filled ? 0 : 1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-ink-soft">
          {rating.toFixed(1)}
          {typeof count === "number" && (
            <span className="text-ink-soft/70"> ({count})</span>
          )}
        </span>
      )}
    </div>
  );
}
