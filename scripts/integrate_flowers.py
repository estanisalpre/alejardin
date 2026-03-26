#!/usr/bin/env python3
"""
Integrador de flores para Alejardín
Integra automáticamente las flores generadas al archivo flowers.ts
"""

import re
from pathlib import Path
from typing import List


def leer_flores_existentes(archivo_flowers: Path) -> tuple[str, int]:
    """
    Lee el archivo flowers.ts y retorna el contenido y la última ID
    
    Returns:
        Tupla de (contenido_completo, última_id_encontrada)
    """
    with open(archivo_flowers, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Buscar todas las IDs
    ids = re.findall(r'id:\s*(\d+)', contenido)
    ultima_id = max([int(id) for id in ids]) if ids else 0
    
    return contenido, ultima_id


def integrar_flores(archivo_generado: Path, archivo_destino: Path, hacer_backup: bool = True):
    """
    Integra las flores generadas al archivo flowers.ts
    
    Args:
        archivo_generado: Ruta a flores_generadas.ts
        archivo_destino: Ruta a data/flowers.ts
        hacer_backup: Si True, crea un backup del archivo original
    """
    
    # Leer archivo existente
    print(f"📖 Leyendo {archivo_destino}...")
    contenido_original, ultima_id = leer_flores_existentes(archivo_destino)
    print(f"   Última ID encontrada: {ultima_id}")
    
    # Crear backup si se solicita
    if hacer_backup:
        backup_path = archivo_destino.with_suffix('.ts.backup')
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(contenido_original)
        print(f"💾 Backup creado: {backup_path}")
    
    # Leer flores generadas
    print(f"\n📖 Leyendo {archivo_generado}...")
    with open(archivo_generado, 'r', encoding='utf-8') as f:
        contenido_generado = f.read()
    
    # Extraer solo las flores (skip comentarios)
    lineas_flores = []
    capturando = False
    for linea in contenido_generado.split('\n'):
        if linea.strip().startswith('{'):
            capturando = True
        if capturando:
            lineas_flores.append(linea)
        if linea.strip() == '},':
            capturando = False
    
    flores_nuevas = '\n'.join(lineas_flores)
    
    # Encontrar el punto de inserción (antes del cierre del array)
    # Buscar el último ]; en el archivo
    match = re.search(r'(\s*}\s*,?\s*)\];', contenido_original)
    
    if not match:
        print("❌ Error: No se encontró el cierre del array en flowers.ts")
        return False
    
    # Insertar las nuevas flores
    posicion_insercion = match.start(1) + len(match.group(1))
    
    nuevo_contenido = (
        contenido_original[:posicion_insercion] + 
        '\n' + flores_nuevas + '\n' +
        contenido_original[posicion_insercion:]
    )
    
    # Escribir el archivo actualizado
    with open(archivo_destino, 'w', encoding='utf-8') as f:
        f.write(nuevo_contenido)
    
    # Contar flores en el nuevo archivo
    ids_nuevos = re.findall(r'id:\s*(\d+)', nuevo_contenido)
    total_flores = len(ids_nuevos)
    
    print(f"\n✅ Integración completada!")
    print(f"   Total de flores en {archivo_destino}: {total_flores}")
    print(f"   Flores agregadas: {total_flores - (ultima_id)}")
    
    return True


def validar_flores(archivo_flowers: Path):
    """
    Valida que el archivo flowers.ts tenga la estructura correcta
    """
    print(f"\n🔍 Validando {archivo_flowers}...")
    
    with open(archivo_flowers, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Encontrar todas las IDs
    ids = [int(id) for id in re.findall(r'id:\s*(\d+)', contenido)]
    
    # Verificar IDs únicas
    ids_duplicadas = [id for id in ids if ids.count(id) > 1]
    if ids_duplicadas:
        print(f"   ⚠️  IDs duplicadas encontradas: {set(ids_duplicadas)}")
    else:
        print(f"   ✅ Todas las IDs son únicas")
    
    # Verificar rango de IDs
    if ids:
        print(f"   📊 IDs: {min(ids)} a {max(ids)}")
        print(f"   📊 Total de flores: {len(ids)}")
        
        # Verificar IDs faltantes
        ids_esperadas = set(range(1, max(ids) + 1))
        ids_encontradas = set(ids)
        ids_faltantes = ids_esperadas - ids_encontradas
        
        if ids_faltantes:
            print(f"   ⚠️  IDs faltantes: {sorted(ids_faltantes)[:20]}...")
        else:
            print(f"   ✅ Secuencia de IDs completa")
    
    # Verificar campos requeridos
    flores_pattern = re.findall(r'\{[^}]+\}', contenido, re.DOTALL)
    campos_requeridos = ['id:', 'nombre:', 'imagen:', 'mensaje:', 'significado:']
    
    flores_incompletas = 0
    for flor in flores_pattern:
        if all(campo in flor for campo in campos_requeridos):
            continue
        flores_incompletas += 1
    
    if flores_incompletas:
        print(f"   ⚠️  {flores_incompletas} flores con campos faltantes")
    else:
        print(f"   ✅ Todas las flores tienen campos completos")
    
    print(f"\n✨ Validación completada")


def main():
    print("🌸 Integrador de Flores para Alejardín\n")
    
    # Rutas
    script_dir = Path(__file__).parent
    proyecto_dir = script_dir.parent
    
    archivo_generado = script_dir / "flores_generadas.ts"
    archivo_destino = proyecto_dir / "data" / "flowers.ts"
    
    # Verificar que existen los archivos
    if not archivo_generado.exists():
        print(f"❌ Error: {archivo_generado} no existe")
        print(f"   Ejecuta primero: python generate_flowers.py")
        return
    
    if not archivo_destino.exists():
        print(f"❌ Error: {archivo_destino} no existe")
        return
    
    # Menú
    print("Opciones:")
    print("1. Integrar flores generadas automáticamente (con backup)")
    print("2. Integrar flores generadas (sin backup)")
    print("3. Solo validar flowers.ts actual")
    
    opcion = input("\nElige una opción (1/2/3) [1]: ").strip() or "1"
    
    if opcion == "3":
        validar_flores(archivo_destino)
    elif opcion in ["1", "2"]:
        hacer_backup = (opcion == "1")
        exito = integrar_flores(archivo_generado, archivo_destino, hacer_backup)
        
        if exito:
            validar_flores(archivo_destino)
            
            print("\n📝 SIGUIENTE PASO:")
            print("   1. Revisa data/flowers.ts")
            print("   2. Ejecuta: npm run dev")
            print("   3. Prueba abrir flores en http://localhost:3000")
    else:
        print("❌ Opción inválida")


if __name__ == "__main__":
    main()
