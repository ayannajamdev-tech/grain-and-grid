export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="26" cy="32" r="19" fill="none" stroke="#7a4a26" strokeWidth="5" />
      <path
        d="M26 15 a17 17 0 0 1 0 34"
        fill="none"
        stroke="#7a4a26"
        strokeWidth="0"
      />
      <path d="M26 32 L38 32 L38 40" stroke="#7a4a26" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="38" cy="32" r="19" fill="none" stroke="#6f7856" strokeWidth="5" opacity="0.9" />
      <path d="M38 15 L38 49 M30 20 L46 20 M29 27 L47 27 M29 37 L47 37 M30 44 L46 44" stroke="#6f7856" strokeWidth="1.6" opacity="0.8" />
    </svg>
  );
}

export function Logo({
  size = "md",
  onDark = false,
}: {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}) {
  const textSize =
    size === "lg" ? "text-3xl md:text-4xl" : size === "sm" ? "text-lg" : "text-xl";
  const mark = size === "lg" ? 48 : size === "sm" ? 26 : 32;
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <LogoMark size={mark} />
      <span
        className={`${textSize} font-[var(--font-logotype)] font-bold tracking-tight leading-none`}
        style={{ color: onDark ? "var(--cream)" : "var(--ink)" }}
      >
        Grain <span style={{ color: "var(--sage)" }}>&amp;</span> Grid
      </span>
    </span>
  );
}
