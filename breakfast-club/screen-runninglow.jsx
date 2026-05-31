// RUNNING LOW
const { Ingredient, TopBar } = window;

const RunningLow = ({ pantry, onBack }) => {
  const low = pantry.filter((p) => p.qty > 0 && p.qty <= 2);
  const out = pantry.filter((p) => p.qty === 0);

  return (
    <div className="bc-paper" style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <TopBar onBack={onBack} page={4} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 60px 60px", position: "relative" }}>
        <div className="bc-fadeup">
          <div className="bc-label" style={{ fontSize: 16, color: "var(--bc-ink-muted)", letterSpacing: 4 }}>— PAGE FOUR —</div>
          <h1 className="bc-script" style={{ fontSize: 110, margin: "8px 0 -10px", fontStyle: "italic" }}>Running low on,</h1>
          <h2 className="bc-script" style={{ fontSize: 56, margin: 0, color: "var(--bc-tomato)", fontStyle: "italic" }}>
            <span className="bc-underline">a shopping list</span>
          </h2>
          <p className="bc-hand" style={{ fontSize: 20, color: "var(--bc-ink-soft)", marginTop: 20, maxWidth: 600 }}>
            Stuff that's almost out, and stuff you've run out of entirely. Add to your next grocery run.
          </p>
        </div>

        {out.length > 0 && (
          <div className="bc-card" style={{ marginTop: 32, padding: "24px 28px",
            background: "rgba(216, 130, 110, 0.10)", borderColor: "var(--bc-tomato)", position: "relative" }}>
            <div className="bc-tape" style={{ top: -12, left: 40, transform: "rotate(-3deg)" }} />
            <div className="bc-script" style={{ fontSize: 38, color: "var(--bc-tomato)", fontStyle: "italic" }}>
              out of stock <span className="bc-label" style={{ color: "var(--bc-ink-muted)", fontSize: 16, letterSpacing: 2 }}>({out.length})</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {out.map((item) => (
                <div key={item.id} className="bc-hand" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 14px 6px 6px", borderRadius: 999,
                  background: "var(--bc-card)", border: "1.5px solid var(--bc-tomato)",
                  fontSize: 20, textDecoration: "line-through", color: "var(--bc-ink-soft)",
                }}>
                  <Ingredient name={item.name} size={36} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bc-card" style={{ marginTop: 24, padding: "24px 28px", position: "relative" }}>
          <div className="bc-tape" style={{ top: -12, right: 60, transform: "rotate(3deg)" }} />
          <div className="bc-script" style={{ fontSize: 38, color: "#c08a3a", fontStyle: "italic" }}>
            running low <span className="bc-label" style={{ color: "var(--bc-ink-muted)", fontSize: 16, letterSpacing: 2 }}>({low.length})</span>
          </div>
          <div className="bc-hand" style={{ fontSize: 16, color: "var(--bc-ink-muted)", marginTop: 4 }}>
            2 or fewer remaining
          </div>
          {low.length === 0 ? (
            <div className="bc-hand" style={{ padding: "32px 0", textAlign: "center", color: "var(--bc-ink-muted)", fontSize: 22 }}>
              Nothing's running low. You're well stocked.
            </div>
          ) : (
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
              {low.map((item) => (
                <div key={item.id} style={{
                  display: "grid", gridTemplateColumns: "54px 1fr 120px",
                  alignItems: "center", gap: 12, padding: "10px 4px",
                  borderBottom: "1px dashed rgba(122, 96, 60, 0.3)",
                }}>
                  <Ingredient name={item.name} size={44} />
                  <div className="bc-hand" style={{ fontSize: 22 }}>{item.name}</div>
                  <div className="bc-hand" style={{ fontSize: 18, color: "var(--bc-ink-muted)", textAlign: "right" }}>
                    {item.qty} {item.unit} left
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button className="bc-btn" onClick={onBack}>Back to recipe</button>
        </div>
      </div>
    </div>
  );
};
window.RunningLow = RunningLow;
