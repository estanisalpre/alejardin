/**
 * Interfaces para estructuras de datos del proyecto Alejardín
 */

/**
 * Representa una flor con todos sus datos
 */
export interface Flower {
  id: number;
  nombre: string;
  imagen: string; // Emoji como fallback
  imagenUrl?: string; // URL de la imagen real (opcional)
  mensaje: string;
  significado: string;
}

/**
 * Mapeo de día del año (1-365) a ID de flor
 * Usado para tracking de flores desbloqueadas por día
 */
export interface DayFlowerMap {
  [day: number]: number; // día (1-365) -> flowerId
}
