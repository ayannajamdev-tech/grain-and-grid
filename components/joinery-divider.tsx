export function JoineryDivider({
  color = "var(--cream)",
  onColor = "var(--wood)",
  flip = false,
}: {
  color?: string;
  onColor?: string;
  flip?: boolean;
}) {
  // A repeating finger-joint pattern — the literal joint that holds two
  // boards together — used as the seam between major sections.
  const teeth = 24;
  const toothWidth = 100 / teeth;
  return (
    <div
      aria-hidden
      className="w-full overflow-hidden leading-none"
      style={{ height: 16, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox={`0 0 ${teeth * 10} 16`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <rect width="100%" height="16" fill={onColor} />
        {Array.from({ length: teeth }).map((_, i) =>
          i % 2 === 0 ? (
            <rect
              key={i}
              x={i * 10}
              y={0}
              width={10}
              height={8}
              fill={color}
            />
          ) : null
        )}
      </svg>
    </div>
  );
}
