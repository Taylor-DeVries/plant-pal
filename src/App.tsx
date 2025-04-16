import { useState, useEffect } from "react";
import Plant from "./components/Plant";
import StatBar from "./components/StatBar";
import SettingsModal from "./components/SettingsModal";
import { Mood, PlantState } from "./types/plant";
import { motion } from "framer-motion";

type GameMode = "easy" | "normal" | "hard";

function App() {
  const defaultPlantState: PlantState = {
    hydration: 50,
    sunlight: 50,
    nutrients: 50,
    mood: "am happy",
    growthStage: "seedling",
    name: "Leafy",
  };

  const [plant, setPlant] = useState<PlantState>(() => {
    const savedPlant = localStorage.getItem("plantState");
    return savedPlant ? JSON.parse(savedPlant) : defaultPlantState;
  });

  const moodEmojiMap: Record<Mood, string> = {
    "am happy": "🌼",
    "am thirsty": "💧",
    "need sun": "☀️",
    "am hungry": "🌿",
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("normal");

  const getIntervalTime = () => {
    switch (gameMode) {
      case "easy":
        return 60000;
      case "normal":
        return 30000;
      case "hard":
        return 10000;
      default:
        return 30000;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlant((prevPlant) => {
        const newHydration = Math.max(0, prevPlant.hydration - 10);
        const newSunlight = Math.max(0, prevPlant.sunlight - 10);
        const newNutrients = Math.max(0, prevPlant.nutrients - 10);

        const newPlant = {
          ...prevPlant,
          hydration: newHydration,
          sunlight: newSunlight,
          nutrients: newNutrients,
        };

        newPlant.mood = getMood(newPlant);
        newPlant.growthStage = getGrowthStage(newPlant);
        return newPlant;
      });
    }, getIntervalTime());

    return () => clearInterval(interval);
  }, [gameMode]);

  useEffect(() => {
    localStorage.setItem("plantState", JSON.stringify(plant));
  }, [plant]);

  const updateStat = (
    key: keyof Omit<PlantState, "mood" | "growthStage" | "name">,
    amount: number
  ) => {
    setPlant((prevPlant) => {
      const newValue = Math.min(100, prevPlant[key] + amount);
      const newPlant = { ...prevPlant, [key]: newValue };
      newPlant.mood = getMood(newPlant);
      newPlant.growthStage = getGrowthStage(newPlant);
      return newPlant;
    });
  };

  const getMood = (plant: PlantState): PlantState["mood"] => {
    if (plant.hydration <= 40) return "am thirsty";
    if (plant.sunlight <= 50) return "need sun";
    if (plant.nutrients <= 30) return "am hungry";
    return "am happy";
  };

  const getGrowthStage = (plant: PlantState): PlantState["growthStage"] => {
    const average = (plant.hydration + plant.sunlight + plant.nutrients) / 3;
    if (average >= 80) return "bloom";
    if (average >= 50) return "sprout";
    return "seedling";
  };

  const resetPlant = () => {
    setPlant(defaultPlantState);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-b from-lime-100 to-green-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-green-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🌿 my plant pal 🌿
      </motion.h1>

      <Plant mood={plant.mood} growthStage={plant.growthStage} />

      <div className="flex flex-col items-center gap-1">
        <p className="text-green-800 font-semibold">hi i'm, {plant.name}!</p>
        <p className="text-green-800 font-semibold">i {plant.mood}!</p>
      </div>
      <div className="space-y-3 w-full max-w-sm">
        <StatBar label="Hydration" value={plant.hydration} color="#6EE7B7" />
        <StatBar label="Sunlight" value={plant.sunlight} color="#FCD34D" />
        <StatBar label="Nutrients" value={plant.nutrients} color="#A78BFA" />
      </div>

      <div className="flex gap-4 mt-4">
        {[
          { label: "💧 Water", key: "hydration" },
          { label: "☀️ Sun", key: "sunlight" },
          { label: "🌿 Fertilizer", key: "nutrients" },
        ].map(({ label, key }) => (
          <motion.button
            key={key}
            onClick={() =>
              updateStat(
                key as keyof Omit<PlantState, "mood" | "growthStage" | "name">,
                10
              )
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-white hover:bg-white transition"
          >
            {label}
          </motion.button>
        ))}
      </div>

      <div className="text-2xl font-bold text-green-800">
        mood: {moodEmojiMap[plant.mood]}
      </div>

      <button
        onClick={() => setIsSettingsOpen(true)}
        className="mt-6 text-sm text-green-800 font-semibold bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-white hover:bg-white transition"
      >
        ⚙️ Settings
      </button>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        plantName={plant.name}
        setPlantName={(name) => setPlant((p) => ({ ...p, name }))}
        onReset={resetPlant}
        gameMode={gameMode}
        setGameMode={setGameMode}
      />
    </motion.div>
  );
}

export default App;
