/**
 * Barrel export para todas las interfaces del proyecto
 * Permite importar desde un único punto: @/interfaces
 */

// Interfaces de datos
export type { Flower, DayFlowerMap } from "./data";

// Interfaces de componentes
export type {
  ButtonProps,
  FlowerCardProps,
  GardenGridProps,
  NavbarProps,
} from "./components";

// Interfaces de PWA
export type { BeforeInstallPromptEvent } from "./pwa";
