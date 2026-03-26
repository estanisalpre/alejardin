# Imágenes de Flores

Esta carpeta contiene las imágenes de alta calidad de las 365 flores del proyecto Alejardín.

## 📥 Cómo descargar las imágenes

```bash
cd scripts
pip install -r requirements.txt
python download_flower_images.py
```

## 📁 Estructura

- Cada imagen se nombra: `[ID]-[nombre-flor].jpg`
- Ejemplo: `001-rosa.jpg`, `002-tulipan.jpg`
- Formato: JPEG optimizado
- Resolución: Medium (640px)
- Orientación: Portrait (vertical)

## 📊 Estadísticas

- Total de imágenes: 365
- Fuente: Pexels API
- Licencia: Uso libre (Pexels License)
- Calidad: Alta (optimizada para web)

## 🔄 Actualización

Si necesitas re-descargar alguna imagen:

1. Elimina el archivo específico
2. Vuelve a ejecutar el script
3. Solo descargará las faltantes

## 📝 Créditos

Todas las imágenes provienen de [Pexels](https://www.pexels.com/) y son de uso libre.
Los fotógrafos individuales se reconocen en el `download_report.json`.
