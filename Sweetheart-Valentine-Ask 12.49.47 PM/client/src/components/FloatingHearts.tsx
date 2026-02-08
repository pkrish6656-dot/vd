import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeartProps {
  delay: number;
  x: number;
  duration: number;
  size: number;
}

const FloatingHeart = ({ delay, x, duration, size }: FloatingHeartProps) => (
  <motion.div
    initial={{ y: "110vh", x: `${x}vw`, opacity: 0, scale: 0 }}
    animate={{ 
      y: "-10vh", 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
      x: [`${x}vw`, `${x + (Math.random() * 10 - 5)}vw`]
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear"
    }}
    className="fixed text-primary/20 pointer-events-none z-0"
  >
    <Heart fill="currentColor" size={size} />
  </motion.div>
);

export function FloatingHearts() {
  // Use state to ensure stable random values across renders during hydration
  const [hearts, setHearts] = useState<{ id: number; delay: number; x: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      x: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      size: 20 + Math.random() * 40
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <FloatingHeart key={h.id} {...h} />
      ))}
    </>
  );
}
