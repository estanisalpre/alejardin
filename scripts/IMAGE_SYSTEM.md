# 🖼️ Sistema de Imágenes de Flores - Alejardín

Guía completa para descargar e integrar imágenes de alta calidad de las 365 flores.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
cd scripts
pip install -r requirements.txt

# 2. Descargar imágenes (toma ~30 minutos)
python download_flower_images.py

# 3. Actualizar referencias en el código
python update_flower_images.py

# 4. Probar la app
cd ..
npm run dev
```

---

## 📋 Requisitos

### 1. API Key de Pexels ✅

- ✅ **Ya configurada** en `.env.local`
- 🔑 API Key: `NPZfrqT44WsBtqB6R9HB0LabcQWBa0BpBw7e6cJOzrV6HNZg54Q282Ys`
- 📊 Límites: 200 requests/hora, 20,000/mes

### 2. Dependencias Python

```bash
pip install -r requirements.txt
```

Instala:

- `requests` - HTTP requests a Pexels
- `python-dotenv` - Variables de entorno
- `Pillow` - Optimización de imágenes

---

## 🛠️ Scripts Disponibles

### 1. `download_flower_images.py` - Descargador Principal

**Qué hace:**

- ✅ Descarga imágenes de Pexels API
- ✅ Busca por nombre de flor en español
- ✅ Fallback automático si no encuentra
- ✅ Optimiza tamaño y calidad
- ✅ Genera reporte detallado

**Configuración:**

- Resolución: **Medium (640px)** - Ideal para móviles
- Orientación: **Portrait (vertical)** - Perfecto para tarjetas
- Formato: **JPEG optimizado** (calidad 85)
- Nombramiento: `{ID:03d}-{nombre-flor}.jpg`

**Ejecución:**

```bash
cd scripts
python download_flower_images.py
```

**Salida:**

- `../src/assets/flowers/*.jpg` - Imágenes descargadas
- `download_report.json` - Reporte completo

**Tiempo estimado:** ~30 minutos para 365 flores

### 2. `update_flower_images.py` - Actualizador de Referencias

**Qué hace:**

- ✅ Escanea imágenes descargadas
- ✅ Actualiza `src/data/flowers.ts` con URLs
- ✅ Genera `src/assets/flowers/index.ts`
- ✅ Crea helpers para acceder a imágenes

**Ejecución:**

```bash
cd scripts
python update_flower_images.py
```

---

## 📊 Sistema de Fallback

El sistema es inteligente y tiene múltiples niveles de fallback:

### Nivel 1: Búsqueda Exacta

```
"Rosa roja" → Busca: "Rosa roja flower"
```

### Nivel 2: Búsqueda Base

```
"Rosa roja" → Busca: "Rosa flower"
```

### Nivel 3: Búsqueda en Inglés

```
"Rosa" → Busca: "rose flower"
```

### Nivel 4: Genérico

```
Cualquier flor → Busca: "beautiful flower"
```

### Nivel 5: Emoji (Frontend)

```
Si la imagen falla al cargar → Muestra emoji
```

---

## 📁 Estructura de Archivos

### Antes de descargar:

```
src/assets/flowers/
├── index.ts      → Placeholder vacío
└── README.md
```

### Después de descargar:

```
src/assets/flowers/
├── index.ts                → Export de todas las imágenes
├── README.md
├── 001-rosa.jpg           → 365 imágenes
├── 002-tulipan.jpg
├── ...
└── 365-[nombre].jpg
```

---

## 🎨 Integración en el Código

### Interface Actualizada

```typescript
// src/interfaces/data.ts
export interface Flower {
  id: number;
  nombre: string;
  imagen: string; // Emoji (fallback)
  imagenUrl?: string; // URL imagen real (opcional)
  mensaje: string;
  significado: string;
}
```

### Uso en Componentes

```typescript
// src/components/FlowerCard.tsx
{flower.imagenUrl ? (
  <Image src={flower.imagenUrl} alt={flower.nombre} />
) : (
  <div>{flower.imagen}</div>  // Fallback a emoji
)}
```

### Helpers Disponibles

```typescript
import { getFlowerImage, hasFlowerImage } from "@/assets/flowers";

// Obtener URL de imagen
const imageUrl = getFlowerImage(flowerId);

// Verificar si existe
if (hasFlowerImage(flowerId)) {
  // Mostrar imagen
}
```

---

## 📊 Reporte de Descarga

Después de ejecutar el script, revisa `download_report.json`:

```json
{
  "total_downloaded": 365,
  "total_failed": 0,
  "total_fallback": 45,
  "downloaded": [...],
  "failed": [...],
  "fallback_used": [...]
}
```

**Campos importantes:**

- `downloaded` - Flores descargadas exitosamente
- `failed` - Flores que no se encontraron (requieren atención)
- `fallback_used` - Flores donde se usó búsqueda alternativa

---

## 🔧 Solución de Problemas

### ❌ Error: "PEXELS_API_KEY no configurada"

```bash
# Verifica que .env.local exista
cat .env.local

# Debe contener:
PEXELS_API_KEY=tu-api-key-aqui
```

### ❌ Error: Rate limit excedido

```bash
# El script ya tiene delays automáticos (0.6s entre requests)
# Si aún falla, aumenta DELAY_BETWEEN_REQUESTS en el script
```

### ❌ Algunas flores no se descargaron

```bash
# Revisa el reporte
cat download_report.json | grep "failed"

# Vuelve a ejecutar (solo descargará las faltantes)
python download_flower_images.py
```

### ❌ Las imágenes no se muestran en la app

```bash
# 1. Verifica que update_flower_images.py se haya ejecutado
python update_flower_images.py

# 2. Reinicia el servidor
npm run dev

# 3. Limpia caché
rm -rf .next
npm run dev
```

---

## 🎯 Calidad y Optimización

### Tamaños de Imagen

- **Original descargada:** ~200-500 KB
- **Después de optimización:** ~80-150 KB
- **Resolución:** 640px (lado más largo)
- **Formato:** JPEG con calidad 85

### Optimizaciones Aplicadas

- ✅ Resize automático (máx 800px)
- ✅ Conversión a RGB (elimina alpha)
- ✅ Compresión JPEG optimizada
- ✅ Lazy loading en componentes
- ✅ Error handling con fallback

---

## 📝 Créditos y Licencias

### Pexels

- Todas las imágenes provienen de [Pexels](https://www.pexels.com/)
- Licencia: **Pexels License** (uso libre, comercial permitido)
- Fotógrafos individuales reconocidos en `download_report.json`

### Atribución

No es requerida por Pexels, pero es buena práctica incluir:

```
"Imágenes cortesía de Pexels (pexels.com)"
```

---

## 🚀 Siguiente Nivel (Opcional)

### WebP Conversion

Para mejor compresión:

```python
# En download_flower_images.py
img.save(output_path, "WEBP", quality=85, method=6)
```

### Progressive Images

Implementar blur placeholder:

```typescript
<Image
  src={flower.imagenUrl}
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### CDN Integration

Subir a Cloudinary/Vercel Blob:

```typescript
const imageUrl = `https://cdn.example.com/flowers/${flowerId}.jpg`;
```

---

## 📌 Checklist Final

- [x] API Key configurada
- [x] Dependencias instaladas
- [ ] Imágenes descargadas (365/365)
- [ ] Referencias actualizadas
- [ ] App probada con imágenes reales
- [ ] Reporte revisado

---

## 💝 Resultado Final

Tu **Alejardín** ahora tendrá:

- ✅ 365 imágenes de alta calidad
- ✅ Optimizadas para móviles
- ✅ Fallback automático a emojis
- ✅ Sistema robusto de manejo de errores
- ✅ Experiencia visual increíble 🌸

---

¡Disfruta tu jardín con imágenes reales! 🌺✨
