#!/usr/bin/env python3
"""
Actualizador de referencias de imágenes
Actualiza flowers.ts y flowers/index.ts con las URLs de las imágenes descargadas
"""

import re
import json
from pathlib import Path
from typing import List, Dict


def get_downloaded_images() -> Dict[int, str]:
    """
    Obtiene el mapeo de ID -> filename desde el directorio de imágenes
    """
    images_dir = Path("../src/assets/flowers")
    image_map = {}
    
    for img_file in images_dir.glob("*.jpg"):
        # Extraer ID del nombre del archivo (formato: 001-nombre.jpg)
        match = re.match(r'(\d+)-', img_file.name)
        if match:
            flower_id = int(match.group(1))
            image_map[flower_id] = f"/assets/flowers/{img_file.name}"
    
    return image_map


def update_flowers_index(image_map: Dict[int, str]):
    """
    Actualiza src/assets/flowers/index.ts con el mapeo de imágenes
    """
    index_file = Path("../src/assets/flowers/index.ts")
    
    # Generar el contenido del mapeo
    entries = [f'  {id}: "{url}",' for id, url in sorted(image_map.items())]
    entries_str = '\n'.join(entries)
    
    content = f'''/**
 * Barrel export para imágenes de flores
 * Este archivo se genera automáticamente
 * 
 * Generado con: python update_flower_images.py
 */

export const flowerImages: Record<number, string> = {{
{entries_str}
}};

/**
 * Obtiene la URL de la imagen de una flor por ID
 * @param flowerId - ID de la flor (1-365)
 * @returns URL de la imagen o undefined si no existe
 */
export function getFlowerImage(flowerId: number): string | undefined {{
  return flowerImages[flowerId];
}}

/**
 * Verifica si existe una imagen para una flor
 * @param flowerId - ID de la flor
 * @returns true si existe la imagen
 */
export function hasFlowerImage(flowerId: number): boolean {{
  return flowerId in flowerImages;
}}
'''
    
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Actualizado: {index_file}")
    print(f"   Total de imágenes: {len(image_map)}")


def update_flowers_data(image_map: Dict[int, str]):
    """
    Actualiza src/data/flowers.ts agregando el campo imagenUrl
    """
    flowers_file = Path("../src/data/flowers.ts")
    
    with open(flowers_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar y actualizar cada flor
    def replace_flower(match):
        indent = match.group(1)
        flower_obj = match.group(2)
        
        # Extraer el ID
        id_match = re.search(r'id:\s*(\d+)', flower_obj)
        if not id_match:
            return match.group(0)
        
        flower_id = int(id_match.group(1))
        
        # Si ya tiene imagenUrl, actualizar. Si no, agregar
        if 'imagenUrl:' in flower_obj:
            # Actualizar URL existente
            if flower_id in image_map:
                flower_obj = re.sub(
                    r'imagenUrl:\s*"[^"]*"',
                    f'imagenUrl: "{image_map[flower_id]}"',
                    flower_obj
                )
        else:
            # Agregar imagenUrl antes del cierre
            if flower_id in image_map:
                # Encontrar la última línea antes del cierre
                lines = flower_obj.split('\n')
                # Insertar imagenUrl después de 'imagen' y antes del cierre
                for i, line in enumerate(lines):
                    if 'imagen:' in line:
                        lines.insert(i + 1, f'{indent}    imagenUrl: "{image_map[flower_id]}",')
                        break
                flower_obj = '\n'.join(lines)
        
        return f"{indent}{{{flower_obj}{indent}}},"
    
    # Reemplazar todos los objetos de flores
    pattern = r'(\s*)(\{\s*id:.*?\n\s*\}),'
    updated_content = re.sub(pattern, replace_flower, content, flags=re.DOTALL)
    
    with open(flowers_file, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✅ Actualizado: {flowers_file}")


def main():
    print("🖼️  Actualizador de Referencias de Imágenes - Alejardín\n")
    
    # Obtener imágenes descargadas
    print("📁 Escaneando directorio de imágenes...")
    image_map = get_downloaded_images()
    
    if not image_map:
        print("❌ No se encontraron imágenes en src/assets/flowers/")
        print("   Ejecuta primero: python download_flower_images.py")
        return
    
    print(f"✅ Encontradas {len(image_map)} imágenes\n")
    
    # Actualizar archivos
    print("🔄 Actualizando archivos...")
    update_flowers_index(image_map)
    update_flowers_data(image_map)
    
    print("\n🎉 ¡Actualización completada!")
    print("\n📝 Siguiente paso:")
    print("   cd ..")
    print("   npm run dev")


if __name__ == "__main__":
    main()
