// Watercolor ingredient images, cropped from the user's reference asset sheet.
// Each component returns a real <img> sized via { size, rotate }.

const ING_SRC = {
  egg:        "breakfast-club/ingredients/egg.png",
  eggs:       "breakfast-club/ingredients/egg.png",
  tomato:     "breakfast-club/ingredients/tomato.png",
  tomatoes:   "breakfast-club/ingredients/tomato.png",
  onion:      "breakfast-club/ingredients/onion.png",       // purple
  onions:     "breakfast-club/ingredients/onion.png",
  "onion (yellow)": "breakfast-club/ingredients/onion_yellow.png",
  milk:       "breakfast-club/ingredients/milk.png",
  cheese:     "breakfast-club/ingredients/cheese.png",
  feta:       "breakfast-club/ingredients/cheese.png",
  paneer:     "breakfast-club/ingredients/cheese.png",
  butter:     "breakfast-club/ingredients/butter.png",
  salt:       "breakfast-club/ingredients/salt.png",
  pepper:     "breakfast-club/ingredients/pepper.png",
  "bell pepper": "breakfast-club/ingredients/pepper.png",
  peppers:    "breakfast-club/ingredients/pepper.png",
  oil:        "breakfast-club/ingredients/oil.png",
  "olive oil": "breakfast-club/ingredients/oil.png",
  yogurt:     "breakfast-club/ingredients/yogurt.png",
  curd:       "breakfast-club/ingredients/yogurt.png",
  cream:      "breakfast-club/ingredients/yogurt.png",
  flour:      "breakfast-club/ingredients/flour.png",
  potatoes:   "breakfast-club/ingredients/potatoes.png",
  potato:     "breakfast-club/ingredients/potatoes.png",
  water:      "breakfast-club/ingredients/water.png",
  soy:        "breakfast-club/ingredients/soy.png",
  "soy sauce": "breakfast-club/ingredients/soy.png",
  cinnamon:   "breakfast-club/ingredients/cinnamon.png",
  pasta:      "breakfast-club/ingredients/pasta.png",
  // for things we don't have a real image of, alias to similar
  garlic:     "breakfast-club/ingredients/onion_yellow.png",
  parsley:    null,
  cilantro:   null,
  coriander:  null,
  herb:       null,
  cumin:      "breakfast-club/ingredients/cinnamon.png",
  paprika:    "breakfast-club/ingredients/cinnamon.png",
  bread:      "breakfast-club/ingredients/flour.png",
  coffee:     "breakfast-club/ingredients/soy.png",
};

function resolveIngredientSrc(name) {
  if (!name) return null;
  const n = String(name).toLowerCase().trim();
  if (ING_SRC[n] !== undefined) return ING_SRC[n];
  // partial match
  for (const k of Object.keys(ING_SRC)) {
    if (n.includes(k) || k.includes(n)) return ING_SRC[k];
  }
  return null;
}

// Painted parsley/herb fallback — SVG (no real watercolor asset for it)
function HerbSprig({ size = 80, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
         style={{ transform: `rotate(${rotate}deg)`, overflow: "visible" }}>
      <path d="M 50 90 Q 48 60 50 28" fill="none" stroke="#5a7a3a" strokeWidth="1.6" strokeLinecap="round" />
      {[
        [30, 60, 14, 10, -25], [70, 56, 14, 10, 20],
        [26, 44, 12, 9, -20], [72, 40, 12, 9, 25],
        [42, 30, 10, 8, -10], [58, 26, 11, 8, 15], [50, 18, 12, 9, 0],
      ].map(([cx, cy, rx, ry, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#7d9558" opacity="0.85" />
          <ellipse cx={cx - 2} cy={cy - 2} rx={rx * 0.5} ry={ry * 0.5} fill="#a5c180" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

// Main: <Ingredient name="tomato" size={120} rotate={-8} />
function Ingredient({ name, size = 80, rotate = 0, style }) {
  const src = resolveIngredientSrc(name);
  const transform = `rotate(${rotate}deg)`;
  if (!src) {
    return <HerbSprig size={size} rotate={rotate} />;
  }
  return (
    <img
      src={src}
      alt={name}
      draggable={false}
      style={{
        height: size, width: "auto", maxWidth: size * 1.4,
        objectFit: "contain",
        transform,
        display: "inline-block",
        userSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

// Specialised: a "shakshuka pan" — composite of tomato + egg + onion + herb in a pan illustration.
// We'll render the egg + tomato halves arranged inside an SVG skillet.
function ShakshukaPan({ size = 360 }) {
  return (
    <div style={{
      position: "relative", width: size, height: size,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* skillet base */}
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <ellipse cx="50" cy="52" rx="40" ry="38" fill="rgba(60, 40, 30, 0.35)" />
        <ellipse cx="50" cy="50" rx="38" ry="36" fill="#4a3328" />
        <ellipse cx="50" cy="50" rx="34" ry="32" fill="#a8341f" />
        <ellipse cx="50" cy="50" rx="34" ry="32" fill="#d9472a" opacity="0.85" />
        {/* tomato blobs in sauce */}
        <circle cx="36" cy="44" r="5" fill="#a8341f" opacity="0.6" />
        <circle cx="60" cy="58" r="4" fill="#a8341f" opacity="0.55" />
        <circle cx="55" cy="38" r="3" fill="#a8341f" opacity="0.5" />
        {/* eggs */}
        <ellipse cx="40" cy="44" rx="9" ry="7.5" fill="#fbf5e6" />
        <ellipse cx="40" cy="44" rx="3.2" ry="2.8" fill="#f2b85a" />
        <ellipse cx="60" cy="48" rx="9" ry="7.5" fill="#fbf5e6" />
        <ellipse cx="60" cy="48" rx="3.2" ry="2.8" fill="#f2b85a" />
        <ellipse cx="48" cy="60" rx="8" ry="6.5" fill="#fbf5e6" />
        <ellipse cx="48" cy="60" rx="3" ry="2.5" fill="#f2b85a" />
        {/* herb specs */}
        {[[34, 56], [56, 40], [66, 64], [42, 70], [70, 46]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill="#5a7a3a" />
        ))}
      </svg>
    </div>
  );
}

Object.assign(window, { Ingredient, HerbSprig, ShakshukaPan, resolveIngredientSrc });
