# Extensión a 365 Flores 🌸

Actualmente tenemos **50 flores** en la base de datos. Aquí te explicamos cómo expandir a 365.

## 🌺 Estructura actual

Cada flor en `/data/flowers.ts` tiene:

```typescript
{
  id: number,        // 1-365
  nombre: string,    // Nombre de la flor
  imagen: string,    // Emoji representativo
  mensaje: string,   // Mensaje romántico/emocional
  significado: string // Significado simbólico
}
```

## 📝 Cómo añadir más flores

### 1. Edita `/data/flowers.ts`

Simplemente añade más objetos al array siguiendo el patrón:

```typescript
{
  id: 51,
  nombre: "Nombre de Flor",
  imagen: "🌸", // Emoji que la represente
  mensaje: "Un mensaje bonito y emotivo",
  significado: "El significado simbólico"
}
```

### 2. Incrementa el ID secuencialmente

- Asegúrate de que cada ID sea único
- El ID debe ir de 1 a 365
- El orden no afecta la funcionalidad (es aleatorio)

### 3. Sugerencias de flores para añadir

**Flores comunes:**

- Petunia, Verbena, Primavera, Salvia, Mimosa
- Flor de almendro, Flor de durazno, Flor de manzano
- Amapola dorada, Amapola californiana
- Malva, Malvarrosa, Malvavisco

**Flores exóticas:**

- Ave del paraíso, Protea, Estrelitzia
- Anturio, Bromelia, Heliconia
- Pasionaria, Trompeta de ángel

**Flores silvestres:**

- Trébol, Diente de león, Margarita silvestre
- Botón de oro, Campanula, Hierba de San Juan

**Flores tropicales:**

- Frangipani, Buganvilla, Jengibre
- Alpinia, Canna, Hedychium

**Flores de jardín:**

- Capuchina, Caléndula, Petunias
- Alegría, Begonias, Impatiens

### 4. Recursos para encontrar flores

- **Wikipedia**: Lista de flores por nombre o familia
- **Floriografía**: Diccionarios de significado de flores
- **Jardines botánicos**: Catálogos de especies

### 5. Consejos para mensajes

Los mensajes deben ser:

- **Románticos o emocionales**
- **Personales** (como si hablaras directamente a la persona)
- **Positivos y afirmativos**
- **Breves** (1-2 líneas)

Ejemplos:

- "Tu fuerza me inspira cada día"
- "Como esta flor, renaces hermosa"
- "Tu luz ilumina mi camino"

### 6. Emojis disponibles para flores

🌸 🌺 🌻 🌷 🌹 🌼 🏵️ 💐 🌾 🌿 🍀 ☘️ 🪷
💜 💙 💚 💛 🧡 ❤️ 🤍 🩷 🩵

Puedes combinarlos o usar colores para representar variedades.

## 🚀 Automatización (Opcional)

Si quieres generar las 365 flores más rápido, puedes:

1. **Crear un script Python o Node.js** que genere el JSON
2. **Usar ChatGPT o Claude** para generar lotes de 50 flores
3. **Combinar fuentes**: Mezcla flores de diferentes regiones/climas

### Ejemplo de prompt para IA:

```
Genera 50 flores más para mi app siguiendo este formato:
{
  id: [siguiente número],
  nombre: "[nombre de flor]",
  imagen: "[emoji]",
  mensaje: "[mensaje romántico/emocional]",
  significado: "[significado simbólico]"
}

Las flores deben ser variadas, con mensajes únicos y emotivos.
```

## ✅ Verificación

Después de añadir flores:

1. **Revisa que cada ID sea único** (1-365)
2. **Comprueba que no hay comas faltantes** en el array
3. **Verifica la sintaxis TypeScript**
4. **Prueba la app** abriendo varias flores

## 🎨 Personalización avanzada

Una vez tengas 365 flores, puedes:

- **Categorizar por estación**: Primavera, Verano, Otoño, Invierno
- **Añadir colores reales**: `color: '#FF6B9D'`
- **Incluir datos científicos**: Nombre latino, familia botánica
- **Enlaces a Wikipedia**: Para aprender más
- **Imágenes reales**: URLs de fotos (requiere hosting)

## 📊 Estado actual

- ✅ 50 flores implementadas
- ⏳ 315 flores restantes para llegar a 365
- 📈 ~14% completado

¡Buena suerte expandiendo tu jardín! 🌸✨
