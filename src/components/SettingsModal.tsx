import React from "react";
import { plantType } from "../types/plant";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantName: string;
  setPlantName: (name: string) => void;
  plantType: plantType;
  setPlantType: (type: plantType) => void;
  onReset: () => void;
  gameMode: "easy" | "normal" | "hard";
  setGameMode: (mode: "easy" | "normal" | "hard") => void;
}

const plantTypes: plantType[] = ["Cactus", "Fruit", "Tree", "Flower"];

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  plantName,
  setPlantName,
  plantType,
  setPlantType,
  onReset,
  gameMode,
  setGameMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">⚙️ Settings</h2>

        <label className="block">
          <span className="text-sm text-gray-700">Plant Name</span>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Plant Type</span>
          <select
            className="w-full mt-1 p-2 border rounded-lg"
            value={plantType}
            onChange={(e) => setPlantType(e.target.value as plantType)}
          >
            {plantTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Game Mode</span>
          <select
            className="w-full mt-1 p-2 border rounded-lg"
            value={gameMode}
            onChange={(e) =>
              setGameMode(e.target.value as "easy" | "normal" | "hard")
            }
          >
            <option value="easy">Relax (60s)</option>
            <option value="normal">Normal (30s)</option>
            <option value="hard">Difficult (10s)</option>
          </select>
        </label>

        <button
          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg w-full hover:bg-red-200"
          onClick={onReset}
        >
          🔄 Reset Plant
        </button>

        <button
          className="bg-green-100 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-green-200"
          onClick={onClose}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
