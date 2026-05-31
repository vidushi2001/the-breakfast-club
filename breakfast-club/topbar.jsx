// Shared TopBar
const TopBar = ({ onBack, page, total = 4 }) => (
  <div style={{
    position: "absolute", top: 24, left: 32, right: 32, zIndex: 5,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  }}>
    <button
      className="bc-hand"
      onClick={onBack}
      style={{
        background: "transparent", border: "none", cursor: "pointer",
        fontSize: 22, color: "var(--bc-ink-soft)",
      }}
    >
      ← back
    </button>
    <div className="bc-script" style={{ fontSize: 32, color: "var(--bc-ink-soft)", fontStyle: "italic" }}>
      The Breakfast Club
    </div>
    <div className="bc-label" style={{ fontSize: 14, color: "var(--bc-ink-muted)", letterSpacing: 2 }}>
      P. {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  </div>
);
window.TopBar = TopBar;
