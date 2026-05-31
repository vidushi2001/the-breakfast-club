// LANDING screen — three variants. Uses real watercolor ingredients.
const { Ingredient, HerbSprig, ShakshukaPan } = window;

// variant 0: classic "book cover" centered title
// variant 1: journal-spread (title left, illustrations right)
// variant 2: minimal — one big watercolor hero

const LandingCover = ({ onStart }) => (
  <div className="bc-paper bc-grid" style={{
    position: "absolute", inset: 0, overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    {/* Watercolor blobs */}
    <div className="bc-blob" style={{ top: "10%", left: "14%", width: 180, height: 150, background: "var(--bc-coral)" }} />
    <div className="bc-blob" style={{ bottom: "8%", right: "10%", width: 200, height: 170, background: "var(--bc-sage)" }} />
    <div className="bc-blob" style={{ top: "55%", left: "6%", width: 140, height: 120, background: "var(--bc-butter)" }} />

    {/* Scattered ingredient illustrations */}
    <div style={{ position: "absolute", top: "5%", left: "5%", animation: "bc-fadeup 700ms ease-out both" }}>
      <Ingredient name="tomato" size={140} rotate={-12} />
    </div>
    <div style={{ position: "absolute", top: "8%", right: "6%", animation: "bc-fadeup 700ms 100ms ease-out both" }}>
      <Ingredient name="egg" size={110} rotate={8} />
    </div>
    <div style={{ position: "absolute", bottom: "6%", left: "3%", animation: "bc-fadeup 700ms 200ms ease-out both" }}>
      <Ingredient name="oil" size={160} rotate={-6} />
    </div>
    <div style={{ position: "absolute", bottom: "8%", right: "4%", animation: "bc-fadeup 700ms 300ms ease-out both" }}>
      <Ingredient name="milk" size={170} rotate={6} />
    </div>
    <div style={{ position: "absolute", top: "42%", left: "1%", animation: "bc-fadeup 700ms 400ms ease-out both" }}>
      <Ingredient name="onion" size={100} rotate={18} />
    </div>
    <div style={{ position: "absolute", top: "44%", right: "1%", animation: "bc-fadeup 700ms 500ms ease-out both" }}>
      <Ingredient name="cheese" size={130} rotate={-14} />
    </div>

    {/* Center content */}
    <div style={{
      textAlign: "center", position: "relative", zIndex: 2,
      maxWidth: 680, padding: "0 40px",
      animation: "bc-fadeup 700ms 150ms ease-out both",
    }}>
      <div className="bc-label" style={{
        fontSize: 15, color: "var(--bc-ink-soft)",
        letterSpacing: 5, textTransform: "uppercase", marginBottom: 10,
      }}>
        — a breakfast journal —
      </div>
      <h1 className="bc-script" style={{ fontSize: "clamp(64px, 9vw, 130px)", margin: "0 0 -8px", fontStyle: "italic", lineHeight: 1 }}>
        The Breakfast
      </h1>
      <h1 className="bc-script" style={{
        fontSize: "clamp(72px, 10vw, 148px)", margin: 0, fontStyle: "italic",
        color: "var(--bc-tomato)", lineHeight: 1,
      }}>
        <span className="bc-underline sage">Club</span>
      </h1>
      <p className="bc-hand" style={{ fontSize: 19, margin: "24px auto 0", maxWidth: 480, color: "var(--bc-ink-soft)", lineHeight: 1.5 }}>
        Painted recipes for the perpetually hungry and<br/>
        chronically uninspired. High-protein, hand-picked from your pantry.
      </p>
      <div style={{ marginTop: 28, display: "flex", gap: 16, justifyContent: "center" }}>
        <button className="bc-btn primary" onClick={onStart}>Open the book →</button>
      </div>
      <div className="bc-label" style={{ fontSize: 12, marginTop: 18, color: "var(--bc-ink-muted)", letterSpacing: 3 }}>
        EST. 2026 · BREWED WITH MORNING SUNLIGHT
      </div>
    </div>
  </div>
);

const LandingSpread = ({ onStart }) => (
  <div className="bc-paper" style={{ position: "absolute", inset: 0, display: "flex", overflow: "hidden" }}>
    {/* Book spine shadow */}
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: "50%", width: 48,
      transform: "translateX(-50%)",
      background: "radial-gradient(ellipse at center, rgba(80,60,30,0.18), transparent 70%)",
      pointerEvents: "none", zIndex: 1,
    }} />

    {/* Left page */}
    <div style={{ flex: 1, padding: "72px 52px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      <div className="bc-label" style={{ fontSize: 14, color: "var(--bc-ink-muted)", letterSpacing: 4, textTransform: "uppercase" }}>
        — VOL. 01 · RECIPE №037 —
      </div>
      <h1 className="bc-script" style={{ fontSize: "clamp(60px, 8vw, 120px)", margin: "14px 0 -12px", lineHeight: 0.9, fontStyle: "italic" }}>
        The
      </h1>
      <h1 className="bc-script" style={{ fontSize: "clamp(60px, 8vw, 120px)", margin: "0 0 -12px", lineHeight: 0.9, fontStyle: "italic", color: "var(--bc-tomato)" }}>
        Breakfast
      </h1>
      <h1 className="bc-script" style={{ fontSize: "clamp(60px, 8vw, 120px)", margin: 0, lineHeight: 0.9, fontStyle: "italic" }}>
        <span className="bc-underline sage">Club.</span>
      </h1>
      <p className="bc-hand" style={{ fontSize: 19, maxWidth: 380, marginTop: 28, color: "var(--bc-ink-soft)", lineHeight: 1.6 }}>
        A daily recipe ritual. <br/>
        Tell me what's in your pantry,<br/>
        I'll paint you breakfast.
      </p>
      <button className="bc-btn primary" style={{ alignSelf: "flex-start", marginTop: 28 }} onClick={onStart}>
        Turn the page →
      </button>
    </div>

    {/* Right page — illustrations */}
    <div style={{ flex: 1, padding: "52px", position: "relative" }}>
      <div style={{ position: "absolute", top: 36, right: 48 }}><Ingredient name="tomato" size={180} rotate={-6} /></div>
      <div style={{ position: "absolute", top: 200, left: 36 }}><Ingredient name="egg" size={140} rotate={18} /></div>
      <div style={{ position: "absolute", top: 72, right: 210 }}><Ingredient name="onion" size={110} rotate={-12} /></div>
      <div style={{ position: "absolute", bottom: 180, right: 36 }}><Ingredient name="cheese" size={150} rotate={10} /></div>
      <div style={{ position: "absolute", bottom: 72, left: 36 }}><Ingredient name="oil" size={170} rotate={-6} /></div>
      <div style={{ position: "absolute", bottom: 90, right: 190 }}><Ingredient name="milk" size={170} rotate={4} /></div>
    </div>
  </div>
);

const LandingMinimal = ({ onStart }) => (
  <div className="bc-paper" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "column" }}>
    <div className="bc-blob" style={{ top: "8%", left: "28%", width: 300, height: 260, background: "var(--bc-coral)", opacity: 0.4 }} />
    <div style={{ position: "relative", width: "min(340px, 48vw)", flexShrink: 0 }}>
      <Ingredient name="tomato" size="100%" rotate={-3} style={{ width: "100%", height: "auto" }} />
    </div>
    <div style={{ position: "absolute", bottom: "10%", right: "10%" }}><Ingredient name="onion" size={120} rotate={20} /></div>
    <div style={{ position: "absolute", top: "12%", left: "8%" }}><Ingredient name="egg" size={100} rotate={-12} /></div>

    <div style={{ position: "relative", textAlign: "center", zIndex: 2, padding: "0 40px", marginTop: 16 }}>
      <h1 className="bc-script" style={{ fontSize: "clamp(80px, 11vw, 160px)", margin: 0, fontStyle: "italic", lineHeight: 1 }}>
        Breakfast
      </h1>
      <h1 className="bc-script" style={{ fontSize: "clamp(80px, 11vw, 160px)", margin: "-24px 0 0", fontStyle: "italic", color: "var(--bc-tomato)", lineHeight: 1 }}>
        <span className="bc-underline sage">Club.</span>
      </h1>
      <p className="bc-hand" style={{ fontSize: 20, marginTop: 20, color: "var(--bc-ink-soft)" }}>
        A recipe a morning. Painted from your pantry.
      </p>
      <button className="bc-btn primary" style={{ marginTop: 22 }} onClick={onStart}>Start cooking →</button>
    </div>
  </div>
);

const Landing = ({ variant, onStart }) => {
  if (variant === 1) return <LandingSpread onStart={onStart} />;
  if (variant === 2) return <LandingMinimal onStart={onStart} />;
  return <LandingCover onStart={onStart} />;
};

window.Landing = Landing;
