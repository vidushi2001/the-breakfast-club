// PANTRY screen
const { Ingredient, TopBar } = window;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PantryRow = ({ item, onUpdate, onRemove }) => (
  <div className="bc-fadeup" style={{
    display: "grid", gridTemplateColumns: "70px 1fr 200px 40px",
    alignItems: "center", gap: 16, padding: "12px 4px",
    borderBottom: "1.5px dashed rgba(122, 96, 60, 0.35)",
  }}>
    <div style={{ width: 70, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Ingredient name={item.name} size={54} rotate={(item.id * 13) % 30 - 15} />
    </div>
    <div className="bc-hand" style={{ fontSize: 24 }}>{item.name}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
      <button className="bc-hand" onClick={() => onUpdate({ ...item, qty: Math.max(0, item.qty - 1) })}
        style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid var(--bc-ink)",
                 background: "transparent", cursor: "pointer", fontSize: 18 }}>−</button>
      <div className="bc-hand" style={{ fontSize: 20, minWidth: 84, textAlign: "center" }}>
        {item.qty} {item.unit}
      </div>
      <button className="bc-hand" onClick={() => onUpdate({ ...item, qty: item.qty + 1 })}
        style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid var(--bc-ink)",
                 background: "transparent", cursor: "pointer", fontSize: 18 }}>+</button>
    </div>
    <button onClick={() => onRemove(item.id)}
      style={{ background: "transparent", border: "none", cursor: "pointer",
               fontSize: 20, color: "var(--bc-ink-muted)" }}>×</button>
  </div>
);

const Pantry = ({ pantry, setPantry, day, setDay, onNext, onBack }) => {
  const [draftName, setDraftName] = React.useState("");
  const [draftQty, setDraftQty] = React.useState(1);
  const [draftUnit, setDraftUnit] = React.useState("pc");
  const inputRef = React.useRef();

  const add = () => {
    if (!draftName.trim()) return;
    setPantry([...pantry, { id: Date.now(), name: draftName.trim(), qty: draftQty, unit: draftUnit }]);
    setDraftName(""); setDraftQty(1);
    inputRef.current?.focus();
  };

  return (
    <div className="bc-paper" style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <TopBar onBack={onBack} page={1} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 60px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 70, right: 20 }}><Ingredient name="butter" size={140} rotate={12} /></div>
        <div style={{ position: "absolute", top: 90, left: 20 }}><Ingredient name="salt" size={100} rotate={-6} /></div>

        <div className="bc-fadeup">
          <div className="bc-label" style={{ fontSize: 16, color: "var(--bc-ink-muted)", letterSpacing: 4 }}>— PAGE ONE —</div>
          <h1 className="bc-script" style={{ fontSize: 110, margin: "8px 0 -10px", fontStyle: "italic" }}>Your Pantry,</h1>
          <h2 className="bc-script" style={{ fontSize: 72, margin: 0, fontStyle: "italic", color: "var(--bc-leaf)" }}>
            <span className="bc-underline">at a glance</span>
          </h2>
          <p className="bc-hand" style={{ fontSize: 20, color: "var(--bc-ink-soft)", marginTop: 20, maxWidth: 560 }}>
            Tell me what's stocked up. A weekly inventory — once on a Sunday keeps the suggestions honest.
          </p>
        </div>

        <div style={{ marginTop: 28, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {DAYS.map((d) => (
            <button key={d} onClick={() => setDay(d)} className="bc-hand"
              style={{
                padding: "8px 18px", fontSize: 20,
                borderRadius: 999, cursor: "pointer",
                background: d === day ? "var(--bc-butter)" : "transparent",
                border: `1.5px solid ${d === day ? "var(--bc-ink)" : "rgba(122, 96, 60, 0.4)"}`,
                color: "var(--bc-ink)",
                transform: d === day ? "rotate(-1.5deg)" : "none",
                boxShadow: d === day ? "var(--bc-shadow-soft)" : "none",
              }}>{d}</button>
          ))}
        </div>

        <div className="bc-card" style={{ marginTop: 24, padding: "28px 32px", position: "relative" }}>
          <div className="bc-tape" style={{ top: -12, left: 40, transform: "rotate(-4deg)" }} />
          <div className="bc-tape" style={{ top: -12, right: 60, transform: "rotate(3deg)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 200px 40px",
                        gap: 16, paddingBottom: 8, borderBottom: "2px solid var(--bc-ink)" }}>
            <div></div>
            <div className="bc-label" style={{ fontSize: 16, color: "var(--bc-ink-muted)", letterSpacing: 2 }}>ITEM</div>
            <div className="bc-label" style={{ fontSize: 16, color: "var(--bc-ink-muted)", letterSpacing: 2, textAlign: "right" }}>QUANTITY</div>
            <div></div>
          </div>

          {pantry.length === 0 ? (
            <div className="bc-hand" style={{ padding: "32px 0", textAlign: "center", color: "var(--bc-ink-muted)", fontSize: 22 }}>
              Pantry's empty. Add your first ingredient ↓
            </div>
          ) : (
            pantry.map((item) => (
              <PantryRow key={item.id} item={item}
                onUpdate={(u) => setPantry(pantry.map((p) => p.id === u.id ? u : p))}
                onRemove={(id) => setPantry(pantry.filter((p) => p.id !== id))} />
            ))
          )}

          <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 80px 80px 80px",
                        alignItems: "center", gap: 12, paddingTop: 18, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%",
                            border: "1.5px dashed var(--bc-ink-muted)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--bc-ink-muted)", fontSize: 24 }}>+</div>
            </div>
            <input ref={inputRef} className="bc-input" placeholder="e.g. eggs, tomatoes, paneer..."
              value={draftName} onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()} />
            <input className="bc-input" type="number" min="0" value={draftQty}
              onChange={(e) => setDraftQty(parseInt(e.target.value) || 0)} style={{ textAlign: "center" }} />
            <select className="bc-input" value={draftUnit} onChange={(e) => setDraftUnit(e.target.value)}
              style={{ fontFamily: "var(--bc-font-hand)", fontSize: 18, background: "transparent" }}>
              <option value="pc">pc</option><option value="g">g</option><option value="ml">ml</option>
              <option value="cup">cup</option><option value="tsp">tsp</option><option value="tbsp">tbsp</option>
            </select>
            <button onClick={add} className="bc-hand" style={{
              padding: "6px 14px", borderRadius: 999, cursor: "pointer",
              background: "var(--bc-sage)", border: "1.5px solid var(--bc-leaf)",
              fontSize: 18, color: "var(--bc-ink)",
            }}>add</button>
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="bc-hand" style={{ fontSize: 18, color: "var(--bc-ink-muted)" }}>
            {pantry.length} item{pantry.length === 1 ? "" : "s"} · saved for {day}
          </div>
          <button className="bc-btn primary" onClick={onNext}>Make me breakfast →</button>
        </div>
      </div>
    </div>
  );
};
window.Pantry = Pantry;
