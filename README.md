# The Breakfast Club

A high-protein breakfast recipe generator that works from your actual pantry. Tell it what you have stocked, how many people you're feeding, and your dietary preference — it paints you a recipe card with watercolor illustrations and tracks what you use.

---

## The Problem

Most mornings you either cook the same thing on autopilot or stare blankly into the fridge. You want variety, but you also want to stay within macros — and you never want to realise mid-cook that you're missing an ingredient. This app solves all three.

---

## What It Does

| Feature | Description |
|---|---|
| **Weekly pantry input** | Enter your grocery stock-up once a week (items + quantities). The app remembers it for every breakfast that week. |
| **Per-morning preferences** | Each morning, set the number of people and a dietary filter (Veg / Non-Veg / No Egg). |
| **Recipe generation** | Generates a high-protein breakfast recipe based on what's available in your pantry. |
| **Macro display** | Every recipe shows protein (g), calories (kcal), cooking time, and servings at a glance. |
| **"I cooked it" flow** | Mark a recipe as cooked → ingredients are automatically subtracted from pantry quantities. |
| **"Didn't cook it" flow** | Dismiss a recipe without touching the pantry; try another. |
| **Missing ingredient callout** | Recipe card highlights any ingredients not currently in your pantry so you know what to grab. |
| **Running Low screen** | After cooking, see what's out of stock or nearly gone — your ready-made shopping list. |

---

## App Flow

```
Landing
  └─ Pantry  (add weekly grocery stock-up, pick day of week)
       └─ Good Morning  (number of people + dietary preference)
            └─ Cooking  (animated buffer — "matching macros...")
                 └─ Recipe Card  (ingredients, steps, macros)
                      ├─ I cooked it  ──► Bon Appétit  ──► Running Low
                      └─ Didn't cook  ──► Maybe Next Time  ──► back to Pantry
```

---

## Screens

### 1. Landing
Book-cover style entry point with scattered watercolor ingredient illustrations. Three layout variants: **Cover** (centered scatter), **Spread** (open-book), **Minimal** (single hero ingredient).

### 2. Your Pantry — at a Glance
Weekly grocery list. Add items with name, quantity, and unit. Quantities are editable with ± buttons. Day-of-week selector anchors the list to your shopping day. Watercolor ingredient art renders inline next to each item.

### 3. Good Morning
Two questions:
- **Company?** — stepper for number of people (scales recipe quantities)
- **Preferences?** — segmented pick for Veg / Non-Veg / No Egg

### 4. Cooking (Buffer Page)
Animated screen while the recipe is "being cooked" — cyclic loading messages ("checking your pantry...", "matching macros...", "painting the plate...") with a wobbling pan illustration.

### 5. Recipe Card
Three layout variants (Classic, Postcard, Editorial). Always shows:
- Recipe title + subtitle
- Macro strip: protein · kcal · time · serves
- Ingredient chips (green border = in pantry, red dashed = missing)
- "NEED!" badge on missing ingredients
- Step-by-step cooking method
- **I cooked it** / **I didn't cook it** buttons

### 6. Running Low
Post-cook shopping list. Separates **out of stock** (qty = 0) from **running low** (qty ≤ 2). Ready to screenshot before your next grocery run.

---

## Dietary Filters

| Option | Behaviour |
|---|---|
| Veg | Excludes meat, fish, and eggs |
| Non-Veg | No restrictions |
| No Egg | Excludes egg-based recipes |

---

## Pantry & Ingredient Logic

- Pantry items are stored in React state, seeded with sensible defaults on first load.
- When a recipe is cooked, ingredient quantities used are subtracted from pantry quantities (floored at 0).
- The recipe card checks each ingredient against the pantry and flags anything missing.
- The Running Low screen uses `qty === 0` for "out of stock" and `qty <= 2` for "running low".

---

## Design System

The UI is built on a hand-crafted watercolor / recipe-journal aesthetic:

- **Paper textures** — CSS radial gradients + SVG fractal noise overlay
- **Watercolor illustrations** — actual hand-painted PNGs for 17 common ingredients (egg, tomato, onion, milk, cheese, butter, oil, yogurt, flour, potatoes, salt, pepper, pasta, water, soy sauce, cinnamon, purple onion)
- **Typography** — Allura (script titles), Caveat / Patrick Hand (handwritten body), Cormorant Garamond (editorial body)
- **Design tokens** — all colours, fonts, spacing, radii, and shadows in `breakfast-club/tokens.css`

### Colour Palette

| Token | Hex | Use |
|---|---|---|
| `--bc-tomato` | `#d9472a` | Primary accent — CTAs, titles, alerts |
| `--bc-paper` | `#fbf3e3` | Main background |
| `--bc-card` | `#fffaf0` | Recipe card surface |
| `--bc-leaf` | `#7d9558` | Secondary accent — success, veg, sage |
| `--bc-butter` | `#f0c987` | Warm highlight blobs |
| `--bc-coral` | `#e0848a` | Soft pink accent |
| `--bc-ink` | `#2a221a` | Primary text |
| `--bc-ink-soft` | `#5a4a38` | Secondary text |
| `--bc-ink-muted` | `#8a7960` | Hints, labels |

---

## Tweaks Panel (Developer)

A floating panel (bottom-right) lets you switch between layout variants and palette options at runtime without touching code:

- **Landing layout** — Cover / Spread / Minimal
- **Recipe card layout** — Classic / Postcard / Editorial
- **Paper tone** — Cream / Ivory / Peach / Sage
- **Accent colour** — Tomato / Coral / Terracotta / Plum

The bottom nav bar lets you jump directly to any screen for quick iteration.

---

## Project Structure

```
the-breakfast-club/
├── index.html                    # Entry point
├── README.md
├── TECH_STACK.md
└── breakfast-club/
    ├── tokens.css                # Design tokens (colours, fonts, spacing)
    ├── styles.css                # Global styles, components, animations
    ├── tweaks-panel.jsx          # Runtime tweaks panel + useTweaks hook
    ├── illustrations.jsx         # Ingredient image resolver + ShakshukaPan SVG
    ├── topbar.jsx                # Shared top navigation bar
    ├── app.jsx                   # Root component — state, routing, screen orchestration
    ├── screen-landing.jsx        # Landing screen (3 variants)
    ├── screen-pantry.jsx         # Pantry management screen
    ├── screen-morning.jsx        # Morning preferences screen
    ├── screen-cooking.jsx        # Cooking buffer + Cooked/NotCooked states
    ├── screen-recipe.jsx         # Recipe card (3 variants)
    ├── screen-runninglow.jsx     # Running low / shopping list screen
    └── ingredients/              # Watercolor PNG assets
        ├── egg.png
        ├── tomato.png
        ├── onion.png
        ├── onion_yellow.png
        ├── milk.png
        ├── cheese.png
        ├── butter.png
        ├── oil.png
        ├── yogurt.png
        ├── flour.png
        ├── potatoes.png
        ├── salt.png
        ├── pepper.png
        ├── pasta.png
        ├── water.png
        ├── soy.png
        └── cinnamon.png
```

---

## Running Locally

No build step needed. This is a zero-dependency frontend — just open `index.html` in a browser.

```bash
# If you want a local dev server (avoids CORS on file:// for the JSX scripts):
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080`.

> The app uses Babel Standalone to transpile JSX in the browser at runtime. This is fine for development and prototyping. For a production build, migrate to Vite + React (see TECH_STACK.md for the recommended upgrade path).

---

## MVP Roadmap

### MVP 1 — Current
- [x] Pantry input with weekly stock-up
- [x] Morning preferences (people count, dietary filter)
- [x] Recipe generation (Shakshuka — hardcoded)
- [x] "I cooked it" → pantry subtraction
- [x] "Didn't cook it" → try again
- [x] Missing ingredient callout on recipe card
- [x] Running Low / shopping list screen

### MVP 2 — Next
- [ ] **Regenerate** — button on recipe card to get a different recipe
- [ ] **AI recipe generation** — Claude API integration to generate recipes dynamically based on actual pantry contents + dietary preference
- [ ] **Multiple recipes** — suggest 2–3 options and let user pick
- [ ] **Grocery counter** — track how often an ingredient is used to inform re-stocking quantities
- [ ] **Persistent pantry** — save pantry to localStorage so it survives page refresh

### MVP 3 — Vision
- [ ] Full macro tracking across the week
- [ ] Suggest missing ingredients to complete more recipes ("if you added X, you could also make Y")
- [ ] Export shopping list as text / share

---

## Credits

- Watercolor ingredient illustrations: original hand-painted reference assets
- Watercolor recipe card inspo: journal-style illustrated recipe aesthetic
- Fonts: Google Fonts (Allura, Caveat, Patrick Hand, Patrick Hand SC, Kalam, Cormorant Garamond)
