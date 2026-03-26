# 🐍 Generador de Flores con Python

Este script genera las 365 flores restantes para Alejardín de forma automática.

## 📦 Instalación

```bash
pip install openai anthropic
```

## 🚀 Script: generate_flowers.py

```python
#!/usr/bin/env python3
"""
Generador de flores para Alejardín
Genera 365 flores únicas con nombres, emojis, mensajes y significados
"""

import json
import random
from typing import List, Dict

# Lista de flores base (agrega más si quieres)
FLORES = [
    "Lirio", "Orquídea", "Jazmín", "Gardenia", "Peonía", "Camelia",
    "Hortensia", "Dalia", "Amapola", "Violeta", "Azalea", "Clavel",
    "Magnolia", "Iris", "Lilas", "Fresia", "Azucena", "Crisantemo",
    "Narciso", "Nomeolvides", "Gladiolo", "Geranio", "Anémona", "Begonia",
    "Campanilla", "Capuchina", "Zinnia", "Acacia", "Aster", "Ranúnculo",
    "Estatice", "Glicinia", "Jacinto", "Pensamiento", "Petunia", "Verbena",
    "Primavera", "Salvia", "Mimosa", "Malva", "Malvarrosa", "Protea",
    "Estrelitzia", "Anturio", "Bromelia", "Heliconia", "Pasionaria",
    "Frangipani", "Buganvilla", "Canna", "Trébol", "Botón de oro",
]

# Emojis de flores
EMOJIS = ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🏵️", "💐", "🪷", "💜", "💙", "💚", "💛", "🧡", "❤️", "🤍", "🩷"]

# Templates para mensajes románticos
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
]

# Significados
SIGNIFICADOS = [
    "Amor y pasión", "Amor perfecto", "Adoración y lealtad", "Belleza fugaz",
    "Inocencia y pureza", "Belleza delicada", "Renacimiento espiritual",
    "Devoción y tranquilidad", "Lujo y belleza exótica", "Amor dulce",
    "Romance y buena fortuna", "Pureza y renovación", "Agradecimiento sincero",
    "Admiración y perfección", "Dignidad y elegancia", "Imaginación y paz",
    "Modestia y fidelidad", "Amor secreto", "Cuidado y fragilidad",
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

    for i in range(cantidad):
        flower_id = inicio_id + i

        # Seleccionar flor (con variaciones si se repite)
        flor_base = random.choice(FLORES)
        colores = ["roja", "blanca", "rosa", "amarilla", "morada", "azul", "naranja"]
        variedades = ["silvestre", "de jardín", "tropical", "de montaña", "de campo"]

        # Crear variaciones para evitar duplicados
        if i % 30 == 0:
            nombre = f"{flor_base} {random.choice(colores)}"
        elif i % 20 == 0:
            nombre = f"{flor_base} {random.choice(variedades)}"
        else:
            nombre = flor_base

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

    with open(archivo, 'w', encoding='utf-8') as f:
        f.write("// Flores generadas automáticamente\n")
        f.write("// Agrega estos objetos al array en data/flowers.ts\n\n")

        for flor in flores:
            f.write("  {\n")
            f.write(f'    id: {flor["id"]},\n')
            f.write(f'    nombre: "{flor["nombre"]}",\n')
            f.write(f'    imagen: "{flor["imagen"]}",\n')
            f.write(f'    mensaje: "{flor["mensaje"]}",\n')
            f.write(f'    significado: "{flor["significado"]}"\n')
            f.write("  },\n")

    print(f"✅ {len(flores)} flores exportadas a {archivo}")

def exportar_json(flores: List[Dict], archivo: str = "flores_generadas.json"):
    """
    Exporta las flores en formato JSON
    """
    with open(archivo, 'w', encoding='utf-8') as f:
        json.dump(flores, f, ensure_ascii=False, indent=2)

    print(f"✅ {len(flores)} flores exportadas a {archivo}")

def main():
    print("🌸 Generador de Flores para Alejardín\n")

    # Generar 315 flores (para completar 365 desde las 50 existentes)
    flores = generar_flores(cantidad=315, inicio_id=51)

    # Exportar en ambos formatos
    exportar_typescript(flores)
    exportar_json(flores)

    print(f"\n✨ Total de flores generadas: {len(flores)}")
    print("📝 Copia el contenido de flores_generadas.ts a data/flowers.ts")

if __name__ == "__main__":
    main()
```

## 🎯 Uso

```bash
python generate_flowers.py
```

Esto generará:

- `flores_generadas.ts` - Copia este contenido a `data/flowers.ts`
- `flores_generadas.json` - Backup en JSON

## 🤖 Versión con IA (Claude/ChatGPT)

Si quieres generar flores más creativas con IA:

```python
import anthropic

def generar_con_claude(cantidad: int = 50):
    """Genera flores usando Claude API"""
    client = anthropic.Anthropic(api_key="tu-api-key")

    prompt = f"""Genera {cantidad} flores únicas en formato JSON. Cada flor debe tener:
    - id: número secuencial
    - nombre: nombre de la flor en español
    - imagen: emoji apropiado
    - mensaje: mensaje romántico y emotivo
    - significado: significado simbólico

    Las flores deben ser variadas y reales. Evita duplicados."""

    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=8000,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].text
```

## 💡 Tips

- Ejecuta el script varias veces con diferentes `random.seed()` para variedad
- Revisa y personaliza los mensajes generados
- Agrega emojis específicos para flores particulares
- Usa IA para mejorar la calidad de mensajes y significados
