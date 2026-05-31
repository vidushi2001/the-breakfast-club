// GOOD MORNING screen
const { TopBar } = window;

const PREFS = [
  { id: "veg",    label: "Veg",     icon: "🌱" },
  { id: "nonveg", label: "Non-Veg", icon: "🍗" },
  { id: "noegg",  label: "No Egg",  icon: "🥚" },
];

const GoodMorning = ({ people, setPeople, pref, setPref, onNext, onBack }) => (
  <div className="bc-paper" style={{ position: "absolute", inset: 0, overflow: "auto" }}>
    <TopBar onBack={onBack} page={2} />
    <div className="bc-blob" style={{ top: "12%", right: "10%", width: 280, height: 220, background: "var(--bc-butter)" }} />
    <div className="bc-blob" style={{ bottom: "16%", left: "10%", width: 240, height: 200, background: "var(--bc-sage)" }} />

    <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 60px 60px", position: "relative" }}>
      <div style={{ position: "absolute", top: 80, right: 20, width: 160, height: 160 }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          <circle cx="50" cy="50" r="22" fill="#f2b85a" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#e8a04a" strokeWidth="1" opacity="0.6" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30) * Math.PI / 180;
            return <line key={i}
              x1={50 + Math.cos(a) * 28} y1={50 + Math.sin(a) * 28}
              x2={50 + Math.cos(a) * 40} y2={50 + Math.sin(a) * 40}
              stroke="#e8a04a" strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </svg>
      </div>

      <div className="bc-fadeup">
        <div className="bc-label" style={{ fontSize: 16, color: "var(--bc-ink-muted)", letterSpacing: 4 }}>— PAGE TWO —</div>
        <h1 className="bc-script" style={{ fontSize: 130, margin: "8px 0 0", fontStyle: "italic" }}>
          good <span style={{ color: "var(--bc-tomato)" }}>morning</span>.
        </h1>
        <p className="bc-hand" style={{ fontSize: 22, color: "var(--bc-ink-soft)", marginTop: 8, maxWidth: 520 }}>
          A few quick details before we light the stove.
        </p>
      </div>

      <div className="bc-card" style={{ marginTop: 40, padding: "28px 32px", position: "relative" }}>
        <div className="bc-tape" style={{ top: -12, left: 60, transform: "rotate(-3deg)" }} />
        <div className="bc-hand" style={{ fontSize: 26, marginBottom: 4 }}>
          Do you have company today? <span style={{ color: "var(--bc-coral)" }}>(wink)</span>
        </div>
        <div className="bc-hand" style={{ fontSize: 16, color: "var(--bc-ink-muted)" }}>
          how many plates are we painting?
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 20 }}>
          <button className="bc-hand" onClick={() => setPeople(Math.max(1, people - 1))}
            style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid var(--bc-ink)",
                     background: "var(--bc-card)", fontSize: 28, cursor: "pointer" }}>−</button>
          <div className="bc-script" style={{ fontSize: 110, minWidth: 80, textAlign: "center", color: "var(--bc-tomato)", fontStyle: "italic", lineHeight: 1 }}>
            {people}
          </div>
          <button className="bc-hand" onClick={() => setPeople(people + 1)}
            style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid var(--bc-ink)",
                     background: "var(--bc-card)", fontSize: 28, cursor: "pointer" }}>+</button>
          <div className="bc-hand" style={{ fontSize: 22, marginLeft: 12, color: "var(--bc-ink-soft)" }}>
            {people === 1 ? "just you" : `${people} people`}
          </div>
        </div>
      </div>

      <div className="bc-card" style={{ marginTop: 24, padding: "28px 32px", position: "relative" }}>
        <div className="bc-tape" style={{ top: -12, right: 60, transform: "rotate(4deg)" }} />
        <div className="bc-hand" style={{ fontSize: 26, marginBottom: 4 }}>
          Any <span className="bc-underline">preferences</span>?
        </div>
        <div className="bc-hand" style={{ fontSize: 16, color: "var(--bc-ink-muted)" }}>
          pick one — we'll respect it.
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
          {PREFS.map((p) => (
            <button key={p.id} onClick={() => setPref(p.id)} className="bc-hand"
              style={{
                padding: "16px 26px", borderRadius: 18, cursor: "pointer",
                background: pref === p.id ? "var(--bc-sage)" : "var(--bc-card)",
                border: `2px solid ${pref === p.id ? "var(--bc-leaf)" : "rgba(122, 96, 60, 0.4)"}`,
                fontSize: 24, color: "var(--bc-ink)",
                transform: pref === p.id ? "rotate(-2deg)" : "none",
                boxShadow: pref === p.id ? "var(--bc-shadow-card)" : "none",
                display: "flex", alignItems: "center", gap: 12,
              }}>
              <span style={{ fontSize: 28 }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
        <button className="bc-btn primary" onClick={onNext} disabled={!pref}
          style={{ opacity: pref ? 1 : 0.5, cursor: pref ? "pointer" : "not-allowed" }}>
          Paint me a recipe →
        </button>
      </div>
    </div>
  </div>
);

window.GoodMorning = GoodMorning;
