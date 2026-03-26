# 🌸 Scripts de Alejardín

Scripts para generar y gestionar las 365 flores del proyecto.

## 📦 Requisitos

- **Python 3.8+** instalado
- No se requieren dependencias externas para el generador básico

## 🚀 Uso Rápido

### ⚡ Opción Express (Todo en un comando)

```bash
cd scripts
./run_all.sh
```

Este script bash ejecuta todo automáticamente:

1. Genera 315 flores
2. Pregunta si integrar automáticamente
3. Valida el resultado

### Método 1: Integración Automática (Recomendado) ⚡

```bash
cd scripts

# Paso 1: Generar flores
python generate_flowers.py
# Selecciona opción 1

# Paso 2: Integrar automáticamente
python integrate_flowers.py
# Selecciona opción 1 (con backup)
```

¡Listo! Las 315 flores se agregaron automáticamente a `data/flowers.ts`

### Método 2: Integración Manual 📝

```bash
cd scripts
python generate_flowers.py
```

Selecciona la opción **1** cuando te pregunte. Esto generará:

- `flores_generadas.ts` - Código TypeScript listo para copiar
- `flores_generadas.json` - Backup en formato JSON

**Agregar manualmente:**

1. Abre `scripts/flores_generadas.ts`
2. Copia todo el contenido
3. Abre `data/flowers.ts`
4. Pega el contenido **al final del array**, antes de cerrar `];`
5. ¡Listo! Ahora tienes 365 flores

## 📋 Opciones del Generador

### Opción 1: Completar a 365 (Recomendado)

```bash
python generate_flowers.py
# Elige: 1
```

Genera 315 flores con IDs del 51 al 365

### Opción 2: Generar 365 completas

```bash
python generate_flowers.py
# Elige: 2
```

Genera todas las 365 flores desde ID 1 (reemplaza todo el archivo)

### Opción 3: Cantidad personalizada

```bash
python generate_flowers.py
# Elige: 3
# Ingresa: cantidad e ID inicial
```

## 🤖 Scripts Disponibles

### 1. `generate_flowers.py` - Generador de Flores

Genera flores con nombres, mensajes y significados únicos.

```bash
python generate_flowers.py
```

**Opciones:**

- Opción 1: Generar 315 flores (completar a 365)
- Opción 2: Generar todas las 365 flores
- Opción 3: Cantidad personalizada

### 2. `integrate_flowers.py` - Integrador Automático

Integra automáticamente las flores generadas al archivo `data/flowers.ts`

```bash
python integrate_flowers.py
```

**Opciones:**

- Opción 1: Integrar con backup (recomendado)
- Opción 2: Integrar sin backup
- Opción 3: Solo validar archivo actual

**Características:**

- ✅ Crea backup automático antes de modificar
- ✅ Valida IDs únicas y completas
- ✅ Verifica campos requeridos
- ✅ Reporta estadísticas del archivo

### 3. `validate_flowers.py` - Validador y Estadísticas

Valida, analiza y genera reportes sobre el archivo de flores.

```bash
python validate_flowers.py
```

**Opciones:**

- 1. Validar flores (unicidad de IDs, campos completos)
- 2. Ver estadísticas (progreso, emojis más usados, etc.)
- 3. Buscar flores por nombre
- 4. Exportar catálogo en Markdown
- 5. Todo (validar + estadísticas)

**Reportes generados:**

- ✅ Validación de IDs únicas y secuenciales
- ✅ Estadísticas de emojis y significados
- ✅ Análisis de mensajes
- ✅ Progreso hacia las 365 flores
- ✅ Catálogo completo en Markdown

## 🌺 Ejemplo de Salida

El script genera flores con esta estructura:

```typescript
{
  id: 51,
  nombre: "Orquídea morada",
  imagen: "🌸",
  mensaje: "Rara y extraordinaria, la orquídea morada es como un tesoro único",
  significado: "Lujo y belleza exótica",
},
```

## 🎯 Características del Generador

- ✅ **Nombres únicos**: Evita duplicados exactos
- ✅ **Variaciones**: Combina flores con colores y tipos
- ✅ **Mensajes románticos**: 30+ templates personalizados
- ✅ **Significados variados**: 40+ significados simbólicos
- ✅ **Emojis variados**: 18 emojis de flores diferentes
- ✅ **100+ especies**: Rica variedad de flores reales

## 📂 Archivos Generados

- `flores_generadas.ts` - Código TypeScript para copiar a `data/flowers.ts`
- `flores_generadas.json` - Backup en JSON (para referencia)

## 🔧 Personalización

Si quieres modificar el generador, edita `generate_flowers.py`:

- `FLORES`: Lista de nombres de flores
- `COLORES`: Variaciones de color
- `TIPOS`: Tipos de flores (silvestre, tropical, etc.)
- `MENSAJES`: Templates de mensajes románticos
- `SIGNIFICADOS`: Significados simbólicos

## 📝 Notas

- El generador usa **aleatorización** para crear variedad
- Cada ejecución produce un conjunto diferente de flores
- Los nombres son únicos dentro de cada generación
- Los mensajes se personalizan con el nombre de la flor

## 🐛 Solución de Problemas

### Error: "python no encontrado"

```bash
python3 generate_flowers.py
python3 integrate_flowers.py
```

### Error: "No such file or directory"

```bash
cd mi-jardin/scripts
python3 generate_flowers.py
```

### Error: "flores_generadas.ts no existe"

```bash
# Primero genera las flores
python3 generate_flowers.py
# Luego intégralas
python3 integrate_flowers.py
```

### Error al integrar automáticamente

1. Verifica que `data/flowers.ts` existe
2. Revisa el backup creado: `data/flowers.ts.backup`
3. Restaura el backup si es necesario: `cp data/flowers.ts.backup data/flowers.ts`

### Validar archivo después de cambios

```bash
python3 integrate_flowers.py
# Selecciona opción 3
```

## 🚀 Próximos Pasos

1. ✅ Generar las 315 flores restantes
2. Agregar imágenes reales (opcional)
3. Implementar web scraping para imágenes
4. Categorizar flores por temporada

## 💝 Hecho con amor para Alejandra

Este script fue creado para facilitar la expansión de Alejardín a 365 flores completas.

---

¿Preguntas? Revisa la documentación en:

- `PYTHON_GENERATOR.md` - Detalles técnicos del generador
- `WEBSCRAPING_GUIDE.md` - Guía de web scraping (futuro)
- `EXTEND-TO-365.md` - Guía manual de extensión
