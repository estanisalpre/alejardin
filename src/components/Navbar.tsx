"use client";

import { useState, useEffect } from "react";
import { NavbarProps, BeforeInstallPromptEvent } from "@/interfaces";

export function Navbar({ onLogoClick }: NavbarProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Detectar si la app ya está instalada
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Capturar el evento beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Detectar después de la instalación
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    // Mostrar navbar al hacer scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback para navegadores que no soportan beforeinstallprompt
      alert(
        'Para instalar esta app:\n\n• En Chrome/Edge: Usa el menú (⋮) > "Instalar Alejardín"\n• En iOS Safari: Toca el botón compartir y selecciona "Agregar a pantalla de inicio"',
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const scrollToTop = () => {
    // Si hay un callback personalizado, usarlo
    if (onLogoClick) {
      onLogoClick();
    } else {
      // Fallback a scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="text-3xl animate-float">🌸</div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Alejardín
            </h1>
          </div>
        </button>

        {/* Install Button */}
        {!isInstalled && (
          <button
            onClick={handleInstallClick}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            📱 Instalar en mi celular
          </button>
        )}
      </div>
    </nav>
  );
}
