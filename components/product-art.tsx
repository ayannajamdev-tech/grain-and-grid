const woodStroke = "#7a4a26";
const sageStroke = "#6f7856";
const ink = "#37231a";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      fill="none"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const arts: Record<string, React.ReactNode> = {
  desk: (
    <Frame>
      <rect x="35" y="70" width="130" height="10" rx="2" stroke={woodStroke} />
      <path d="M45 80 L45 150" stroke={ink} />
      <path d="M155 80 L155 150" stroke={ink} />
      <path d="M45 115 L155 115" stroke={sageStroke} strokeDasharray="6 6" />
      <rect x="55" y="90" width="45" height="20" rx="2" stroke={sageStroke} />
      <path d="M40 150 L160 150" stroke={ink} strokeWidth={6} />
    </Frame>
  ),
  chair: (
    <Frame>
      <path d="M60 40 L60 110" stroke={ink} />
      <path d="M140 40 L140 150" stroke={ink} />
      <path d="M60 110 L140 110" stroke={woodStroke} strokeWidth={8} />
      <path d="M60 40 L140 40" stroke={sageStroke} strokeDasharray="4 8" />
      <path d="M60 150 L60 170" stroke={ink} />
      <path d="M140 150 L140 170" stroke={ink} />
      <path d="M65 170 L55 170" stroke={ink} />
      <path d="M145 170 L135 170" stroke={ink} />
    </Frame>
  ),
  table: (
    <Frame>
      <ellipse cx="100" cy="80" rx="70" ry="18" stroke={woodStroke} strokeWidth={6} />
      <path d="M50 88 L40 150" stroke={ink} />
      <path d="M150 88 L160 150" stroke={ink} />
      <path d="M70 92 L65 155" stroke={ink} />
      <path d="M130 92 L135 155" stroke={ink} />
      <path d="M45 152 L165 152" stroke={sageStroke} />
    </Frame>
  ),
  bench: (
    <Frame>
      <rect x="30" y="80" width="140" height="14" rx="3" stroke={woodStroke} strokeWidth={6} />
      <path d="M45 94 L45 140" stroke={ink} />
      <path d="M155 94 L155 140" stroke={ink} />
      <path d="M45 115 L155 115" stroke={sageStroke} strokeDasharray="5 7" />
      <path d="M30 60 Q100 40 170 60" stroke={sageStroke} />
    </Frame>
  ),
  bookshelf: (
    <Frame>
      <rect x="45" y="35" width="110" height="130" rx="4" stroke={ink} />
      <path d="M45 75 L155 75" stroke={woodStroke} strokeWidth={5} />
      <path d="M45 115 L155 115" stroke={woodStroke} strokeWidth={5} />
      <path d="M65 40 L65 72" stroke={sageStroke} />
      <path d="M85 40 L85 72" stroke={sageStroke} />
      <path d="M105 45 L105 72" stroke={sageStroke} />
      <path d="M70 80 L70 112" stroke={sageStroke} />
      <path d="M95 78 L95 112" stroke={sageStroke} />
    </Frame>
  ),
  "alphabet-board": (
    <Frame>
      <rect x="30" y="30" width="140" height="140" rx="8" stroke={sageStroke} strokeWidth={4} />
      <path d="M30 30 L170 170 M170 30 L30 170" stroke={sageStroke} strokeOpacity={0.35} strokeWidth={2} />
      <text x="100" y="112" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight={700} fontSize="70" fill={woodStroke} stroke="none">
        Aa
      </text>
    </Frame>
  ),
  abacus: (
    <Frame>
      <rect x="40" y="35" width="120" height="130" rx="6" stroke={ink} />
      {[60, 85, 110, 135, 160].map((y) => (
        <line key={y} x1="50" y1={y} x2="150" y2={y} stroke={sageStroke} strokeWidth={2} />
      ))}
      {[60, 85, 110, 135, 160].map((y, i) => (
        <g key={y}>
          <circle cx={i % 2 === 0 ? 75 : 65} cy={y} r="9" stroke={woodStroke} fill="none" />
          <circle cx={i % 2 === 0 ? 105 : 120} cy={y} r="9" stroke={woodStroke} fill="none" />
        </g>
      ))}
    </Frame>
  ),
  "shape-sorter": (
    <Frame>
      <rect x="30" y="70" width="140" height="90" rx="10" stroke={woodStroke} strokeWidth={5} />
      <circle cx="65" cy="70" r="16" stroke={sageStroke} />
      <rect x="95" y="54" width="30" height="30" stroke={sageStroke} />
      <polygon points="150,54 165,84 135,84" stroke={sageStroke} />
    </Frame>
  ),
  "counting-tray": (
    <Frame>
      <rect x="30" y="60" width="140" height="90" rx="6" stroke={woodStroke} strokeWidth={5} />
      <path d="M30 90 L170 90" stroke={sageStroke} />
      <path d="M30 120 L170 120" stroke={sageStroke} />
      {[50, 80, 110, 140].map((x) => (
        <circle key={x} cx={x} cy="75" r="7" stroke={ink} fill="none" />
      ))}
      {[50, 80, 110, 140].map((x) => (
        <circle key={x + "b"} cx={x} cy="105" r="7" stroke={ink} fill="none" />
      ))}
    </Frame>
  ),
  "geometry-board": (
    <Frame>
      <circle cx="100" cy="100" r="65" stroke={woodStroke} strokeWidth={5} />
      <path d="M100 35 L100 165" stroke={sageStroke} />
      <path d="M45 100 L155 100" stroke={sageStroke} />
      <path d="M62 62 L138 138" stroke={sageStroke} strokeOpacity={0.5} />
    </Frame>
  ),
  "cutting-board": (
    <Frame>
      <rect x="45" y="30" width="90" height="130" rx="14" stroke={woodStroke} strokeWidth={6} />
      <circle cx="90" cy="45" r="7" stroke={ink} />
      <path d="M60 90 L120 90 M60 110 L120 110 M60 130 L120 130" stroke={sageStroke} strokeOpacity={0.5} />
    </Frame>
  ),
  utensils: (
    <Frame>
      <path d="M65 30 C50 60 55 90 65 100 L65 170" stroke={woodStroke} strokeWidth={6} />
      <ellipse cx="65" cy="45" rx="16" ry="20" stroke={woodStroke} strokeWidth={6} />
      <path d="M135 30 L135 170" stroke={sageStroke} strokeWidth={6} />
      <path d="M120 30 L120 55 M135 30 L135 60 M150 30 L150 55" stroke={sageStroke} strokeWidth={4} />
    </Frame>
  ),
  tray: (
    <Frame>
      <rect x="30" y="70" width="140" height="60" rx="16" stroke={woodStroke} strokeWidth={6} />
      <path d="M20 100 L30 100 M170 100 L180 100" stroke={ink} strokeWidth={6} />
    </Frame>
  ),
  jar: (
    <Frame>
      <path d="M70 60 L70 150 Q70 165 90 165 L110 165 Q130 165 130 150 L130 60" stroke={ink} strokeWidth={5} />
      <rect x="62" y="40" width="76" height="24" rx="8" stroke={woodStroke} strokeWidth={6} />
      <path d="M75 90 L125 90 M75 115 L125 115" stroke={sageStroke} strokeOpacity={0.5} />
    </Frame>
  ),
  "rocking-horse": (
    <Frame>
      <path d="M60 60 Q90 40 120 65 L130 90 L110 95 L100 130" stroke={woodStroke} strokeWidth={6} />
      <path d="M55 65 Q45 60 42 50" stroke={woodStroke} strokeWidth={6} />
      <path d="M100 130 L70 140" stroke={ink} strokeWidth={6} />
      <path d="M40 150 Q100 175 160 150" stroke={sageStroke} strokeWidth={6} />
    </Frame>
  ),
  "stacking-rings": (
    <Frame>
      <path d="M100 165 L100 40" stroke={ink} strokeWidth={6} />
      <ellipse cx="100" cy="150" rx="55" ry="14" stroke={woodStroke} strokeWidth={5} />
      <ellipse cx="100" cy="120" rx="44" ry="12" stroke={sageStroke} strokeWidth={5} />
      <ellipse cx="100" cy="94" rx="33" ry="10" stroke={woodStroke} strokeWidth={5} />
      <ellipse cx="100" cy="72" rx="22" ry="8" stroke={sageStroke} strokeWidth={5} />
    </Frame>
  ),
  "push-toy": (
    <Frame>
      <circle cx="65" cy="145" r="18" stroke={ink} strokeWidth={5} />
      <circle cx="135" cy="145" r="18" stroke={ink} strokeWidth={5} />
      <rect x="45" y="95" width="110" height="35" rx="8" stroke={woodStroke} strokeWidth={5} />
      <path d="M150 95 L175 40" stroke={sageStroke} strokeWidth={6} />
      <circle cx="178" cy="35" r="8" stroke={sageStroke} strokeWidth={4} />
    </Frame>
  ),
  blocks: (
    <Frame>
      <rect x="35" y="110" width="45" height="45" stroke={woodStroke} strokeWidth={5} />
      <rect x="90" y="110" width="45" height="45" stroke={sageStroke} strokeWidth={5} />
      <path d="M40 105 L125 105 A38 38 0 0 0 40 105 Z" stroke={ink} strokeWidth={5} />
      <rect x="130" y="70" width="35" height="35" stroke={sageStroke} strokeWidth={5} transform="rotate(10 147 87)" />
    </Frame>
  ),
};

export function ProductArt({ art }: { art: string }) {
  return arts[art] ?? arts["blocks"];
}
