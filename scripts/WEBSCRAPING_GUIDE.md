# 🌸 Flower Scraper - Web Scraping para Alejardín

Sistema automatizado de web scraping para obtener imágenes y datos de flores.

## 📋 Objetivo

Automatizar la recolección de:

- Nombres de flores
- Imágenes de alta calidad
- Significados y descripciones
- Datos botánicos

## 🛠️ Stack Tecnológico

- **Python 3.10+**
- **Beautiful Soup 4** - Parsing HTML
- **Playwright** - Navegador automatizado (para sitios dinámicos)
- **Requests** - HTTP requests
- **Pillow** - Procesamiento de imágenes

## 📦 Instalación

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate  # Windows

# Instalar dependencias
pip install -r requirements.txt

# Instalar navegadores para Playwright
playwright install chromium
```

## 📁 Estructura del Proyecto

```
flower-scraper/
├── scraper.py           # Script principal de scraping
├── image_downloader.py  # Descargador de imágenes
├── data_processor.py    # Procesamiento y limpieza
├── requirements.txt     # Dependencias Python
├── config.json         # Configuración de fuentes
├── output/
│   ├── images/         # Imágenes descargadas
│   ├── flowers.json    # Datos en JSON
│   └── flowers.ts      # Datos en TypeScript
└── README.md
```

## 🎯 Fuentes Recomendadas

### 1. Wikipedia (Datos)

- URL: `https://es.wikipedia.org/wiki/Categoría:Flores`
- Pros: Datos confiables, libre uso
- Cons: Imágenes con licencias variables

### 2. Unsplash (Imágenes)

- URL: `https://unsplash.com/s/photos/flowers`
- Pros: Alta calidad, uso libre
- Cons: API con límites

### 3. Pexels (Imágenes)

- URL: `https://www.pexels.com/search/flowers/`
- Pros: Gratuito, alta calidad
- API: Sí, con key gratuita

### 4. PlantNet (Datos Botánicos)

- URL: `https://identify.plantnet.org/`
- Pros: Datos científicos
- Cons: Requiere API key

## 📄 requirements.txt

```txt
beautifulsoup4==4.12.3
requests==2.31.0
playwright==1.42.0
pillow==10.2.0
lxml==5.1.0
pexels-api==1.0.0
unsplash-api==1.0.0
python-dotenv==1.0.1
```

## 🐍 Script Principal: scraper.py

```python
#!/usr/bin/env python3
"""
Flower Scraper - Sistema de scraping para flores
Obtiene nombres, imágenes y datos de múltiples fuentes
"""

import json
import requests
from bs4 import BeautifulSoup
from pathlib import Path
from typing import List, Dict
import time
import re

class FlowerScraper:
    def __init__(self, output_dir: str = "output"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.images_dir = self.output_dir / "images"
        self.images_dir.mkdir(exist_ok=True)

        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    def scrape_wikipedia_flowers(self) -> List[Dict]:
        """
        Scrape flores desde Wikipedia en español
        """
        print("🔍 Scrapeando Wikipedia...")

        base_url = "https://es.wikipedia.org"
        category_url = f"{base_url}/wiki/Categoría:Flores"

        flowers = []

        try:
            response = requests.get(category_url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')

            # Encontrar todos los enlaces de flores
            flower_links = soup.select('#mw-pages .mw-category-group li a')

            for link in flower_links[:100]:  # Limitar a 100
                flower_name = link.text
                flower_url = base_url + link['href']

                print(f"  📝 {flower_name}")

                # Obtener detalles de la flor
                details = self._get_flower_details(flower_url)

                flowers.append({
                    'nombre': flower_name,
                    'wiki_url': flower_url,
                    **details
                })

                time.sleep(0.5)  # Rate limiting

        except Exception as e:
            print(f"❌ Error: {e}")

        return flowers

    def _get_flower_details(self, url: str) -> Dict:
        """
        Obtiene detalles de una página específica de flor
        """
        try:
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')

            # Extraer primer párrafo como descripción
            first_p = soup.select_one('#mw-content-text p')
            descripcion = first_p.text.strip() if first_p else ""

            # Extraer imagen si existe
            infobox_img = soup.select_one('.infobox img')
            imagen_url = None
            if infobox_img and infobox_img.get('src'):
                imagen_url = 'https:' + infobox_img['src']

            return {
                'descripcion': descripcion[:200],  # Limitar longitud
                'imagen_wiki_url': imagen_url
            }

        except Exception as e:
            print(f"    ⚠️  Error obteniendo detalles: {e}")
            return {}

    def download_images(self, flowers: List[Dict]):
        """
        Descarga imágenes de las flores
        """
        print(f"\n📥 Descargando imágenes...")

        for i, flower in enumerate(flowers):
            if flower.get('imagen_wiki_url'):
                try:
                    img_url = flower['imagen_wiki_url']
                    # Reemplazar thumbnail por versión completa
                    img_url = re.sub(r'/thumb/', '/', img_url)
                    img_url = re.sub(r'/\d+px-.*$', '', img_url)

                    response = requests.get(img_url, headers=self.headers)

                    if response.status_code == 200:
                        filename = f"flower_{i+1:03d}.jpg"
                        filepath = self.images_dir / filename

                        with open(filepath, 'wb') as f:
                            f.write(response.content)

                        flower['imagen_local'] = str(filepath)
                        print(f"  ✅ {flower['nombre']}: {filename}")

                    time.sleep(0.3)

                except Exception as e:
                    print(f"  ❌ Error descargando {flower['nombre']}: {e}")

    def export_to_typescript(self, flowers: List[Dict], output_file: str = "flowers.ts"):
        """
        Exporta flores en formato TypeScript
        """
        filepath = self.output_dir / output_file

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("export interface Flower {\n")
            f.write("  id: number;\n")
            f.write("  nombre: string;\n")
            f.write("  imagen: string;\n")
            f.write("  mensaje: string;\n")
            f.write("  significado: string;\n")
            f.write("}\n\n")
            f.write("export const flowers: Flower[] = [\n")

            for i, flower in enumerate(flowers):
                # Generar mensaje genérico
                mensaje = f"Hermosa y única, como tú"
                significado = "Belleza y amor"

                f.write("  {\n")
                f.write(f"    id: {i + 1},\n")
                f.write(f"    nombre: \"{flower['nombre']}\",\n")
                f.write(f"    imagen: \"🌸\",  // Reemplazar con imagen local\n")
                f.write(f"    mensaje: \"{mensaje}\",\n")
                f.write(f"    significado: \"{significado}\"\n")
                f.write("  },\n")

            f.write("];\n")

        print(f"\n✅ TypeScript exportado: {filepath}")

    def export_to_json(self, flowers: List[Dict], output_file: str = "flowers.json"):
        """
        Exporta flores en formato JSON
        """
        filepath = self.output_dir / output_file

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(flowers, f, ensure_ascii=False, indent=2)

        print(f"✅ JSON exportado: {filepath}")

def main():
    print("🌸 Flower Scraper para Alejardín\n")

    scraper = FlowerScraper()

    # 1. Scrapear datos
    flowers = scraper.scrape_wikipedia_flowers()
    print(f"\n✨ Total flores encontradas: {len(flowers)}")

    # 2. Descargar imágenes
    scraper.download_images(flowers)

    # 3. Exportar datos
    scraper.export_to_json(flowers)
    scraper.export_to_typescript(flowers)

    print("\n🎉 ¡Scraping completado!")
    print(f"📁 Archivos en: {scraper.output_dir}")

if __name__ == "__main__":
    main()
```

## 🔑 Usando APIs (Mejor opción)

### Pexels API

```python
import os
from pexels_api import API

# Obtener API key gratis en pexels.com/api
PEXELS_API_KEY = os.getenv('PEXELS_API_KEY')
api = API(PEXELS_API_KEY)

def buscar_flores_pexels(cantidad=365):
    flores = []
    page = 1

    while len(flores) < cantidad:
        api.search('flowers', page=page, results_per_page=80)
        photos = api.get_entries()

        for photo in photos:
            flores.append({
                'url': photo.original,
                'photographer': photo.photographer,
                'alt': photo.alt
            })

        page += 1

    return flores[:cantidad]
```

## 🎨 Procesamiento de Imágenes

```python
from PIL import Image

def procesar_imagen(input_path, output_path, size=(800, 800)):
    """
    Redimensiona y optimiza imagen
    """
    img = Image.open(input_path)
    img = img.convert('RGB')
    img.thumbnail(size, Image.Resampling.LANCZOS)
    img.save(output_path, 'JPEG', quality=85, optimize=True)
```

## ⚡ Ejecución Rápida

```bash
# Método 1: Wikipedia
python scraper.py

# Método 2: Pexels (requiere API key)
export PEXELS_API_KEY="tu-api-key"
python scraper.py --source pexels

# Método 3: Mixto
python scraper.py --mixed
```

## 📊 Resultado Esperado

```
output/
├── images/
│   ├── flower_001.jpg
│   ├── flower_002.jpg
│   └── ... (365 imágenes)
├── flowers.json        # Datos raw
└── flowers.ts          # Formato para importar
```

## ⚠️ Consideraciones Legales

1. **Wikipedia**: Imágenes bajo licencias variables (verificar)
2. **Pexels/Unsplash**: Uso libre, dar crédito opcional
3. **Scraping**: Respetar robots.txt y rate limits
4. **Uso comercial**: Verificar licencias individualmente

## 🚀 Integración con Alejardín

1. Ejecutar scraper
2. Copiar imágenes a `/public/flowers/`
3. Actualizar `data/flowers.ts` con rutas:

```typescript
imagen: "/flowers/flower_001.jpg";
```

## 💡 Mejoras Futuras

- [ ] Scraping paralelo para velocidad
- [ ] Validación de calidad de imágenes
- [ ] Generación automática de mensajes con IA
- [ ] Cache de resultados
- [ ] Interfaz web para revisión manual
