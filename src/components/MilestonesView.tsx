"use client";

import { motion } from "framer-motion";
import type { Milestone } from "@/interfaces";

interface MilestonesViewProps {
  milestones: Milestone[];
  currentFlowers: number;
}

export function MilestonesView({
  milestones,
  currentFlowers,
}: MilestonesViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
          Logros del Jardín
        </h2>
        <p className="text-gray-600">
          Has desbloqueado {milestones.filter((m) => m.unlocked).length} de{" "}
          {milestones.length} logros
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative overflow-hidden rounded-2xl p-6 
              transition-all duration-300
              ${
                milestone.unlocked
                  ? "bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 shadow-lg border-2 border-pink-200"
                  : "bg-gray-100/60 opacity-60 grayscale"
              }
            `}
          >
            {/* Badge de desbloqueado */}
            {milestone.unlocked && (
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  ✓ Desbloqueado
                </div>
              </div>
            )}

            {/* Emoji e ícono de candado */}
            <div className="flex items-center gap-4 mb-3">
              <div
                className={`text-5xl ${milestone.unlocked ? "animate-float" : "opacity-40"}`}
              >
                {milestone.unlocked ? milestone.emoji : "🔒"}
              </div>
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold ${milestone.unlocked ? "text-gray-800" : "text-gray-500"}`}
                >
                  {milestone.title}
                </h3>
                <p
                  className={`text-sm ${milestone.unlocked ? "text-pink-600 font-semibold" : "text-gray-400"}`}
                >
                  {milestone.flowers} flores
                </p>
              </div>
            </div>

            {/* Descripción */}
            <p
              className={`text-sm mb-4 ${milestone.unlocked ? "text-gray-700" : "text-gray-400"}`}
            >
              {milestone.description}
            </p>

            {/* Barra de progreso (solo para no desbloqueados) */}
            {!milestone.unlocked && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progreso</span>
                  <span>
                    {currentFlowers} / {milestone.flowers}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-purple-400 h-full transition-all duration-500"
                    style={{
                      width: `${Math.min((currentFlowers / milestone.flowers) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
