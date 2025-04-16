import { useState } from "react";
import Plant from "./components/Plant";
import StatBar from "./components/StatBar";
import SettingsModal from "./components/SettingsModal";
import { PlantState } from "./types/plant";
import { motion } from "framer-motion";

function App() {
  const [plant, setPlant] = useState<PlantState>({
    hydration: 50,
    sunlight: 50,
    nutrients: 50,
    mood: "happy",
    growthStage: "sprout",
    name: "Leafy",
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const updateStat = (
    key: keyof Omit<PlantState, "mood" | "growthStage" | "name">,
    amount: number
  ) => {
    const newValue = Math.min(100, plant[key] + amount);
    const newPlant = { ...plant, [key]: newValue };
    newPlant.mood = getMood(newPlant);
    newPlant.growthStage = getGrowthStage(newPlant);
    setPlant(newPlant);
  };

  const getMood = (plant: PlantState): PlantState["mood"] => {
    if (plant.hydration < 30) return "thirsty";
    if (plant.sunlight < 30) return "sunny";
    if (plant.nutrients < 30) return "hungry";
    return "happy";
  };

  const getGrowthStage = (plant: PlantState): PlantState["growthStage"] => {
    const average = (plant.hydration + plant.sunlight + plant.nutrients) / 3;
    if (average >= 80) return "bloom";
    if (average >= 50) return "seedling";
    return "sprout";
  };

  const resetPlant = () => {
    setPlant({
      hydration: 50,
      sunlight: 50,
      nutrients: 50,
      mood: "happy",
      growthStage: "sprout",
      name: "Leafy",
    });
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
        🌿 Plant Pal
      </motion.h1>

      <Plant mood={plant.mood} growthStage={plant.growthStage} />

      <div className="text-green-800 font-semibold">Hello, {plant.name}!</div>

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
                20
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

      <button
        onClick={() => setIsSettingsOpen(true)}
        className="mt-6 text-sm text-green-800 underline"
      >
        ⚙️ Settings
      </button>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        plantName={plant.name}
        setPlantName={(name) => setPlant((p) => ({ ...p, name }))}
        onReset={resetPlant}
      />
    </motion.div>
  );
}

export default App;
