"use client";

import { useState, useEffect } from "react";
import {
  FlowerCard,
  GardenGrid,
  Button,
  ScrollToTop,
  Navbar,
  Footer,
  PWAInstaller,
  LoadingScreen,
  MilestonesView,
} from "@/components";
import { flowers } from "@/data/flowers";
import {
  getDayFlowerMap,
  saveFlowerOpened,
  canOpenToday,
  getMilestones,
  checkAndUnlockMilestones,
} from "@/lib/storage";
import type { Flower, DayFlowerMap } from "@/interfaces";

export default function Home() {
  const [currentFlower, setCurrentFlower] = useState<Flower | null>(null);
  const [dayFlowerMap, setDayFlowerMap] = useState<DayFlowerMap>({});
  const [showGarden, setShowGarden] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const minLoadingTime = 3000; // 3 segundos mínimo

    const dayMap = getDayFlowerMap();
    setDayFlowerMap(dayMap);

    // Esperar al menos 3 segundos antes de ocultar el loading
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  }, []);

  const openDailyFlower = () => {
    if (!canOpenToday()) {
      setMessage("Ya descubriste la flor de hoy 🌷 vuelve mañana");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    const unlockedIds = Object.values(dayFlowerMap);
    const availableFlowers = flowers.filter((f) => !unlockedIds.includes(f.id));

    if (availableFlowers.length === 0) {
      setMessage("¡Has descubierto todas las flores! 🎉");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    const randomFlower =
      availableFlowers[Math.floor(Math.random() * availableFlowers.length)];

    saveFlowerOpened(randomFlower.id);
    const newDayMap = getDayFlowerMap();
    setDayFlowerMap(newDayMap);
    setCurrentFlower(randomFlower);

    // Verificar si se desbloqueó un milestone
    const totalUnlocked = Object.keys(newDayMap).length;
    const unlockedMilestone = checkAndUnlockMilestones(totalUnlocked);

    if (unlockedMilestone) {
      setTimeout(() => {
        setMessage(
          `${unlockedMilestone.emoji} ${unlockedMilestone.title}: ${unlockedMilestone.description}`,
        );
        setTimeout(() => setMessage(""), 5000);
      }, 1000);
    }
  };

  const handleCloseFlower = () => {
    setCurrentFlower(null);
  };

  const goToHome = () => {
    setShowGarden(false);
    setShowMilestones(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink via-lavender to-sky-soft py-8 px-4">
      {/* PWA Installer */}
      <PWAInstaller />

      {/* Navbar flotante */}
      <Navbar onLogoClick={goToHome} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-10 pb-2">
            <div className="text-5xl animate-float">🌸</div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight pb-1">
              Alejardín
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Una flor nueva cada día para ti
          </p>
          <div className="text-2xl font-semibold text-pink-600">
            Día {Object.keys(dayFlowerMap).length} de 365
          </div>
          {Object.keys(dayFlowerMap).length > 0 && (
            <div className="mt-2 w-full max-w-md mx-auto bg-white/40 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-purple-400 h-full transition-all duration-500"
                style={{
                  width: `${(Object.keys(dayFlowerMap).length / 365) * 100}%`,
                }}
              />
            </div>
          )}
        </header>

        {/* Message - Notificación mejorada full width */}
        {message && (
          <div className="fixed top-4 left-4 right-4 z-50 animate-scale-in">
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-2 border-pink-300 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm">
              <p className="text-gray-800 font-semibold text-center text-sm md:text-base">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* Current Flower Modal */}
        {currentFlower && (
          <FlowerCard flower={currentFlower} onClose={handleCloseFlower} />
        )}

        {/* Main Content */}
        {!showGarden && !showMilestones ? (
          <div className="text-center space-y-8 animate-scale-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <div className="text-6xl mb-6 animate-float">🌸</div>
              <Button onClick={openDailyFlower} variant="primary">
                Abrir flor del día
              </Button>
              <div className="mt-6 space-y-3">
                <Button onClick={() => setShowGarden(true)} variant="secondary">
                  Visitar jardín ({Object.keys(dayFlowerMap).length} flores)
                </Button>
                <Button
                  onClick={() => setShowMilestones(true)}
                  variant="secondary"
                >
                  Ver logros 🏆
                </Button>
              </div>
            </div>

            {/* Footer en página principal */}
            <Footer />
          </div>
        ) : showMilestones ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Mis Logros</h2>
              <Button
                onClick={() => setShowMilestones(false)}
                variant="secondary"
              >
                ← Volver
              </Button>
            </div>
            <MilestonesView
              milestones={getMilestones()}
              currentFlowers={Object.keys(dayFlowerMap).length}
            />

            {/* Footer en milestones */}
            <Footer />
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Mi jardín</h2>
              <Button onClick={() => setShowGarden(false)} variant="secondary">
                ← Volver
              </Button>
            </div>
            <GardenGrid
              flowers={flowers}
              dayFlowerMap={dayFlowerMap}
              onFlowerClick={(flower) => setCurrentFlower(flower)}
            />

            {/* Footer en jardín */}
            <Footer />
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
