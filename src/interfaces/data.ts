/**
 * Data structure
 */

export interface Flower {
  id: number;
  nombre: string;
  imagen: string; // Emoji as fallback
  imagenUrl?: string; // optional image URL
  mensaje: string;
  significado: string;
}

export interface DayFlowerMap {
  [day: number]: number; // day (1-365) -> flowerId
}
