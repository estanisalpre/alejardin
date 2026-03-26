/**
 * Interfaces para Progressive Web App (PWA)
 */

/**
 * Evento de instalación de PWA
 * Extendido del Event nativo para incluir métodos específicos de instalación
 */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
