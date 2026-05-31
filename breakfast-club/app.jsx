// Main app — orchestrates flow
const SEED_PANTRY = [
  { id: 1,  name: "eggs",        qty: 8,   unit: "pc" },
  { id: 2,  name: "tomatoes",    qty: 6,   unit: "pc" },
  { id: 3,  name: "onion",       qty: 2,   unit: "pc" },
  { id: 4,  name: "bell pepper", qty: 1,   unit: "pc" },
  { id: 5,  name: "garlic",      qty: 12,  unit: "tsp" },
  { id: 6,  name: "olive oil",   qty: 1,   unit: "cup" },
  { id: 7,  name: "milk",        qty: 1,   unit: "cup" },
  { id: 8,  name: "butter",      qty: 200, unit: "g" },
  { id: 9,  name: "cheese",      qty: 150, unit: "g" },
  { id: 10, name: "yogurt",      qty: 2,   unit: "cup" },
];

const App = () => {
  const [tweaks, setTweak] = useTweaks({
    recipeVariant: 0,
    paperTone: "cream",
    accentColor: "#d9472a",
  });

  const [screen, setScreen] = React.useState("landing");
  const [pantry, setPantry] = React.useState(SEED_PANTRY);
  const [day, setDay] = React.useState("Sun");
  const [people, setPeople] = React.useState(1);
  const [pref, setPref] = React.useState("veg");
  const [subtracted, setSubtracted] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);

  // Apply paper tone + accent colour tweaks to CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    const tones = {
      cream: ["#fbf3e3", "#f4e9d2"],
      ivory: ["#faf6ec", "#f0e9d4"],
      peach: ["#fbece0", "#f5dcc4"],
      sage:  ["#eef1e4", "#dde3cd"],
    };
    const t = tones[tweaks.paperTone] || tones.cream;
    root.style.setProperty("--bc-paper", t[0]);
    root.style.setProperty("--bc-paper-deep", t[1]);
    root.style.setProperty("--bc-tomato", tweaks.accentColor || "#d9472a");
  }, [tweaks.paperTone, tweaks.accentColor]);

  // Called when the cooking buffer finishes — select a recipe based on current pref + pantry
  const handleCookingDone = () => {
    const recipe = window.selectRecipe(pref, pantry);
    setSelectedRecipe(recipe);
    setScreen("recipe");
  };

  // Called when user marks the recipe as cooked — deduct used ingredients from pantry
  const handleCooked = () => {
    if (!selectedRecipe) return;
    const subs = [];
    const next = pantry.map((p) => {
      const match = selectedRecipe.ingredients.find(
        (i) => i.inPantry && i.pantryKey && i.pantryKey.toLowerCase() === p.name.toLowerCase()
      );
      if (match) {
        const used = Math.min(p.qty, match.qty);
        subs.push({ name: p.name, qty: used, unit: p.unit });
        return { ...p, qty: Math.max(0, p.qty - match.qty) };
      }
      return p;
    });
    setPantry(next);
    setSubtracted(subs);
    setScreen("cooked");
  };

  const screenEl = (() => {
    switch (screen) {
      case "landing":
        return <Landing onStart={() => setScreen("pantry")} />;
      case "pantry":
        return <Pantry pantry={pantry} setPantry={setPantry} day={day} setDay={setDay}
                       onNext={() => setScreen("morning")} onBack={() => setScreen("landing")} />;
      case "morning":
        return <GoodMorning people={people} setPeople={setPeople} pref={pref} setPref={setPref}
                            onNext={() => setScreen("cooking")} onBack={() => setScreen("pantry")} />;
      case "cooking":
        return <Cooking onDone={handleCookingDone} />;
      case "recipe":
        return <Recipe recipe={selectedRecipe} variant={tweaks.recipeVariant}
                       onCooked={handleCooked} onNotCooked={() => setScreen("notcooked")}
                       onBack={() => setScreen("morning")} />;
      case "cooked":
        return <Cooked subtracted={subtracted}
                       onBackToPantry={() => setScreen("runninglow")}
                       onCookAnother={() => setScreen("morning")} />;
      case "notcooked":
        return <NotCooked onTryAgain={() => setScreen("cooking")} onBackToPantry={() => setScreen("pantry")} />;
      case "runninglow":
        return <RunningLow pantry={pantry} onBack={() => setScreen("pantry")} />;
      default:
        return null;
    }
  })();

  return (
    <>
      <div key={screen} className="bc-fade" style={{ position: "absolute", inset: 0 }}>
        {screenEl}
      </div>

      <TweaksPanel>
        <TweakSection label="Recipe Card" />
        <TweakSelect label="Layout" value={tweaks.recipeVariant}
          options={[
            { value: "0", label: "Classic" },
            { value: "1", label: "Postcard" },
            { value: "2", label: "Editorial" },
          ]}
          onChange={(v) => setTweak("recipeVariant", Number(v))} />

        <TweakSection label="Palette" />
        <TweakRadio label="Paper" value={tweaks.paperTone}
          options={["cream", "ivory", "peach", "sage"]}
          onChange={(v) => setTweak("paperTone", v)} />
        <TweakColor label="Accent" value={tweaks.accentColor}
          options={["#d9472a", "#e0848a", "#d99066", "#8a4a78"]}
          onChange={(v) => setTweak("accentColor", v)} />
      </TweaksPanel>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
