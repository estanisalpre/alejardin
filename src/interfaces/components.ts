/**
 * Interfaces para props de componentes de React
 */

import { Flower, DayFlowerMap } from "./data";

/**
 * Props del componente Button
 */
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

/**
 * Props del componente FlowerCard
 */
export interface FlowerCardProps {
  flower: Flower;
  onClose: () => void;
}

/**
 * Props del componente GardenGrid
 */
export interface GardenGridProps {
  flowers: Flower[];
  dayFlowerMap: DayFlowerMap;
  onFlowerClick: (flower: Flower) => void;
}

/**
 * Props del componente Navbar
 */
export interface NavbarProps {
  onLogoClick?: () => void;
}
