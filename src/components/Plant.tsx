import React, { useEffect, useState } from "react";
import { Mood, GrowthStage } from "../types/plant";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  mood: Mood;
  growthStage: GrowthStage;
}

const plantImageMap: Record<GrowthStage, string> = {
  sprout: "/assets/sprout.png",
  seedling: "/assets/seedling.png",
  bloom: "/assets/bloom.png",
};

const particles = Array.from({ length: 12 }, (_, i) => i);

const Plant: React.FC<Props> = ({ growthStage }) => {
  const [prevStage, setPrevStage] = useState<GrowthStage>(growthStage);
  const [showParticles, setShowParticles] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (growthStage !== prevStage) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);
      setPrevStage(growthStage);
    }
  }, [growthStage, prevStage]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <div className="relative flex flex-col items-center space-y-2">
      <motion.div
        onClick={handleClick}
        className="relative flex items-center justify-center w-36 h-36 cursor-pointer"
        animate={clicked ? { scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <img
          src={plantImageMap[growthStage]}
          alt={growthStage}
          className="w-32 h-32 object-contain"
        />

        <AnimatePresence>
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    scale: 0.5,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 1) * 100,
                    scale: 1.2,
                  }}
                  transition={{ duration: 1 }}
                  className="absolute top-1/2 left-1/2 text-pink-400 text-sm"
                >
                  {["✨", "🌸", "💖"][i % 3]}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {growthStage === "bloom" &&
        Array.from({ length: 6 }).map((_, idx) => (
          <motion.div
            key={idx}
            className="sparkle"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        ))}

      <p className="text-sm text-gray-600 capitalize">Stage: {growthStage}</p>
    </div>
  );
};

export default Plant;
