"use client";

import { useEffect } from "react";

export function PWAInstaller() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // Service Worker registered successfully
        })
        .catch((error) => {
          console.log("Error registering Service Worker:", error);
        });
    }
  }, []);

  return null;
}
