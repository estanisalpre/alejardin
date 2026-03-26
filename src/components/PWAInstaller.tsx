"use client";

import { useEffect } from "react";

export function PWAInstaller() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado:", registration);
        })
        .catch((error) => {
          console.log("Error al registrar Service Worker:", error);
        });
    }
  }, []);

  return null;
}
