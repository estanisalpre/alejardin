#!/usr/bin/env python3
"""
Script de Rescate - Descargar Flores Faltantes
Reintenta descargar las 44 flores que fallaron con búsquedas alternativas
"""

import os
import json
import time
import requests
from pathlib import Path
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

# Cargar variables de entorno
load_dotenv('../.env.local')
PEXELS_API_KEY = os.getenv('PEXELS_API_KEY')

if not PEXELS_API_KEY:
    print("❌ Error: No se encontró PEXELS_API_KEY en .env.local")
    exit(1)

# Headers para Pexels
HEADERS = {
    'Authorization': PEXELS_API_KEY
}

# Directorio de salida
ASSETS_DIR = Path('../src/assets/flowers')
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

# Mapeo de nombres base (sin colores/modificadores) a términos de búsqueda
NOMBRE_BASE = {
    'Anthurium': 'anthurium',
    'Anturio': 'anthurium',
    'Alegría': 'impatiens',
    'Gardenia': 'gardenia',
    'Ginger': 'ginger flower',
    'Salvia': 'salvia',
    'Alpinia': 'alpinia ginger',
    'Flor de cera': 'hoya flower',
    'Aubrieta': 'aubrieta',
    'Violeta': 'violet',
    'Protea': 'protea',
    'Heliconia': 'heliconia',
    'Alyssum': 'alyssum',
    'Nomeolvides': 'forget me not',
    'Muscari': 'muscari grape hyacinth',
    'Bergamota': 'bergamot bee balm',
    'Milenrama': 'yarrow',
    'Azafrán': 'crocus',
    'Equinácea': 'echinacea',
    'Geranio': 'geranium',
    'Orquídea': 'orchid',
    'Lirio': 'lily',
    'Amapola': 'poppy',
    'Canna': 'canna lily',
    'Margarita': 'daisy',
    'Hortensia': 'hydrangea',
    'Boca de dragón': 'snapdragon',
    'Allium': 'allium',
    'Primavera': 'primrose',
    'Buganvilla': 'bougainvillea',
    'Begonia': 'begonia',
    'Fresia': 'freesia',
    'Lilas': 'lilac',
}

def extraer_nombre_base(nombre_completo):
    """Extrae el nombre base de la flor sin colores ni modificadores"""
    # Remover colores y modificadores comunes
    modificadores = [
        'amarilla', 'amarillo', 'rosa', 'roja', 'rojo', 'azul', 
        'morada', 'morado', 'blanca', 'blanco', 'naranja', 'fucsia',
        'tropical', 'silvestre', 'de jardín', 'de montaña', 'del desierto',
        'perfumada', 'perfumado', 'enredadera', 'miniatura', 'gigante',
        'carmesí', 'escarlata', 'lavanda'
    ]
    
    nombre_limpio = nombre_completo.lower()
    for mod in modificadores:
        nombre_limpio = nombre_limpio.replace(mod, '').strip()
    
    return nombre_limpio.strip()

def buscar_termino_ingles(nombre_base):
    """Busca el término en inglés en el diccionario"""
    for key, value in NOMBRE_BASE.items():
        if key.lower() in nombre_base.lower():
            return value
    return None

def buscar_imagen_pexels(query, orientation='portrait', size='medium'):
    """Busca una imagen en Pexels con los parámetros dados"""
    url = 'https://api.pexels.com/v1/search'
    params = {
        'query': query,
        'per_page': 1,
        'orientation': orientation,
        'size': size,
        'locale': 'es-ES'
    }
    
    try:
        response = requests.get(url, headers=HEADERS, params=params, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('photos') and len(data['photos']) > 0:
                return data['photos'][0]
        return None
    except Exception as e:
        print(f"      Error en búsqueda: {e}")
        return None

def descargar_y_optimizar(image_url, output_path):
    """Descarga y optimiza una imagen"""
    try:
        response = requests.get(image_url, timeout=15)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            
            # Convertir a RGB si es necesario
            if img.mode in ('RGBA', 'P', 'LA'):
                img = img.convert('RGB')
            
            # Redimensionar si es muy grande (max 800px en el lado más grande)
            max_size = 800
            if max(img.size) > max_size:
                ratio = max_size / max(img.size)
                new_size = tuple(int(dim * ratio) for dim in img.size)
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Guardar optimizado
            img.save(output_path, 'JPEG', quality=85, optimize=True)
            return True
    except Exception as e:
        print(f"      Error al descargar/optimizar: {e}")
        return False
    return False

def retry_failed_flower(flower_id, flower_name):
    """Reintenta descargar una flor con múltiples estrategias"""
    # Generar nombre de archivo
    nombre_archivo = flower_name.lower()
    nombre_archivo = nombre_archivo.replace(' ', '-').replace('á', 'a').replace('é', 'e')
    nombre_archivo = nombre_archivo.replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
    nombre_archivo = nombre_archivo.replace('ñ', 'n')
    filename = f"{flower_id:03d}-{nombre_archivo}.jpg"
    output_path = ASSETS_DIR / filename
    
    print(f"\n🔄 Flor #{flower_id}: {flower_name}")
    
    # Estrategia 1: Nombre base sin modificadores (español)
    nombre_base = extraer_nombre_base(flower_name)
    print(f"   1️⃣ Buscando: '{nombre_base}' (español)")
    photo = buscar_imagen_pexels(nombre_base, orientation='portrait')
    
    if photo:
        print(f"      ✅ Encontrada!")
        if descargar_y_optimizar(photo['src']['large'], output_path):
            return {
                'id': flower_id,
                'name': flower_name,
                'filename': filename,
                'status': 'downloaded',
                'strategy': 'nombre_base_es',
                'query': nombre_base,
                'photographer': photo['photographer'],
                'url': photo['url']
            }
    
    # Estrategia 2: Término en inglés del diccionario
    termino_ingles = buscar_termino_ingles(nombre_base)
    if termino_ingles:
        print(f"   2️⃣ Buscando: '{termino_ingles}' (inglés)")
        photo = buscar_imagen_pexels(termino_ingles, orientation='portrait')
        
        if photo:
            print(f"      ✅ Encontrada!")
            if descargar_y_optimizar(photo['src']['large'], output_path):
                return {
                    'id': flower_id,
                    'name': flower_name,
                    'filename': filename,
                    'status': 'downloaded',
                    'strategy': 'diccionario_en',
                    'query': termino_ingles,
                    'photographer': photo['photographer'],
                    'url': photo['url']
                }
    
    # Estrategia 3: Solo "flower" genérico con color si tiene
    palabras = flower_name.lower().split()
    colores = ['amarilla', 'rosa', 'roja', 'azul', 'morada', 'blanca', 'naranja', 'fucsia']
    color = next((c for c in colores if c in palabras), None)
    
    if color:
        color_en = {
            'amarilla': 'yellow', 'rosa': 'pink', 'roja': 'red',
            'azul': 'blue', 'morada': 'purple', 'blanca': 'white',
            'naranja': 'orange', 'fucsia': 'fuchsia'
        }.get(color, '')
        
        query_generica = f"{color_en} flower"
        print(f"   3️⃣ Buscando: '{query_generica}' (genérico)")
        photo = buscar_imagen_pexels(query_generica, orientation='portrait')
        
        if photo:
            print(f"      ✅ Encontrada!")
            if descargar_y_optimizar(photo['src']['large'], output_path):
                return {
                    'id': flower_id,
                    'name': flower_name,
                    'filename': filename,
                    'status': 'downloaded',
                    'strategy': 'generic_color',
                    'query': query_generica,
                    'photographer': photo['photographer'],
                    'url': photo['url']
                }
    
    # Estrategia 4: Cualquier flor bonita
    print(f"   4️⃣ Buscando: 'beautiful flower' (último recurso)")
    photo = buscar_imagen_pexels('beautiful flower', orientation='portrait')
    
    if photo:
        print(f"      ✅ Encontrada!")
        if descargar_y_optimizar(photo['src']['large'], output_path):
            return {
                'id': flower_id,
                'name': flower_name,
                'filename': filename,
                'status': 'downloaded',
                'strategy': 'generic_fallback',
                'query': 'beautiful flower',
                'photographer': photo['photographer'],
                'url': photo['url']
            }
    
    print(f"      ❌ No se pudo descargar")
    return {
        'id': flower_id,
        'name': flower_name,
        'reason': 'All strategies failed'
    }

def main():
    print("🌸 RESCATE DE FLORES FALTANTES - Alejardín")
    print("=" * 50)
    
    # Cargar reporte de descarga anterior
    report_path = Path('download_report.json')
    if not report_path.exists():
        print("❌ No se encontró download_report.json")
        return
    
    with open(report_path, 'r', encoding='utf-8') as f:
        original_report = json.load(f)
    
    failed_flowers = original_report['failed']
    print(f"\n📋 Flores a reintentar: {len(failed_flowers)}")
    
    rescued = []
    still_failed = []
    
    for idx, flower in enumerate(failed_flowers, 1):
        print(f"\n[{idx}/{len(failed_flowers)}]", end=' ')
        
        result = retry_failed_flower(flower['id'], flower['name'])
        
        if 'status' in result and result['status'] == 'downloaded':
            rescued.append(result)
        else:
            still_failed.append(result)
        
        # Esperar entre requests (rate limit)
        if idx < len(failed_flowers):
            time.sleep(0.6)
    
    # Guardar reporte de rescate
    rescue_report = {
        'total_attempted': len(failed_flowers),
        'rescued': len(rescued),
        'still_failed': len(still_failed),
        'rescued_flowers': rescued,
        'still_failed_flowers': still_failed
    }
    
    with open('rescue_report.json', 'w', encoding='utf-8') as f:
        json.dump(rescue_report, f, indent=2, ensure_ascii=False)
    
    # Resumen final
    print("\n" + "=" * 50)
    print("🎉 RESCATE COMPLETADO")
    print(f"✅ Rescatadas: {len(rescued)}/{len(failed_flowers)}")
    print(f"❌ Aún sin imagen: {len(still_failed)}/{len(failed_flowers)}")
    print(f"\n📄 Reporte guardado: rescue_report.json")
    
    if len(rescued) > 0:
        print(f"\n📝 Siguiente paso:")
        print(f"   python update_flower_images.py")

if __name__ == "__main__":
    main()
