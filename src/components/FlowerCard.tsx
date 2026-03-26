"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FlowerCardProps } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";

export function FlowerCard({ flower, onClose }: FlowerCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasImage = flower.imagenUrl && !imageError;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
          }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Pétalos decorativos flotantes */}
          <motion.div
            className="absolute top-10 left-10 text-4xl opacity-30"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute top-20 right-10 text-3xl opacity-20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🌺
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-20 text-3xl opacity-20"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🌼
          </motion.div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none z-10"
          >
            ×
          </button>

          {/* Flower image or emoji */}
          {hasImage ? (
            <motion.div
              className="relative w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.2,
              }}
            >
              <Image
                src={flower.imagenUrl!}
                alt={flower.nombre}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              className="text-8xl text-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.2,
              }}
            >
              {flower.imagen}
            </motion.div>
          )}

          {/* Flower name */}
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {flower.nombre}
          </motion.h2>

          {/* Message */}
          <motion.div
            className="bg-gradient-to-r from-soft-pink to-lavender rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-gray-700 text-center italic leading-relaxed">
              &ldquo;{flower.mensaje}&rdquo;
            </p>
          </motion.div>

          {/* Meaning */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Significado
            </span>
            <p className="text-xl text-pink-600 font-medium mt-2">
              {flower.significado}
            </p>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div
            className="mt-8 flex justify-center gap-2 text-2xl opacity-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span>✨</span>
            <span>🌸</span>
            <span>✨</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
