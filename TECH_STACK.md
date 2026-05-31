# Tech Stack — The Breakfast Club

## Current Stack (Prototype)

This is a zero-build-step frontend prototype. Everything runs in the browser with no compilation, no package manager, and no server.

---

### Runtime

| Layer | Technology | Version | Notes |
|---|---|---|---|
| UI framework | React | 18.3.1 | Loaded via CDN (unpkg) |
| DOM renderer | ReactDOM | 18.3.1 | CDN |
| JSX transpiler | Babel Standalone | 7.29.0 | In-browser transpilation — for prototyping only |
| Markup | HTML5 | — | Single `index.html` entry point |
| Styling | CSS3 | — | Two files: `tokens.css` + `styles.css` |
| Assets | PNG (watercolor) | — | Hand-painted ingredient images |
| Fonts | Google Fonts | — | Allura, Caveat, Patrick Hand, Kalam, Cormorant Garamond |

### Why this stack?

The entire app opens by double-clicking `index.html`. There is no `npm install`, no bundler, no dev server required. React + Babel Standalone make JSX work directly in `<script type="text/babel">` tags — ideal for rapid UI prototyping without tooling overhead.

---

## Architecture

### State management
Plain React state (`useState`) in `app.jsx`. No external store. State is lifted to the root `<App>` and passed down as props. All pantry mutations happen in the root and flow down.

```
App (root state)
 ├── pantry[]        — weekly ingredient inventory
 ├── day             — selected day of week
 ├── people          — number of people to cook for
 ├── pref            — dietary preference (veg / nonveg / noegg)
 ├── subtracted[]    — ingredients used in last cook (for Cooked screen)
 └── screen          — current screen name (string-based router)
```

### Routing
String-based screen switcher in `app.jsx`. No React Router. A single `screen` state variable drives which component renders:

```
"landing" → "pantry" → "morning" → "cooking" → "recipe"
                                                    ├── "cooked" → "runninglow"
                                                    └── "notcooked"
```

### Component architecture
Each screen is a self-contained component in its own `.jsx` file. Shared primitives are registered on `window` (e.g. `window.TopBar`, `window.Ingredient`) so subsequent `<script>` tags can reference them — a workaround for the lack of ES module support in the Babel Standalone setup.

### Theming
All visual variables are in `breakfast-club/tokens.css` as CSS custom properties on `:root`. The `TweaksPanel` / `useTweaks` hook writes selected accent colour and paper tone back to CSS variables at runtime via `document.documentElement.style.setProperty`.

---

## CDN Integrity Hashes

All external scripts are loaded with SRI (Subresource Integrity) `integrity` attributes to prevent supply-chain tampering:

| Package | Integrity |
|---|---|
| react@18.3.1 | `sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L` |
| react-dom@18.3.1 | `sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm` |
| @babel/standalone@7.29.0 | `sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y` |

---

## Recommended Production Upgrade Path

When moving from prototype to production, replace the CDN + Babel Standalone setup with:

### Build tooling
| Swap | From | To |
|---|---|---|
| Bundler | Babel Standalone (CDN) | **Vite** |
| Package manager | None | **npm** or **pnpm** |
| React import | `window.React` (CDN) | `import React from 'react'` |

### Minimal Vite migration steps

```bash
npm create vite@latest the-breakfast-club -- --template react
cd the-breakfast-club
npm install
```

Move each `.jsx` file into `src/`, add `import` / `export` statements, and convert the `window.*` assignments to named exports. The CSS files and PNG assets move to `src/` or `public/` unchanged.

### Recommended additions for production

| Concern | Recommended tool |
|---|---|
| Persistent pantry | `localStorage` (via a custom `usePantry` hook) |
| Recipe generation | **Claude API** (`claude-sonnet-4-6`) — send pantry + preferences, receive recipe JSON |
| State management (if app grows) | **Zustand** (lightweight) |
| Routing (if multi-page) | **React Router v6** |
| Styling at scale | Keep CSS tokens + modules, or migrate to **Tailwind CSS** |
| Type safety | **TypeScript** |
| Testing | **Vitest** + React Testing Library |
| Deployment | **Vercel** (static site, zero config) |

### Claude API integration sketch (MVP 2)

```js
// POST to Claude with pantry context
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{
    role: "user",
    content: `
      Generate a high-protein breakfast recipe for ${people} people.
      Dietary preference: ${pref}.
      Available ingredients: ${pantry.map(i => `${i.name} (${i.qty} ${i.unit})`).join(', ')}.
      
      Return JSON with: title, subtitle, protein_g, calories, time_min, serves,
      ingredients (name, qty, unit, inPantry), steps[].
    `
  }]
});
```

---

## Browser Support

Works in any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). No polyfills needed. The app does not use any browser APIs beyond:
- `document.documentElement.style.setProperty` (CSS vars)
- `window.addEventListener` / `postMessage` (tweaks panel protocol)
- `Date` (recipe card datestamp)
- `setTimeout` / `setInterval` (cooking buffer animation)

---

## File Sizes (approximate, unminified)

| File | Size |
|---|---|
| `styles.css` | ~9 KB |
| `tokens.css` | ~2 KB |
| `tweaks-panel.jsx` | ~16 KB |
| `illustrations.jsx` | ~4 KB |
| `app.jsx` | ~4 KB |
| `screen-recipe.jsx` | ~12 KB |
| All other screens | ~3–5 KB each |
| Ingredient PNGs (17 files) | ~800 KB total |

React + Babel Standalone CDN scripts are ~1.2 MB combined (development builds). In a production Vite build, the minified React bundle is ~45 KB gzipped.

---

## Security Notes

- No user data is sent anywhere. All state is in-memory React state.
- No authentication, no backend, no database.
- External scripts are pinned to exact versions and verified with SRI hashes.
- When integrating the Claude API (MVP 2), API calls must be proxied through a backend (Next.js API route, Vercel Function, etc.) — never expose the API key in client-side code.
