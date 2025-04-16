import React from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantName: string;
  setPlantName: (name: string) => void;
  onReset: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  plantName,
  setPlantName,
  onReset,
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

        <button
          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg w-full hover:bg-red-200"
          onClick={onReset}
        >
          🔄 Reset Plant
        </button>

        <button
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
