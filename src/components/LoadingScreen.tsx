"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FlowerPosition {
  x: number;
  duration: number;
  delay: number;
  emoji: string;
}

const FLOWER_EMOJIS = ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🏵️", "💐"];

export function LoadingScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  const [flowerPositions, setFlowerPositions] = useState<FlowerPosition[]>([]);

  useEffect(() => {
    setIsMounted(true);

    const width = window.innerWidth;
    const height = window.innerHeight;

    setDimensions({ width, height });

    const positions: FlowerPosition[] = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
    }));

    setFlowerPositions(positions);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-soft-pink via-lavender to-sky-soft flex items-center justify-center overflow-hidden z-50">
      {/* Flores cayendo en el fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted &&
          flowerPositions.map((flower, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-30"
              initial={{
                x: flower.x,
                y: -50,
                rotate: 0,
              }}
              animate={{
                y: dimensions.height + 50,
                rotate: 360,
              }}
              transition={{
                duration: flower.duration,
                repeat: Infinity,
                delay: flower.delay,
                ease: "linear",
              }}
            >
              {flower.emoji}
            </motion.div>
          ))}
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo de Alejardín girando */}
        <motion.div
          className="mb-8"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-32 h-32"
          >
            <defs>
              <linearGradient
                id="pinkGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#FF8FB1" }} />
                <stop offset="100%" style={{ stopColor: "#D946EF" }} />
              </linearGradient>
            </defs>

            {/* Pétalos de flor */}
            <ellipse
              cx="35"
              cy="25"
              rx="12"
              ry="18"
              fill="url(#pinkGradient)"
              transform="rotate(-30 35 25)"
            />
            <ellipse
              cx="65"
              cy="25"
              rx="12"
              ry="18"
              fill="url(#pinkGradient)"
              transform="rotate(30 65 25)"
            />
            <ellipse
              cx="25"
              cy="50"
              rx="12"
              ry="18"
              fill="url(#pinkGradient)"
              transform="rotate(-60 25 50)"
            />
            <ellipse
              cx="75"
              cy="50"
              rx="12"
              ry="18"
              fill="url(#pinkGradient)"
              transform="rotate(60 75 50)"
            />
            <ellipse
              cx="35"
              cy="75"
              rx="12"
              ry="18"
              fill="url(#pinkGradient)"
              transform="rotate(-90 35 75)"
            />
            <ellipse
              cx="65"
              cy="75"
              rx="12"
              ry="18"
              fill="url(#pinkGradient)"
              transform="rotate(90 65 75)"
            />

            {/* Centro de la flor con letra A */}
            <circle cx="50" cy="50" r="20" fill="#FFE4E9" />
            <text
              x="50"
              y="62"
              fontFamily="Arial, sans-serif"
              fontSize="32"
              fontWeight="bold"
              fill="#D946EF"
              textAnchor="middle"
            >
              A
            </text>
          </svg>
        </motion.div>

        {/* Texto animado */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Cargando tus flores...
          </motion.h2>

          {/* Puntos animados */}
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
