// COOKING (buffer) and COOKED/NOTCOOKED
const { Ingredient, ShakshukaPan } = window;

const Cooking = ({ onDone }) => {
  React.useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  const lines = [
    "checking your pantry...",
    "matching macros...",
    "warming the pan...",
    "painting the plate...",
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % lines.length), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bc-paper" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div className="bc-blob" style={{ top: "20%", left: "30%", width: 360, height: 300, background: "var(--bc-butter)" }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        <div style={{ position: "relative", width: 320, height: 240, margin: "0 auto" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              position: "absolute", left: 120 + i * 18, bottom: 160, width: 14, height: 32,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0))",
              animation: `bc-steam 2.2s ${i * 0.35}s infinite ease-out`,
            }} />
          ))}
          <div style={{ position: "absolute", left: 50, bottom: 40, animation: "bc-wobble 1.4s infinite ease-in-out" }}>
            <ShakshukaPan size={240} />
          </div>
        </div>
        <h2 className="bc-script" style={{ fontSize: 80, margin: "16px 0 8px", fontStyle: "italic" }}>
          cooking <span style={{ color: "var(--bc-tomato)" }}>something good</span>...
        </h2>
        <div className="bc-hand bc-fade" key={idx} style={{ fontSize: 24, color: "var(--bc-ink-soft)" }}>
          {lines[idx]}
        </div>
      </div>
    </div>
  );
};

const Cooked = ({ subtracted, onBackToPantry, onCookAnother }) => (
  <div className="bc-paper" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    <div className="bc-blob" style={{ top: "18%", right: "20%", width: 360, height: 320, background: "var(--bc-sage)" }} />
    <div className="bc-blob" style={{ bottom: "16%", left: "18%", width: 260, height: 200, background: "var(--bc-coral)" }} />

    <div style={{ textAlign: "center", maxWidth: 720, padding: "0 40px", position: "relative", zIndex: 2 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 8 }}>
        <Ingredient name="oil" size={90} rotate={-12} />
        <Ingredient name="tomato" size={100} />
      </div>
      <h1 className="bc-script" style={{ fontSize: 140, margin: "0 0 8px", fontStyle: "italic" }}>
        Bon <span style={{ color: "var(--bc-tomato)" }}>appétit!</span>
      </h1>
      <p className="bc-hand" style={{ fontSize: 22, color: "var(--bc-ink-soft)", marginTop: 0 }}>
        Pantry updated. {subtracted?.length || 0} ingredient{(subtracted?.length || 0) === 1 ? "" : "s"} taken off the list:
      </p>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
        {(subtracted || []).map((s, i) => (
          <div key={i} className="bc-hand" style={{
            padding: "6px 16px 6px 6px", borderRadius: 999, background: "var(--bc-card)",
            border: "1.5px solid var(--bc-card-edge)", display: "flex", alignItems: "center", gap: 10,
            fontSize: 20, boxShadow: "var(--bc-shadow-soft)",
          }}>
            <Ingredient name={s.name} size={36} />
            <span>{s.name}</span>
            <span style={{ color: "var(--bc-ink-muted)" }}>− {s.qty} {s.unit}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <button className="bc-btn" onClick={onCookAnother}>Cook another →</button>
        <button className="bc-btn primary" onClick={onBackToPantry}>Back to pantry</button>
      </div>
    </div>
  </div>
);

const NotCooked = ({ onTryAgain, onBackToPantry }) => (
  <div className="bc-paper" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    <div className="bc-blob" style={{ top: "18%", left: "20%", width: 320, height: 280, background: "var(--bc-sky)" }} />
    <div style={{ textAlign: "center", maxWidth: 600, padding: "0 40px", position: "relative", zIndex: 2 }}>
      <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
        <Ingredient name="milk" size={130} rotate={-6} />
      </div>
      <h1 className="bc-script" style={{ fontSize: 110, margin: "0 0 8px", fontStyle: "italic" }}>
        maybe <span style={{ color: "var(--bc-tomato)" }}>next time</span>.
      </h1>
      <p className="bc-hand" style={{ fontSize: 22, color: "var(--bc-ink-soft)", marginTop: 0 }}>
        No worries — your pantry stays untouched. Try a different recipe?
      </p>
      <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <button className="bc-btn" onClick={onBackToPantry}>Back to pantry</button>
        <button className="bc-btn primary" onClick={onTryAgain}>Try another recipe →</button>
      </div>
    </div>
  </div>
);

Object.assign(window, { Cooking, Cooked, NotCooked });
