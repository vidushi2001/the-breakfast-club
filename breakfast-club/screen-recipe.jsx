// RECIPE CARD — 3 variants
// Dietary tags: "veg" = vegetarian (may include eggs), "noegg" = strictly no eggs, "nonveg" = no restriction
const { Ingredient, ShakshukaPan, TopBar } = window;

// ─── Recipe database ──────────────────────────────────────────────────────────
const ALL_RECIPES = [
  // ── EGG-BASED — tagged "veg" + "nonveg" only, never "noegg" ────────────────
  {
    id: "shakshuka",
    title: "Shakshuka",
    subtitle: "eggs poached in a spiced tomato bath",
    tags: ["veg", "nonveg"],
    protein: 22, calories: 380, time: 25, serves: 2, difficulty: "easy",
    ingredients: [
      { name: "eggs",        qty: 4,  unit: "pc",   pantryKey: "eggs" },
      { name: "tomatoes",    qty: 4,  unit: "pc",   pantryKey: "tomatoes" },
      { name: "onion",       qty: 1,  unit: "pc",   pantryKey: "onion" },
      { name: "bell pepper", qty: 1,  unit: "pc",   pantryKey: "bell pepper" },
      { name: "garlic",      qty: 3,  unit: "tsp",  pantryKey: "garlic" },
      { name: "olive oil",   qty: 2,  unit: "tbsp", pantryKey: "olive oil" },
      { name: "cumin",       qty: 1,  unit: "tsp",  pantryKey: null },
      { name: "paprika",     qty: 1,  unit: "tsp",  pantryKey: null },
    ],
    steps: [
      "Heat olive oil in a wide skillet over medium heat. Add chopped onion and bell pepper — sauté until soft and just sweet, 6–8 minutes.",
      "Stir in garlic, cumin and paprika. Cook 30 seconds until the kitchen smells of it.",
      "Add chopped tomatoes. Simmer, mashing as you go, until you have a thick jammy sauce — about 10 minutes.",
      "Make four wells in the sauce and crack an egg into each. Cover and cook until whites set but yolks still wobble, 5–7 minutes.",
      "Season with salt. Eat directly from the pan, with bread if you have it.",
    ],
  },
  {
    id: "cheese-omelette",
    title: "Cheese Omelette",
    subtitle: "fluffy, golden, three-fold perfection",
    tags: ["veg", "nonveg"],
    protein: 20, calories: 330, time: 10, serves: 1, difficulty: "easy",
    ingredients: [
      { name: "eggs",   qty: 3,   unit: "pc",   pantryKey: "eggs" },
      { name: "cheese", qty: 40,  unit: "g",    pantryKey: "cheese" },
      { name: "butter", qty: 15,  unit: "g",    pantryKey: "butter" },
      { name: "milk",   qty: 2,   unit: "tbsp", pantryKey: "milk" },
      { name: "onion",  qty: 0.5, unit: "pc",   pantryKey: "onion" },
    ],
    steps: [
      "Crack eggs into a bowl, add milk, season generously. Whisk until fully combined and slightly frothy.",
      "Heat butter in a non-stick pan over medium-low. When it foams, pour in the egg mixture.",
      "Let the edges set, then gently push them inward — tilting the pan so liquid egg runs to the sides.",
      "Scatter cheese over one half. When the top is just barely set, fold the omelette in thirds.",
      "Slide onto a plate. Omelettes wait for no one — eat immediately.",
    ],
  },
  {
    id: "masala-scrambled-eggs",
    title: "Masala Scrambled Eggs",
    subtitle: "spiced soft curds, straight from the pan",
    tags: ["veg", "nonveg"],
    protein: 18, calories: 310, time: 12, serves: 1, difficulty: "easy",
    ingredients: [
      { name: "eggs",     qty: 3,   unit: "pc",  pantryKey: "eggs" },
      { name: "onion",    qty: 0.5, unit: "pc",  pantryKey: "onion" },
      { name: "tomatoes", qty: 1,   unit: "pc",  pantryKey: "tomatoes" },
      { name: "butter",   qty: 15,  unit: "g",   pantryKey: "butter" },
      { name: "garlic",   qty: 1,   unit: "tsp", pantryKey: "garlic" },
    ],
    steps: [
      "Finely dice the onion and tomato. Beat the eggs with a pinch of salt.",
      "Melt butter in a pan over medium. Add onion and garlic — cook until translucent, about 3 minutes.",
      "Add tomato and cook down for 2 minutes until it softens and smells sweet.",
      "Pour in the eggs. Stir gently and constantly with a spatula, pulling soft curds from the edges.",
      "Remove from heat while slightly underdone — residual heat finishes them. Serve with toast.",
    ],
  },

  // ── EGG-FREE — tagged "veg", "noegg", and "nonveg" ─────────────────────────
  {
    id: "paneer-bhurji",
    title: "Paneer Bhurji",
    subtitle: "crumbled cottage cheese with warming spices",
    tags: ["veg", "noegg", "nonveg"],
    protein: 20, calories: 350, time: 15, serves: 2, difficulty: "easy",
    ingredients: [
      { name: "cheese",      qty: 150, unit: "g",   pantryKey: "cheese" },
      { name: "onion",       qty: 1,   unit: "pc",  pantryKey: "onion" },
      { name: "tomatoes",    qty: 2,   unit: "pc",  pantryKey: "tomatoes" },
      { name: "butter",      qty: 20,  unit: "g",   pantryKey: "butter" },
      { name: "bell pepper", qty: 0.5, unit: "pc",  pantryKey: "bell pepper" },
      { name: "garlic",      qty: 2,   unit: "tsp", pantryKey: "garlic" },
      { name: "cumin",       qty: 0.5, unit: "tsp", pantryKey: null },
    ],
    steps: [
      "Crumble the cheese into small uneven pieces — texture matters more than precision here.",
      "Melt butter in a pan over medium. Add finely chopped onion and garlic, sauté until golden.",
      "Add bell pepper, cook 2 minutes. Then add chopped tomatoes and cumin — cook until the tomatoes break down.",
      "Fold in the crumbled cheese. Toss gently over medium heat for 2–3 minutes.",
      "Season generously with salt. Eat with roti, toast, or straight from the pan.",
    ],
  },
  {
    id: "garlic-tomato-bowl",
    title: "Garlic Tomato Bowl",
    subtitle: "bruschetta flavours in a warm skillet",
    tags: ["veg", "noegg", "nonveg"],
    protein: 10, calories: 240, time: 10, serves: 1, difficulty: "easy",
    ingredients: [
      { name: "tomatoes",  qty: 3,   unit: "pc",   pantryKey: "tomatoes" },
      { name: "garlic",    qty: 3,   unit: "tsp",  pantryKey: "garlic" },
      { name: "olive oil", qty: 3,   unit: "tbsp", pantryKey: "olive oil" },
      { name: "onion",     qty: 0.5, unit: "pc",   pantryKey: "onion" },
      { name: "cheese",    qty: 30,  unit: "g",    pantryKey: "cheese" },
    ],
    steps: [
      "Warm olive oil in a pan over medium-low. Add garlic — cook gently until fragrant, about 90 seconds.",
      "Add roughly chopped onion and tomatoes. Season well. Cook 5–6 minutes until jammy.",
      "Taste and adjust salt. The tomatoes should be completely soft and saucy.",
      "Crumble cheese over the top. Serve warm over toast, or eat as-is with a spoon.",
    ],
  },
  {
    id: "yogurt-bowl",
    title: "Protein Yogurt Bowl",
    subtitle: "cool, creamy, ready in two minutes flat",
    tags: ["veg", "noegg", "nonveg"],
    protein: 16, calories: 260, time: 5, serves: 1, difficulty: "easy",
    ingredients: [
      { name: "yogurt", qty: 1.5, unit: "cup",  pantryKey: "yogurt" },
      { name: "milk",   qty: 0.5, unit: "cup",  pantryKey: "milk" },
      { name: "salt",   qty: 1,   unit: "pinch", pantryKey: "salt" },
    ],
    steps: [
      "Tip yogurt into a bowl. Thin with a splash of cold milk to your preferred consistency.",
      "Season with a pinch of salt for a savoury bowl — or leave plain for sweet toppings.",
      "Finish with whatever you have: a crack of pepper, a drizzle of olive oil, a pinch of cinnamon.",
      "Eat cold. Best when the yogurt is straight from the fridge.",
    ],
  },
];

// ─── Recipe selector ──────────────────────────────────────────────────────────
// Given pref + live pantry, returns the best-matching recipe.
// Scores each candidate by how many of its ingredients are actually in the pantry.
function selectRecipe(pref, pantry) {
  const matching = ALL_RECIPES.filter(r => r.tags.includes(pref));
  const pool = matching.length ? matching : ALL_RECIPES;

  const scored = pool.map(recipe => {
    const resolved = recipe.ingredients.map(ing => ({
      ...ing,
      inPantry: ing.pantryKey !== null
        ? pantry.some(p => p.qty > 0 && p.name.toLowerCase() === ing.pantryKey.toLowerCase())
        : false,
    }));
    const score = resolved.filter(i => i.inPantry).length;
    return { ...recipe, ingredients: resolved, _score: score };
  });

  scored.sort((a, b) => b._score - a._score);
  return scored[0];
}

// ─── Shared sub-components ────────────────────────────────────────────────────
const Macro = ({ value, unit, label, color }) => (
  <div style={{ textAlign: "center" }}>
    <div className="bc-script" style={{ fontSize: 52, lineHeight: 1, color, fontStyle: "italic" }}>
      {value}<span style={{ fontSize: 20, color: "var(--bc-ink-muted)", fontStyle: "normal" }}>{unit}</span>
    </div>
    <div className="bc-label" style={{ fontSize: 12, color: "var(--bc-ink-muted)", letterSpacing: 2 }}>
      {String(label).toUpperCase()}
    </div>
  </div>
);

const IngredientChip = ({ ing }) => (
  <div className="bc-hand" style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "6px 14px 6px 6px", borderRadius: 999,
    background: ing.inPantry ? "var(--bc-card)" : "rgba(216, 130, 110, 0.18)",
    border: `1.5px ${ing.inPantry ? "solid" : "dashed"} ${ing.inPantry ? "var(--bc-card-edge)" : "var(--bc-tomato)"}`,
    fontSize: 18, color: "var(--bc-ink)",
  }}>
    <span style={{ width: 38, height: 38, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <Ingredient name={ing.name} size={38} rotate={(ing.name.length * 7) % 24 - 12} />
    </span>
    <span>{ing.name}</span>
    <span style={{ color: "var(--bc-ink-muted)", fontSize: 15 }}>{ing.qty} {ing.unit}</span>
    {!ing.inPantry && (
      <span className="bc-label" style={{ fontSize: 10, color: "var(--bc-tomato)", marginLeft: 4, letterSpacing: 1.5 }}>
        NEED
      </span>
    )}
  </div>
);

// ─── VARIANT 0: Classic ───────────────────────────────────────────────────────
const RecipeClassic = ({ recipe, onCooked, onNotCooked, onBack }) => {
  const missing = recipe.ingredients.filter(i => !i.inPantry);
  return (
    <div className="bc-paper" style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <TopBar onBack={onBack} page={3} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 60px 100px", position: "relative" }}>
        <div className="bc-fadeup">
          <div className="bc-label" style={{ fontSize: 14, color: "var(--bc-ink-muted)", letterSpacing: 5 }}>
            — TODAY'S RECIPE —
          </div>
          <h1 className="bc-script" style={{ fontSize: "clamp(80px, 10vw, 140px)", margin: "8px 0 4px", lineHeight: 0.9, fontStyle: "italic" }}>
            {recipe.title}<span style={{ color: "var(--bc-tomato)" }}>.</span>
          </h1>
          <p className="bc-body" style={{ fontSize: 22, color: "var(--bc-ink-soft)", marginTop: 8, fontStyle: "italic" }}>
            {recipe.subtitle}.
          </p>
        </div>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div style={{ position: "relative", height: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="bc-blob" style={{ inset: "8% 8%", background: "var(--bc-tomato)", opacity: 0.15 }} />
            <ShakshukaPan size={320} />
          </div>
          <div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: "18px 0",
              borderTop: "2px solid var(--bc-ink)", borderBottom: "2px solid var(--bc-ink)",
            }}>
              <Macro value={recipe.protein} unit="g" label="protein" color="var(--bc-tomato)" />
              <Macro value={recipe.calories} unit="" label="kcal" color="var(--bc-leaf)" />
              <Macro value={recipe.time} unit="m" label="time" color="var(--bc-ink)" />
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 20 }}>
              <div className="bc-hand" style={{ fontSize: 19 }}>
                <span style={{ color: "var(--bc-ink-muted)" }}>serves</span> {recipe.serves}
              </div>
              <div className="bc-hand" style={{ fontSize: 19 }}>
                <span style={{ color: "var(--bc-ink-muted)" }}>difficulty</span> {recipe.difficulty}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h3 className="bc-script" style={{ fontSize: 50, margin: 0, fontStyle: "italic" }}>
              <span className="bc-underline sage">Ingredients</span>
            </h3>
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {recipe.ingredients.map((ing, i) => <IngredientChip key={i} ing={ing} />)}
            </div>
            {missing.length > 0 && (
              <div className="bc-card" style={{ marginTop: 20, padding: "14px 18px",
                background: "rgba(216, 130, 110, 0.12)", borderColor: "var(--bc-tomato)" }}>
                <div className="bc-hand" style={{ fontSize: 18, color: "var(--bc-tomato)" }}>
                  ⚠ not in your pantry
                </div>
                <div className="bc-hand" style={{ fontSize: 15, color: "var(--bc-ink-soft)", marginTop: 4 }}>
                  {missing.map(m => m.name).join(", ")} — grab these or swap them out.
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="bc-script" style={{ fontSize: 50, margin: 0, fontStyle: "italic" }}>
              <span className="bc-underline">Method</span>
            </h3>
            <ol style={{ marginTop: 18, paddingLeft: 0, listStyle: "none" }}>
              {recipe.steps.map((s, i) => (
                <li key={i} className="bc-fadeup" style={{
                  display: "grid", gridTemplateColumns: "40px 1fr", gap: 14,
                  marginBottom: 16, animationDelay: `${i * 80}ms`,
                }}>
                  <div className="bc-script" style={{ fontSize: 48, lineHeight: 1, color: "var(--bc-tomato)", textAlign: "center", fontStyle: "italic" }}>
                    {i + 1}
                  </div>
                  <div className="bc-hand" style={{ fontSize: 18, lineHeight: 1.5, color: "var(--bc-ink-soft)" }}>
                    {s}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button className="bc-btn ghost" onClick={onNotCooked}>I didn't cook it</button>
          <button className="bc-btn primary" onClick={onCooked}>I cooked it! ✓</button>
        </div>
      </div>
    </div>
  );
};

// ─── VARIANT 1: Postcard ──────────────────────────────────────────────────────
const RecipePostcard = ({ recipe, onCooked, onNotCooked, onBack }) => {
  const missing = recipe.ingredients.filter(i => !i.inPantry);
  return (
    <div className="bc-paper" style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <TopBar onBack={onBack} page={3} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "110px 60px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 52, alignItems: "flex-start" }}>
          <div style={{ position: "relative", paddingTop: 36 }}>
            <div className="bc-card" style={{
              background: "#fffdf6", padding: 20, paddingBottom: 52, transform: "rotate(-3deg)",
              boxShadow: "var(--bc-shadow-lift)",
            }}>
              <div className="bc-tape" style={{ top: -12, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }} />
              <div style={{
                background: "linear-gradient(180deg, #f4e9d2, #e8d9b5)",
                aspectRatio: "1 / 1", borderRadius: 4, position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div className="bc-blob" style={{ inset: 20, background: "var(--bc-tomato)", opacity: 0.2 }} />
                <ShakshukaPan size={320} />
              </div>
              <div className="bc-script" style={{ fontSize: 26, marginTop: 12, textAlign: "center", color: "var(--bc-ink-soft)", fontStyle: "italic" }}>
                {recipe.title}, {new Date().toLocaleDateString("en", { month: "short", day: "numeric" })}
              </div>
            </div>
            <div style={{ marginTop: 36, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                ["protein", `${recipe.protein}g`, "var(--bc-tomato)"],
                ["kcal", recipe.calories, "var(--bc-leaf)"],
                ["time", `${recipe.time}m`, "var(--bc-ink)"],
                ["serves", recipe.serves, "var(--bc-ink-soft)"],
              ].map(([l, v, c]) => (
                <div key={l} className="bc-hand" style={{
                  padding: "6px 14px", borderRadius: 999, border: `1.5px solid ${c}`,
                  background: "var(--bc-card)", fontSize: 16,
                }}>
                  <span style={{ color: c, fontWeight: 700 }}>{v}</span>
                  <span style={{ color: "var(--bc-ink-muted)", marginLeft: 6 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bc-label" style={{ fontSize: 13, color: "var(--bc-ink-muted)", letterSpacing: 4 }}>
              — TODAY, FROM YOUR PANTRY —
            </div>
            <h1 className="bc-script" style={{ fontSize: "clamp(70px, 9vw, 120px)", margin: "8px 0 0", lineHeight: 0.9, fontStyle: "italic" }}>
              {recipe.title}
            </h1>
            <p className="bc-body" style={{ fontSize: 20, fontStyle: "italic", color: "var(--bc-ink-soft)", marginTop: 8 }}>
              {recipe.subtitle}.
            </p>

            <h3 className="bc-script" style={{ fontSize: 40, marginTop: 28, marginBottom: 12, fontStyle: "italic" }}>
              <span className="bc-underline sage">You'll need</span>
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {recipe.ingredients.map((ing, i) => <IngredientChip key={i} ing={ing} />)}
            </div>

            {missing.length > 0 && (
              <div className="bc-hand" style={{
                marginTop: 14, padding: "10px 14px",
                background: "rgba(216, 130, 110, 0.15)", borderLeft: "3px solid var(--bc-tomato)",
                fontSize: 16, color: "var(--bc-ink-soft)",
              }}>
                <span style={{ color: "var(--bc-tomato)" }}>note:</span>{" "}
                you'll need <b>{missing.map(m => m.name).join(", ")}</b> — not in your pantry.
              </div>
            )}

            <h3 className="bc-script" style={{ fontSize: 40, marginTop: 28, marginBottom: 12, fontStyle: "italic" }}>
              <span className="bc-underline">Method</span>
            </h3>
            <ol style={{ paddingLeft: 0, listStyle: "none" }}>
              {recipe.steps.map((s, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 12, marginBottom: 14 }}>
                  <div className="bc-script" style={{ fontSize: 40, color: "var(--bc-tomato)", lineHeight: 1, fontStyle: "italic" }}>
                    {i + 1}
                  </div>
                  <div className="bc-hand" style={{ fontSize: 17, color: "var(--bc-ink-soft)", lineHeight: 1.5 }}>
                    {s}
                  </div>
                </li>
              ))}
            </ol>

            <div style={{ marginTop: 28, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="bc-btn ghost" onClick={onNotCooked}>I didn't cook it</button>
              <button className="bc-btn primary" onClick={onCooked}>I cooked it! ✓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── VARIANT 2: Editorial ─────────────────────────────────────────────────────
const RecipeEditorial = ({ recipe, onCooked, onNotCooked, onBack }) => {
  const missing = recipe.ingredients.filter(i => !i.inPantry);
  return (
    <div className="bc-paper" style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <TopBar onBack={onBack} page={3} />
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", height: 380, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div className="bc-blob" style={{ inset: "-10% 20%", background: "var(--bc-tomato)", opacity: 0.2 }} />
          <ShakshukaPan size={400} />
          <div style={{ position: "absolute", top: 60, left: 60 }}><Ingredient name="tomato" size={110} rotate={-12} /></div>
          <div style={{ position: "absolute", bottom: 30, right: 80 }}><Ingredient name="onion" size={110} rotate={20} /></div>
        </div>

        <div style={{ maxWidth: 1000, margin: "-32px auto 0", padding: "0 60px 80px", position: "relative" }}>
          <div className="bc-card" style={{ padding: "36px 44px" }}>
            <div className="bc-label" style={{ fontSize: 13, color: "var(--bc-ink-muted)", letterSpacing: 4 }}>
              — TODAY'S RECIPE —
            </div>
            <h1 className="bc-script" style={{ fontSize: "clamp(80px, 10vw, 140px)", margin: "0 0 4px", lineHeight: 0.9, fontStyle: "italic" }}>
              {recipe.title}<span style={{ color: "var(--bc-tomato)" }}>.</span>
            </h1>
            <p className="bc-body" style={{ fontSize: 22, fontStyle: "italic", color: "var(--bc-ink-soft)", margin: 0 }}>
              {recipe.subtitle}.
            </p>

            <div style={{
              marginTop: 24, padding: "18px 0",
              borderTop: "2px solid var(--bc-ink)", borderBottom: "2px solid var(--bc-ink)",
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
            }}>
              <Macro value={recipe.protein} unit="g" label="protein" color="var(--bc-tomato)" />
              <Macro value={recipe.calories} unit="" label="kcal" color="var(--bc-leaf)" />
              <Macro value={recipe.time} unit="m" label="time" color="var(--bc-ink)" />
              <Macro value={recipe.serves} unit="" label="serves" color="var(--bc-ink-soft)" />
            </div>

            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 44 }}>
              <div>
                <h3 className="bc-script" style={{ fontSize: 44, margin: "0 0 14px", fontStyle: "italic" }}>
                  <span className="bc-underline sage">Pantry check</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} className="bc-hand" style={{
                      display: "grid", gridTemplateColumns: "26px 30px 1fr auto",
                      alignItems: "center", gap: 10, fontSize: 17,
                      color: ing.inPantry ? "var(--bc-ink)" : "var(--bc-tomato)",
                    }}>
                      <span style={{ textAlign: "center" }}>{ing.inPantry ? "✓" : "✗"}</span>
                      <span><Ingredient name={ing.name} size={26} /></span>
                      <span>{ing.name}</span>
                      <span style={{ color: "var(--bc-ink-muted)" }}>{ing.qty} {ing.unit}</span>
                    </div>
                  ))}
                </div>
                {missing.length > 0 && (
                  <div className="bc-hand" style={{
                    marginTop: 16, padding: "10px 14px",
                    background: "rgba(216, 130, 110, 0.15)", borderLeft: "3px solid var(--bc-tomato)",
                    fontSize: 15, color: "var(--bc-ink-soft)",
                  }}>
                    you'll need to grab: <b>{missing.map(m => m.name).join(", ")}</b>.
                  </div>
                )}
              </div>

              <div>
                <h3 className="bc-script" style={{ fontSize: 44, margin: "0 0 14px", fontStyle: "italic" }}>
                  <span className="bc-underline">Method</span>
                </h3>
                <ol style={{ paddingLeft: 0, listStyle: "none" }}>
                  {recipe.steps.map((s, i) => (
                    <li key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 12, marginBottom: 14 }}>
                      <div className="bc-script" style={{ fontSize: 44, color: "var(--bc-tomato)", lineHeight: 1, fontStyle: "italic" }}>
                        {i + 1}
                      </div>
                      <div className="bc-hand" style={{ fontSize: 17, color: "var(--bc-ink-soft)", lineHeight: 1.5 }}>
                        {s}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button className="bc-btn ghost" onClick={onNotCooked}>I didn't cook it</button>
              <button className="bc-btn primary" onClick={onCooked}>I cooked it! ✓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Recipe wrapper ───────────────────────────────────────────────────────────
const Recipe = ({ recipe, variant, onCooked, onNotCooked, onBack }) => {
  if (!recipe) return null;
  if (variant === 1) return <RecipePostcard recipe={recipe} onCooked={onCooked} onNotCooked={onNotCooked} onBack={onBack} />;
  if (variant === 2) return <RecipeEditorial recipe={recipe} onCooked={onCooked} onNotCooked={onNotCooked} onBack={onBack} />;
  return <RecipeClassic recipe={recipe} onCooked={onCooked} onNotCooked={onNotCooked} onBack={onBack} />;
};

Object.assign(window, { Recipe, selectRecipe, ALL_RECIPES });
