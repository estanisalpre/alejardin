#!/usr/bin/env python3
"""
Validador y estadísticas para Alejardín
Analiza el archivo flowers.ts y genera reportes
"""

import re
import json
from pathlib import Path
from collections import Counter
from typing import List, Dict


def extraer_flores_del_archivo(archivo_path: Path) -> List[Dict]:
    """
    Extrae todas las flores del archivo flowers.ts
    """
    with open(archivo_path, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Patrón para encontrar objetos de flores
    pattern = r'\{[^}]*id:\s*(\d+)[^}]*nombre:\s*"([^"]+)"[^}]*imagen:\s*"([^"]+)"[^}]*mensaje:\s*"([^"]+)"[^}]*significado:\s*"([^"]+)"[^}]*\}'
    
    matches = re.findall(pattern, contenido, re.DOTALL)
    
    flores = []
    for match in matches:
        flores.append({
            'id': int(match[0]),
            'nombre': match[1],
            'imagen': match[2],
            'mensaje': match[3],
            'significado': match[4]
        })
    
    return flores


def validar_flores(flores: List[Dict]):
    """
    Valida las flores y muestra posibles problemas
    """
    print("\n🔍 Validación de Flores")
    print("=" * 60)
    
    # Validar IDs
    ids = [f['id'] for f in flores]
    ids_duplicadas = [id for id in ids if ids.count(id) > 1]
    
    if ids_duplicadas:
        print(f"❌ IDs duplicadas: {set(ids_duplicadas)}")
    else:
        print(f"✅ Todas las IDs son únicas ({len(ids)} flores)")
    
    # Validar rango
    if ids:
        print(f"✅ Rango de IDs: {min(ids)} - {max(ids)}")
        
        # IDs faltantes
        ids_esperadas = set(range(1, max(ids) + 1))
        ids_faltantes = ids_esperadas - set(ids)
        
        if ids_faltantes:
            print(f"⚠️  IDs faltantes ({len(ids_faltantes)}): {sorted(list(ids_faltantes))[:10]}...")
        else:
            print(f"✅ Secuencia completa de IDs")
    
    # Validar nombres únicos
    nombres = [f['nombre'] for f in flores]
    nombres_duplicados = [n for n in nombres if nombres.count(n) > 1]
    
    if nombres_duplicados:
        print(f"⚠️  Nombres duplicados ({len(set(nombres_duplicados))}): {list(set(nombres_duplicados))[:5]}...")
    else:
        print(f"✅ Todos los nombres son únicos")
    
    # Validar que no haya campos vacíos
    flores_incompletas = []
    for flor in flores:
        if not all([flor['nombre'], flor['imagen'], flor['mensaje'], flor['significado']]):
            flores_incompletas.append(flor['id'])
    
    if flores_incompletas:
        print(f"❌ Flores con campos vacíos: {flores_incompletas}")
    else:
        print(f"✅ Todas las flores tienen campos completos")


def estadisticas_flores(flores: List[Dict]):
    """
    Genera estadísticas sobre las flores
    """
    print("\n📊 Estadísticas")
    print("=" * 60)
    
    # Total
    print(f"🌸 Total de flores: {len(flores)}")
    
    # Progreso a 365
    porcentaje = (len(flores) / 365) * 100
    barra = "█" * int(porcentaje / 2) + "░" * (50 - int(porcentaje / 2))
    print(f"📈 Progreso: [{barra}] {porcentaje:.1f}%")
    print(f"📉 Flores faltantes: {365 - len(flores)}")
    
    # Emojis más usados
    print(f"\n🎨 Emojis más usados:")
    emojis = [f['imagen'] for f in flores]
    emoji_counter = Counter(emojis)
    for emoji, count in emoji_counter.most_common(10):
        print(f"   {emoji} : {count} veces")
    
    # Longitud de mensajes
    longitudes = [len(f['mensaje']) for f in flores]
    print(f"\n📝 Mensajes:")
    print(f"   Promedio: {sum(longitudes) / len(longitudes):.0f} caracteres")
    print(f"   Más corto: {min(longitudes)} caracteres")
    print(f"   Más largo: {max(longitudes)} caracteres")
    
    # Significados más comunes
    print(f"\n💫 Significados más comunes:")
    significados = [f['significado'] for f in flores]
    sig_counter = Counter(significados)
    for sig, count in sig_counter.most_common(10):
        print(f"   {sig}: {count} veces")


def buscar_flores(flores: List[Dict], query: str):
    """
    Busca flores por nombre
    """
    query_lower = query.lower()
    resultados = [f for f in flores if query_lower in f['nombre'].lower()]
    
    print(f"\n🔎 Resultados para '{query}':")
    print("=" * 60)
    
    if not resultados:
        print("❌ No se encontraron flores")
        return
    
    for flor in resultados[:10]:
        print(f"\n{flor['imagen']} {flor['nombre']} (ID: {flor['id']})")
        print(f"   Mensaje: {flor['mensaje'][:60]}...")
        print(f"   Significado: {flor['significado']}")


def exportar_catalogo(flores: List[Dict], archivo: str = "catalogo_flores.md"):
    """
    Exporta un catálogo en Markdown de todas las flores
    """
    output_path = Path(__file__).parent / archivo
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("# 🌸 Catálogo de Flores - Alejardín\n\n")
        f.write(f"**Total de flores:** {len(flores)}\n\n")
        f.write("---\n\n")
        
        for flor in sorted(flores, key=lambda x: x['id']):
            f.write(f"## {flor['id']}. {flor['imagen']} {flor['nombre']}\n\n")
            f.write(f"**Mensaje:** {flor['mensaje']}\n\n")
            f.write(f"**Significado:** {flor['significado']}\n\n")
            f.write("---\n\n")
    
    print(f"\n✅ Catálogo exportado a: {output_path}")


def main():
    print("🌸 Validador y Estadísticas - Alejardín\n")
    
    # Ruta al archivo flowers.ts
    proyecto_dir = Path(__file__).parent.parent
    archivo_flowers = proyecto_dir / "data" / "flowers.ts"
    
    if not archivo_flowers.exists():
        print(f"❌ Error: {archivo_flowers} no existe")
        return
    
    # Extraer flores
    print("📖 Leyendo flores del archivo...")
    flores = extraer_flores_del_archivo(archivo_flowers)
    
    if not flores:
        print("❌ No se encontraron flores en el archivo")
        return
    
    # Menú
    while True:
        print("\n" + "=" * 60)
        print("Opciones:")
        print("1. Validar flores")
        print("2. Ver estadísticas")
        print("3. Buscar flores por nombre")
        print("4. Exportar catálogo en Markdown")
        print("5. Todo (validar + estadísticas)")
        print("6. Salir")
        
        opcion = input("\nElige una opción (1-6) [5]: ").strip() or "5"
        
        if opcion == "1":
            validar_flores(flores)
        elif opcion == "2":
            estadisticas_flores(flores)
        elif opcion == "3":
            query = input("Buscar flores (nombre): ")
            buscar_flores(flores, query)
        elif opcion == "4":
            exportar_catalogo(flores)
        elif opcion == "5":
            validar_flores(flores)
            estadisticas_flores(flores)
        elif opcion == "6":
            print("\n👋 ¡Hasta luego!")
            break
        else:
            print("❌ Opción inválida")


if __name__ == "__main__":
    main()
