/*
 // Components props
*/
import { Flower, DayFlowerMap } from "./data";

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export interface FlowerCardProps {
  flower: Flower;
  onClose: () => void;
}

export interface GardenGridProps {
  flowers: Flower[];
  dayFlowerMap: DayFlowerMap;
  onFlowerClick: (flower: Flower) => void;
}

export interface NavbarProps {
  onLogoClick?: () => void;
}
