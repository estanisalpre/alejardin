#!/usr/bin/env python3
"""
Generador de flores para Alejardín
Genera 365 flores únicas con nombres, emojis, mensajes y significados
"""

import json
import random
from typing import List, Dict
from pathlib import Path


# Lista completa de flores (más de 100 especies reales)
FLORES = [
    # Flores comunes
    "Lirio", "Orquídea", "Jazmín", "Gardenia", "Peonía", "Camelia",
    "Hortensia", "Dalia", "Amapola", "Violeta", "Azalea", "Clavel",
    "Magnolia", "Iris", "Lilas", "Fresia", "Azucena", "Crisantemo",
    "Narciso", "Nomeolvides", "Gladiolo", "Geranio", "Anémona", "Begonia",
    "Campanilla", "Capuchina", "Zinnia", "Acacia", "Aster", "Ranúnculo",
    "Estatice", "Glicinia", "Jacinto", "Pensamiento", "Petunia", "Verbena",
    "Primavera", "Salvia", "Mimosa", "Malva", "Malvarrosa", "Protea",
    "Estrelitzia", "Anturio", "Bromelia", "Heliconia", "Pasionaria",
    "Frangipani", "Buganvilla", "Canna", "Trébol", "Botón de oro",
    
    # Flores silvestres
    "Diente de león", "Margarita silvestre", "Campanula", "Hierba de San Juan",
    "Dedalera", "Valeriana", "Milenrama", "Equinácea", "Caléndula",
    
    # Flores de jardín
    "Alegría", "Impatiens", "Pensamiento", "Boca de dragón", "Lupino",
    "Alhelí", "Espuela de caballero", "Amapola de California", "Cosmos",
    
    # Flores exóticas
    "Ave del paraíso", "Anthurium", "Ginger tropical", "Jengibre rojo",
    "Alpinia", "Hedychium", "Flor de cera", "Flor de jade",
    
    # Flores aromáticas
    "Bergamota", "Geranio perfumado", "Alyssum", "Nicotiana", "Matthiola",
    
    # Flores trepadoras
    "Madreselva", "Jazmín estrellado", "Clemátide", "Dipladenia", "Mandevilla",
    
    # Flores de bulbo
    "Azafrán", "Muscari", "Anémona coronaria", "Allium", "Ixia",
    "Sparaxis", "Oxalis", "Fritillaria", "Scilla",
    
    # Flores de rocalla
    "Alyssum saxátil", "Arabis", "Aubrieta", "Saxífraga", "Sedum",
    "Sempervivum", "Armeria", "Cerastium",
]

# Variaciones de colores
COLORES = [
    "roja", "blanca", "rosa", "amarilla", "morada", "azul", "naranja",
    "coral", "fucsia", "lila", "púrpura", "escarlata", "carmesí",
    "marfil", "crema", "salmón", "durazno", "lavanda", "violeta"
]

# Tipos de flores
TIPOS = [
    "silvestre", "de jardín", "tropical", "de montaña", "de campo",
    "de agua", "del desierto", "alpina", "mediterránea", "asiática",
    "perfumada", "doble", "miniatura", "gigante", "enredadera"
]

# Emojis de flores
EMOJIS = [
    "🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🏵️", "💐", "🪷",
    "💜", "💙", "💚", "💛", "🧡", "❤️", "🤍", "🩷", "🩵"
]

# Templates para mensajes románticos y emotivos
MENSAJES = [
    "Como esta {flor}, tu belleza y fuerza crecen cada día",
    "Cada pétalo de {flor} guarda un deseo de felicidad para ti",
    "Brilla como la {flor}, siempre buscando la luz",
    "Delicada y efímera, como esta {flor}, cada momento es precioso",
    "Simple y pura, la {flor} refleja los mejores momentos",
    "Exótica y vibrante, como esta {flor}, tu espíritu es único",
    "La {flor} te recuerda que resurges hermosa desde lo profundo",
    "Tu presencia, como la {flor}, trae calma y serenidad",
    "Rara y extraordinaria, la {flor} es como un tesoro único",
    "La dulzura de la {flor} perfuma cada rincón del corazón",
    "Abundante en belleza, como esta {flor}, eres prosperidad",
    "Elegante y majestuosa, la {flor} ilumina cada espacio",
    "La {flor} florece con gratitud en mi vida",
    "Como la {flor}, tu alegría es contagiosa y luminosa",
    "Fuerte y resiliente, la {flor} enfrenta cada desafío",
    "La {flor} danza al viento, libre y hermosa",
    "Dulce fragancia de {flor}, recuerdo de momentos felices",
    "La {flor} abre sus pétalos al amor incondicional",
    "Como esta {flor}, tu luz nunca se apaga",
    "La {flor} trae esperanza y nuevos comienzos",
    "Fresca y pura, la {flor} es un regalo de la naturaleza",
    "La belleza de la {flor} trasciende palabras",
    "Como la {flor}, cada día es una nueva oportunidad",
    "La {flor} susurra secretos de amor eterno",
    "Radiante y hermosa, la {flor} es un sueño hecho realidad",
    "La {flor} florece donde hay amor",
    "Suave y delicada, como la {flor} en la mañana",
    "La {flor} ilumina el jardín de mi corazón",
    "Como esta {flor}, tu presencia es un regalo",
    "La {flor} baila con gracia bajo el sol",
]

# Significados simbólicos variados
SIGNIFICADOS = [
    "Amor y pasión", "Amor perfecto", "Adoración y lealtad", "Belleza fugaz",
    "Inocencia y pureza", "Belleza delicada", "Renacimiento espiritual",
    "Devoción y tranquilidad", "Lujo y belleza exótica", "Amor dulce",
    "Romance y buena fortuna", "Pureza y renovación", "Agradecimiento sincero",
    "Admiración y perfección", "Dignidad y elegancia", "Imaginación y paz",
    "Modestia y fidelidad", "Amor secreto", "Cuidado y fragilidad",
    "Esperanza y nuevos comienzos", "Alegría y felicidad", "Fortaleza interior",
    "Sabiduría y conocimiento", "Gratitud y aprecio", "Nostalgia y recuerdos",
    "Amistad verdadera", "Respeto y honor", "Creatividad e inspiración",
    "Valentía y coraje", "Paz interior", "Prosperidad y abundancia",
    "Protección y seguridad", "Libertad y independencia", "Armonía y equilibrio",
    "Compasión y empatía", "Transformación personal", "Energía vital",
    "Ternura y dulzura", "Confianza y sinceridad", "Optimismo y esperanza",
]


def generar_flores(cantidad: int = 365, inicio_id: int = 51) -> List[Dict]:
    """
    Genera una lista de flores con todos los campos necesarios
    
    Args:
        cantidad: Número de flores a generar
        inicio_id: ID inicial (continuando desde las existentes)
    
    Returns:
        Lista de diccionarios con flores
    """
    flores_generadas = []
    nombres_usados = set()  # Para evitar duplicados exactos
    
    for i in range(cantidad):
        flower_id = inicio_id + i
        
        # Generar nombre único
        intentos = 0
        while intentos < 100:
            flor_base = random.choice(FLORES)
            
            # Decidir si agregar variación (50% de probabilidad)
            if random.random() < 0.5 and i > 10:
                if random.random() < 0.6:
                    nombre = f"{flor_base} {random.choice(COLORES)}"
                else:
                    nombre = f"{flor_base} {random.choice(TIPOS)}"
            else:
                nombre = flor_base
            
            # Verificar unicidad
            if nombre not in nombres_usados:
                nombres_usados.add(nombre)
                break
            intentos += 1
        
        # Emoji aleatorio
        emoji = random.choice(EMOJIS)
        
        # Mensaje personalizado
        template = random.choice(MENSAJES)
        mensaje = template.replace("{flor}", nombre.lower())
        
        # Significado
        significado = random.choice(SIGNIFICADOS)
        
        flor = {
            "id": flower_id,
            "nombre": nombre,
            "imagen": emoji,
            "mensaje": mensaje,
            "significado": significado
        }
        
        flores_generadas.append(flor)
    
    return flores_generadas


def exportar_typescript(flores: List[Dict], archivo: str = "flores_generadas.ts"):
    """
    Exporta las flores en formato TypeScript para agregar al proyecto
    """
    output_path = Path(__file__).parent / archivo
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// Flores generadas automáticamente\n")
        f.write("// ⚠️  INSTRUCCIONES:\n")
        f.write("// 1. Copia estos objetos\n")
        f.write("// 2. Pégalos al final del array en data/flowers.ts\n")
        f.write("// 3. Asegúrate de mantener la coma del último elemento anterior\n\n")
        
        for i, flor in enumerate(flores):
            f.write("  {\n")
            f.write(f'    id: {flor["id"]},\n')
            f.write(f'    nombre: "{flor["nombre"]}",\n')
            f.write(f'    imagen: "{flor["imagen"]}",\n')
            f.write(f'    mensaje: "{flor["mensaje"]}",\n')
            f.write(f'    significado: "{flor["significado"]}",\n')
            f.write("  },\n")
            
            # Espaciado cada 10 flores para legibilidad
            if (i + 1) % 10 == 0:
                f.write("\n")
    
    print(f"✅ {len(flores)} flores exportadas a {output_path}")
    return output_path


def exportar_json(flores: List[Dict], archivo: str = "flores_generadas.json"):
    """
    Exporta las flores en formato JSON
    """
    output_path = Path(__file__).parent / archivo
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(flores, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {len(flores)} flores exportadas a {output_path}")
    return output_path


def main():
    print("🌸 Generador de Flores para Alejardín\n")
    
    # Opciones configurables
    print("Opciones:")
    print("1. Generar 315 flores (para completar 365 desde las 50 existentes)")
    print("2. Generar todas las 365 flores (reemplazar archivo completo)")
    print("3. Generar cantidad personalizada")
    
    opcion = input("\nElige una opción (1/2/3) [1]: ").strip() or "1"
    
    if opcion == "1":
        cantidad = 315
        inicio_id = 51
    elif opcion == "2":
        cantidad = 365
        inicio_id = 1
    else:
        cantidad = int(input("¿Cuántas flores generar? "))
        inicio_id = int(input("¿ID inicial? "))
    
    print(f"\n🌺 Generando {cantidad} flores desde ID {inicio_id}...\n")
    
    # Generar flores
    flores = generar_flores(cantidad=cantidad, inicio_id=inicio_id)
    
    # Exportar en ambos formatos
    ts_path = exportar_typescript(flores)
    json_path = exportar_json(flores)
    
    print(f"\n✨ Total de flores generadas: {len(flores)}")
    print(f"\n📝 SIGUIENTE PASO:")
    print(f"   Abre {ts_path.name} y copia el contenido")
    print(f"   a data/flowers.ts")


if __name__ == "__main__":
    main()
