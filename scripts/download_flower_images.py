#!/usr/bin/env python3
"""
Descargador de imágenes de flores desde Pexels
Descarga imágenes de alta calidad para las 365 flores de Alejardín
"""

import os
import json
import time
import requests
from pathlib import Path
from typing import List, Dict, Optional
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
import re


# Cargar variables de entorno
load_dotenv("../.env.local")

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
IMAGE_RESOLUTION = os.getenv("IMAGE_RESOLUTION", "medium")
IMAGE_ORIENTATION = os.getenv("IMAGE_ORIENTATION", "portrait")

# Configuración
OUTPUT_DIR = Path("../src/assets/flowers")
REPORT_FILE = Path("download_report.json")
MAX_RETRIES = 3
DELAY_BETWEEN_REQUESTS = 0.6  # Para no exceder rate limits (200/hora = 1 cada 18s, pero con buffer)


class PexelsDownloader:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {"Authorization": api_key}
        self.base_url = "https://api.pexels.com/v1"
        self.downloaded = []
        self.failed = []
        self.fallback_used = []
        
    def search_image(self, query: str, orientation: str = "portrait") -> Optional[Dict]:
        """
        Busca una imagen en Pexels
        """
        url = f"{self.base_url}/search"
        params = {
            "query": query,
            "per_page": 1,
            "orientation": orientation,
            "size": "medium",
            "locale": "es-ES"
        }
        
        try:
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data.get("photos"):
                return data["photos"][0]
            return None
        except Exception as e:
            print(f"  ⚠️  Error buscando '{query}': {e}")
            return None
    
    def download_image(self, image_url: str, output_path: Path) -> bool:
        """
        Descarga y guarda una imagen
        """
        try:
            response = requests.get(image_url, timeout=30)
            response.raise_for_status()
            
            # Abrir imagen con PIL para optimización
            img = Image.open(BytesIO(response.content))
            
            # Convertir a RGB si es necesario (eliminar alpha channel)
            if img.mode in ("RGBA", "LA", "P"):
                background = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "P":
                    img = img.convert("RGBA")
                background.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
                img = background
            
            # Optimizar tamaño si es muy grande (máximo 800px en el lado más largo)
            max_size = 800
            if max(img.size) > max_size:
                ratio = max_size / max(img.size)
                new_size = tuple(int(dim * ratio) for dim in img.size)
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Guardar con calidad optimizada
            img.save(output_path, "JPEG", quality=85, optimize=True)
            return True
            
        except Exception as e:
            print(f"  ❌ Error descargando imagen: {e}")
            return False
    
    def sanitize_filename(self, name: str) -> str:
        """
        Limpia el nombre para usarlo como filename
        """
        # Remover acentos y caracteres especiales
        name = name.lower()
        replacements = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'ñ': 'n', ' ': '-', 'ü': 'u'
        }
        for old, new in replacements.items():
            name = name.replace(old, new)
        
        # Remover caracteres no alfanuméricos excepto guiones
        name = re.sub(r'[^a-z0-9-]', '', name)
        return name
    
    def get_fallback_query(self, original_query: str) -> Optional[str]:
        """
        Obtiene una búsqueda alternativa si la original falla
        """
        # Remover variaciones de color/tipo
        base_query = re.sub(r'\s+(roja|blanca|rosa|amarilla|morada|azul|naranja|silvestre|tropical|de jardín).*', '', original_query)
        
        if base_query != original_query:
            return base_query
        
        # Fallback genérico por familia de flores
        generic_fallbacks = {
            "orquídea": "orchid flower",
            "rosa": "rose flower",
            "lirio": "lily flower",
            "tulipán": "tulip flower",
            "girasol": "sunflower",
            "margarita": "daisy flower",
        }
        
        for key, fallback in generic_fallbacks.items():
            if key in original_query.lower():
                return fallback
        
        return "beautiful flower"  # Último recurso
    
    def download_flower_image(self, flower_id: int, flower_name: str) -> bool:
        """
        Descarga la imagen de una flor específica
        """
        filename = f"{flower_id:03d}-{self.sanitize_filename(flower_name)}.jpg"
        output_path = OUTPUT_DIR / filename
        
        # Skip si ya existe
        if output_path.exists():
            print(f"  ⏭️  Ya existe: {filename}")
            self.downloaded.append({
                "id": flower_id,
                "name": flower_name,
                "filename": filename,
                "status": "skipped"
            })
            return True
        
        print(f"  🔍 Buscando: {flower_name} (ID: {flower_id})")
        
        # Intentar búsqueda original
        search_query = f"{flower_name} flower"
        photo = self.search_image(search_query, IMAGE_ORIENTATION)
        
        # Intentar fallback si no encuentra
        if not photo:
            print(f"    ⚠️  No encontrada, intentando búsqueda alternativa...")
            fallback_query = self.get_fallback_query(flower_name)
            photo = self.search_image(fallback_query, IMAGE_ORIENTATION)
            
            if photo:
                self.fallback_used.append({
                    "id": flower_id,
                    "name": flower_name,
                    "original_query": search_query,
                    "fallback_query": fallback_query
                })
                print(f"    ✅ Encontrada con fallback: {fallback_query}")
        
        if not photo:
            print(f"    ❌ No se encontró imagen para: {flower_name}")
            self.failed.append({
                "id": flower_id,
                "name": flower_name,
                "reason": "No results"
            })
            return False
        
        # Obtener URL de la imagen según resolución
        image_url = photo["src"].get(IMAGE_RESOLUTION, photo["src"]["medium"])
        
        # Descargar imagen
        print(f"    📥 Descargando: {filename}")
        if self.download_image(image_url, output_path):
            print(f"    ✅ Descargada: {filename}")
            self.downloaded.append({
                "id": flower_id,
                "name": flower_name,
                "filename": filename,
                "status": "downloaded",
                "photographer": photo.get("photographer"),
                "url": photo.get("url")
            })
            return True
        else:
            self.failed.append({
                "id": flower_id,
                "name": flower_name,
                "reason": "Download failed"
            })
            return False
    
    def generate_report(self):
        """
        Genera un reporte del proceso de descarga
        """
        report = {
            "total_downloaded": len(self.downloaded),
            "total_failed": len(self.failed),
            "total_fallback": len(self.fallback_used),
            "downloaded": self.downloaded,
            "failed": self.failed,
            "fallback_used": self.fallback_used
        }
        
        with open(REPORT_FILE, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print("\n" + "="*60)
        print("📊 REPORTE FINAL")
        print("="*60)
        print(f"✅ Descargadas exitosamente: {len(self.downloaded)}")
        print(f"⚠️  Con fallback usado: {len(self.fallback_used)}")
        print(f"❌ Fallidas: {len(self.failed)}")
        print(f"\n📄 Reporte detallado guardado en: {REPORT_FILE}")
        
        if self.failed:
            print(f"\n⚠️  Flores que requieren atención manual:")
            for item in self.failed[:10]:
                print(f"  - ID {item['id']}: {item['name']}")
            if len(self.failed) > 10:
                print(f"  ... y {len(self.failed) - 10} más")


def load_flowers_data() -> List[Dict]:
    """
    Carga los datos de flores desde flowers.ts
    """
    flowers_file = Path("../src/data/flowers.ts")
    
    with open(flowers_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer flores usando regex
    pattern = r'id:\s*(\d+),\s*nombre:\s*"([^"]+)"'
    matches = re.findall(pattern, content)
    
    flowers = [{"id": int(id), "nombre": nombre} for id, nombre in matches]
    
    print(f"✅ Cargadas {len(flowers)} flores desde flowers.ts")
    return flowers


def main():
    print("🌸 Descargador de Imágenes de Flores - Alejardín\n")
    
    # Validar API key
    if not PEXELS_API_KEY:
        print("❌ Error: PEXELS_API_KEY no configurada en .env.local")
        return
    
    print(f"✅ API Key configurada")
    print(f"📐 Resolución: {IMAGE_RESOLUTION}")
    print(f"📱 Orientación: {IMAGE_ORIENTATION}")
    print(f"📁 Directorio de salida: {OUTPUT_DIR}\n")
    
    # Crear directorio de salida
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Cargar datos de flores
    flowers = load_flowers_data()
    
    print(f"\n🚀 Iniciando descarga de {len(flowers)} flores...")
    print(f"⏱️  Tiempo estimado: ~{len(flowers) * 0.6 / 60:.0f} minutos\n")
    print("="*60)
    
    # Crear downloader
    downloader = PexelsDownloader(PEXELS_API_KEY)
    
    # Descargar cada flor
    for i, flower in enumerate(flowers, 1):
        print(f"\n[{i}/{len(flowers)}]")
        downloader.download_flower_image(flower["id"], flower["nombre"])
        
        # Delay entre requests para respetar rate limits
        if i < len(flowers):
            time.sleep(DELAY_BETWEEN_REQUESTS)
    
    # Generar reporte
    downloader.generate_report()
    
    print("\n🎉 ¡Proceso completado!")


if __name__ == "__main__":
    main()
