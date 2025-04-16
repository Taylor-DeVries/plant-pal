import React from "react";
import { Mood, GrowthStage } from "../types/plant";
import { motion } from "framer-motion";

interface Props {
  mood: Mood;
  growthStage: GrowthStage;
}

const moodEmojiMap: Record<Mood, string> = {
  happy: "🌼",
  thirsty: "💧",
  sunny: "☀️",
  hungry: "🌿",
};

const plantImageMap: Record<GrowthStage, string> = {
  sprout: "/assets/sprout.png",
  seedling: "/assets/seedling.png",
  bloom: "/assets/bloom.png",
};

const Plant: React.FC<Props> = ({ mood, growthStage }) => {
  return (
    <motion.div
      key={mood + growthStage}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: growthStage === "bloom" ? 1.2 : 1,
        opacity: 1,
        rotate: mood === "happy" ? [0, 5, -5, 5, -5, 0] : 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
      className="flex flex-col items-center space-y-2"
    >
      <motion.div
        animate={{
          rotate: mood === "happy" ? [0, 5, -5, 5, -5, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
        className="text-4xl"
      >
        {moodEmojiMap[mood]}
      </motion.div>

      <motion.img
        src={plantImageMap[growthStage]}
        alt={growthStage}
        className="w-32 h-32 object-contain rounded-md shadow-lg"
        whileTap={{ scale: 1.05 }}
        animate={{
          scale: growthStage === "bloom" ? [1, 1.1, 1.2] : 1,
        }}
        transition={{
          duration: 0.6,
          repeat: growthStage === "bloom" ? Infinity : 0,
          repeatDelay: 1,
        }}
      />

      {growthStage === "bloom" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-pink-300 via-yellow-200 to-green-100 rounded-full opacity-30"
        >
          <span className="absolute top-5 left-5 text-2xl font-semibold text-pink-500">
            🌸 Blooming!
          </span>
        </motion.div>
      )}

      <p className="text-sm text-gray-600 capitalize">Stage: {growthStage}</p>
    </motion.div>
  );
};

export default Plant;
