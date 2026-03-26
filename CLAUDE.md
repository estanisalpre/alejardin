# Alejardín 🌸 - Contexto del Proyecto

## 📋 Resumen General

**Alejardín** es una Progressive Web App (PWA) personalizada creada con mucho amor para Alejandra. La aplicación permite descubrir una flor nueva cada día durante un año completo (365 días), con **imágenes reales de alta calidad** descargadas desde Pexels API.

## 🎯 Concepto Principal

- Cada día, el usuario puede abrir **una flor aleatoria**
- Las flores se asignan a **días aleatorios** del 1 al 365 (no secuenciales)
- Una vez abierta, la flor queda desbloqueada en el jardín
- El progreso se guarda en **localStorage** del navegador
- Solo se puede abrir **1 flor por día** (validado por fecha)
- **365 flores completas** con imágenes reales optimizadas

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Framework**: Next.js 15.5.14 (App Router)
- **UI Library**: React 19.2.4
- **Lenguaje**: TypeScript 5.9.3
- **Estilos**: Tailwind CSS 3.4.19
- **Animaciones**: Framer Motion 12.38.0
- **Package Manager**: pnpm 10.24.0 (migrado desde npm)
- **PWA**: Service Worker personalizado
- **Persistencia**: localStorage
- **Imágenes**: Pexels API (365 flores optimizadas)

### Estructura de Carpetas

```
mi-jardin/
├── app/
│   ├── layout.tsx          # Layout raíz con metadata SEO
│   ├── page.tsx            # Página principal con lógica
│   ├── globals.css         # Estilos globales + Tailwind
│   └── icon.svg            # Favicon personalizado (flower + A)
├── src/
│   ├── components/
│   │   ├── Button.tsx      # Botón reutilizable con variantes
│   │   ├── FlowerCard.tsx  # Modal de flor con animaciones
│   │   ├── GardenGrid.tsx  # Grilla de 365 días (max 4 cols)
│   │   ├── ScrollToTop.tsx # Botón flotante scroll-to-top
│   │   ├── Navbar.tsx      # Navbar fixed con instalación PWA
│   │   ├── Footer.tsx      # Footer con mensaje especial
│   │   └── PWAInstaller.tsx # Registrador de Service Worker
│   ├── data/
│   │   └── flowers.ts      # Base de datos de 365 flores + imágenes
│   ├── lib/
│   │   └── storage.ts      # Funciones localStorage
│   ├── interfaces/
│   │   ├── data.ts         # Flower, DayFlowerMap
│   │   ├── components.ts   # Props de componentes
│   │   ├── pwa.ts          # BeforeInstallPromptEvent
│   │   └── index.ts        # Barrel export
│   └── assets/
│       └── flowers/
│           └── index.ts    # Mapeo de imágenes
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service Worker
│   ├── favicon.svg         # Favicon en SVG
│   └── assets/
│       └── flowers/        # 365 imágenes JPG optimizadas
├── scripts/
│   ├── generate_flowers.py        # Genera 315 flores
│   ├── integrate_flowers.py       # Integra a flowers.ts
│   ├── validate_flowers.py        # Valida integridad
│   ├── download_flower_images.py  # Descarga desde Pexels
│   ├── retry_failed_flowers.py    # Rescata descargas fallidas
│   └── update_flower_images.py    # Actualiza TypeScript
└── [config files]
```

## 🌸 Sistema de Flores

### Estructura de Datos

Cada flor tiene:

```typescript
interface Flower {
  id: number; // 1-365
  nombre: string; // "Rosa", "Tulipán", etc.
  imagen: string; // Emoji: 🌹, 🌷, etc.
  imagenUrl: string; // ★ NUEVO: Ruta imagen real "/assets/flowers/001-rosa.jpg"
  mensaje: string; // Mensaje romántico/personal
  significado: string; // Significado simbólico
}
```

### Estado Actual: 365 Flores Completas

- ✅ **365 flores únicas** (IDs 1-365)
- ✅ **365 imágenes reales** descargadas de Pexels API
- ✅ **100+ especies** diferentes (Rosa, Lilium, Orquídea, Girasol, etc.)
- ✅ **30+ mensajes** románticos variados
- ✅ **40+ significados** simbólicos únicos

### Mapeo Día → Flor

El sistema no asigna flores secuencialmente. En su lugar:

1. Usuario abre flor del día
2. Sistema busca días disponibles (no ocupados del 1-365)
3. Elige un **día ALEATORIO** de los disponibles
4. Asigna la flor a ese día
5. Guarda el mapeo en localStorage

```typescript
// Ejemplo localStorage:
{
  "alejardin-day-flowers": {
    47: 12,   // Día 47 → Flor ID 12
    203: 5,   // Día 203 → Flor ID 5
    12: 38    // Día 12 → Flor ID 38
  }
}
```

## 🎨 Diseño Visual

### Paleta de Colores

- **Rosa suave**: `#FFE4E9` (soft-pink)
- **Lavanda**: `#E8D5F2`
- **Verde suave**: `#D4F1D4`
- **Durazno**: `#FFD6BA`
- **Cielo suave**: `#E3F2FD`

### Tipografía

- **Principal**: Inter (sistema)
- **Manuscrita**: Dancing Script (footer)
- **Degradados**: Rosa → Morado para títulos

### Animaciones

- **Framer Motion**: Animaciones de entrada/salida
- **Tailwind**: Animaciones CSS personalizadas
  - `animate-fade-in`: Fade in suave
  - `animate-scale-in`: Scale con fade
  - `animate-float`: Flotación continua
  - `animate-bounce`: Rebote (scroll button)

## 🔐 Funcionalidades Clave

### 1. Control Diario

- Validación de fecha en `localStorage`
- Solo 1 flor por día
- Mensaje si ya abrió: "Ya descubriste la flor de hoy 🌷 vuelve mañana"

### 2. Jardín de 365 Días

- Vista de grilla con todos los días
- Días bloqueados: 🌸 gris + "Día X" + 🔒
- Días desbloqueados: Emoji flor + nombre + "Día X"
- Click en flor desbloqueada → abre modal

### 3. PWA Instalable

- **Navbar** muestra botón "📱 Instalar en mi celular"
- Usa API `beforeinstallprompt`
- Botón desaparece si ya está instalada
- Fallback con instrucciones manuales
- Service Worker para caché offline

### 4. Navegación Inteligente

- **Navbar** aparece al hacer scroll (>100px)
- Click en logo → vuelve al home
- **ScrollToTop** flotante (aparece >300px scroll)

### 5. Hitos y Milestones

- 7 días: "¡Primera semana completa! 🌟"
- 30 días: "¡Un mes de flores! 🌺"
- 100 días: "¡100 flores descubiertas! 🎊"
- 365 días: "¡Año completo! Tu jardín está en flor 🌸🌼🌻"

## 📱 PWA Configuration

### manifest.json

```json
{
  "name": "Alejardín",
  "short_name": "Alejardín",
  "display": "standalone",
  "background_color": "#FFF9FB",
  "theme_color": "#FFE4E9",
  "start_url": "/",
  "orientation": "portrait"
}
```

### Service Worker

- Estrategia: Cache First, Network Fallback
- Caché: páginas principales, manifest, íconos
- Auto-limpieza de cachés antiguos

## 🎯 SEO y Metadata

- **Title**: "Alejardín 🌸 - Una flor nueva cada día"
- **Description**: Optimizada para búsquedas
- **Keywords**: flores, jardín, PWA, naturaleza
- **Open Graph**: Configurado para redes sociales
- **Twitter Card**: Summary large image
- **Robots**: Index y follow habilitados
- **Viewport**: Responsive, max-scale=5

## 🔄 Flujo de Usuario

### Primera Visita

1. Landing con logo Alejardín + contador (Día 0 de 365)
2. Botón "Abrir flor del día"
3. Click → Animación + modal con flor
4. Flor se guarda en día aleatorio
5. Botón "Ver Alejardín" muestra jardín

### Visitas Posteriores

1. Verifica fecha en localStorage
2. Si ya abrió hoy → bloquea botón
3. Si es nuevo día → permite abrir otra flor
4. Jardín muestra progreso acumulado

### En el Jardín

1. Grilla de 365 casillas
2. Scroll automático con botón flotante
3. Click en flor → modal con detalles
4. Navbar fixed con acceso a home

## 💝 Personalización para Alejandra

- Nombre: **Alejardín** (fusión Alejandra + Jardín)
- Footer: "Con mucho 💗 para Alejandra, que le encantan las flores"
- Mensajes: Románticos y personales
- Colores: Pastel, femeninos, suaves
- Emojis: Flores variadas 🌸🌺🌻🌷🌹🌼

## 🐛 Soluciones Técnicas y Problemas Resueltos

### ✅ Problema: Solo 50 flores (necesitábamos 365)

**Solución**: Sistema completo de automatización Python

- Script `generate_flowers.py` genera 315 flores adicionales
- Validación automática de unicidad y formato
- Integración automática con `integrate_flowers.py`

### ✅ Problema: Sin imágenes reales

**Solución**: Sistema de descarga desde Pexels API

- Script `download_flower_images.py` con búsqueda inteligente
- 4 estrategias de fallback en `retry_failed_flowers.py`
- 365/365 imágenes descargadas (100% éxito)
- Optimización automática con Pillow

### ✅ Problema: Código desorganizado (root folder)

**Solución**: Reorganización completa a estructura src/

- Creada carpeta `src/` con subdirectorios
- Movidos: components/, data/, lib/, interfaces/
- Actualizado `tsconfig.json` con paths `@/*`
- Centralización de tipos en `src/interfaces/`

### ✅ Problema: Tailwind CSS no procesaba estilos

**Solución**: Actualización de `tailwind.config.ts`

```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}", // ← Agregado
],
```

### ✅ Problema: npm lento en instalaciones

**Solución**: Migración completa a pnpm

- Eliminados: `node_modules/`, `package-lock.json`
- Ejecutado: `pnpm install`
- Resultado: 354 paquetes en 15.8s (vs ~45s con npm)
- Actualizado `.gitignore` para pnpm

### ✅ Problema: Sin favicon personalizado

**Solución**: SVG personalizado en `app/icon.svg`

- Diseño: 6 pétalos de flor + letra "A" central
- Gradiente rosa-morado
- Auto-detectado por Next.js App Router
- Backup en `public/favicon.svg`

### ✅ Problema: Botón PWA no aparece

**Solución**: Removí dependencia de `deferredPrompt`, botón siempre visible

### ✅ Problema: Logo no va a home

**Solución**: Agregué callback `onLogoClick` que cambia estado + scroll

### ✅ Problema: Overflow en header

**Solución**: Agregué `pb-1`, `pb-2`, y `leading-tight` al h1

### ✅ Problema: Flores secuenciales (predecibles)

**Solución**: Algoritmo de día aleatorio en `storage.ts`

```typescript
// Selecciona día aleatorio de los disponibles (1-365)
const availableDays = Array.from({ length: 365 }, (_, i) => i + 1).filter(
  (day) => !assignedDays.has(day),
);
const randomDay =
  availableDays[Math.floor(Math.random() * availableDays.length)];
```

### ✅ Problema: Imágenes en src/ no sirven en Next.js

**Solución**: Movidas de `src/assets/flowers/` → `public/assets/flowers/`

- Next.js solo sirve static files desde `public/`
- Mantenido `src/assets/flowers/index.ts` solo para mapeo TypeScript

## � Sistema de Automatización Python

### Scripts Disponibles

El proyecto incluye 6 scripts Python para automatización completa:

#### 1. `generate_flowers.py`

**Propósito**: Genera 315 flores únicas (IDs 51-365)

**Características**:

- 100+ especies de flores
- 30+ plantillas de mensajes románticos
- 40+ significados simbólicos
- Validación anti-duplicados
- Output: `flores_generadas.ts` (59KB) y `.json`

**Uso**:

```bash
cd scripts
python generate_flowers.py
```

#### 2. `integrate_flowers.py`

**Propósito**: Integra flores generadas a `src/data/flowers.ts`

**Características**:

- Backup automático (`flowers.ts.backup`)
- Validación de IDs 1-365
- Reporte de estadísticas
- Preserva flores existentes (IDs 1-50)

**Uso**:

```bash
python integrate_flowers.py
```

#### 3. `validate_flowers.py`

**Propósito**: Valida integridad de datos

**Validaciones**:

- IDs secuenciales (1-365)
- Campos obligatorios presentes
- Sin duplicados en nombres
- Formato TypeScript correcto

**Uso**:

```bash
python validate_flowers.py
```

#### 4. `download_flower_images.py` ⭐

**Propósito**: Descarga imágenes desde Pexels API

**Configuración**:

- Resolución: Medium (640px portrait)
- Formato: JPEG calidad 85
- Optimización: max 800px
- Rate limit: 0.6s entre requests

**Características**:

- Búsqueda inteligente (exacta → base → inglés → genérica)
- Diccionario español-inglés integrado
- Reporte detallado (`download_report.json`)
- Progreso en tiempo real

**Resultado**: 321/365 imágenes (88% éxito primera pasada)

**Uso**:

```bash
# Requiere .env.local con PEXELS_API_KEY
python download_flower_images.py
```

#### 5. `retry_failed_flowers.py` 🔄

**Propósito**: Rescata flores con descargas fallidas

**Estrategias de Fallback**:

1. Nombre base español (sin adjetivos)
2. Diccionario inglés completo
3. Color + "flower" genérico
4. "Beautiful flower" genérico

**Resultado**: 44/44 rescatadas (100% éxito)

**Uso**:

```bash
python retry_failed_flowers.py
```

#### 6. `update_flower_images.py`

**Propósito**: Vincula imágenes descargadas al código TypeScript

**Acciones**:

- Actualiza `src/assets/flowers/index.ts` (mapa de imágenes)
- Actualiza `src/data/flowers.ts` (campo `imagenUrl`)
- Genera exports automáticos

**Output**:

```typescript
// src/assets/flowers/index.ts
export const flowerImages: Record<number, string> = {
  1: "/assets/flowers/001-rosa.jpg",
  2: "/assets/flowers/002-tulipan.jpg",
  // ...365 flores
};
```

**Uso**:

```bash
python update_flower_images.py
```

### Workflow Completo de Automatización

```bash
# 1. Setup Python environment
cd scripts
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# 2. Configurar API key de Pexels
# Crear .env.local en la raíz con:
# PEXELS_API_KEY=tu_api_key_aqui

# 3. Generar flores
python generate_flowers.py

# 4. Integrar al proyecto
python integrate_flowers.py

# 5. Validar integridad
python validate_flowers.py

# 6. Descargar imágenes
python download_flower_images.py

# 7. Rescatar fallos (si hay)
python retry_failed_flowers.py

# 8. Actualizar código TypeScript
python update_flower_images.py
```

## 🖼️ Sistema de Imágenes

### Arquitectura de Imágenes

```
public/assets/flowers/
├── 001-rosa.jpg           # Flor ID 1
├── 002-tulipan.jpg        # Flor ID 2
├── ...
└── 365-begonia-azul.jpg   # Flor ID 365
```

### Especificaciones Técnicas

- **Cantidad**: 365 imágenes JPG optimizadas
- **Fuente**: Pexels API (gratis, sin atribución requerida)
- **Resolución**: Portrait medium (~640px)
- **Optimización**: Redimensionadas a max 800px con Pillow
- **Calidad**: JPEG 85
- **Nomenclatura**: `{id:03d}-{nombre-normalizado}.jpg`

### Estadísticas de Descarga

```
Total: 365 flores
├── Descarga exitosa primera pasada: 321 (88%)
├── Rescatadas con retry script: 44 (12%)
└── Éxito total: 365 (100%)
```

### Integración en Next.js

Las imágenes se sirven estáticamente desde `public/`:

```typescript
// En components/FlowerCard.tsx
<Image
  src={flower.imagenUrl}
  alt={flower.nombre}
  width={300}
  height={400}
  className="rounded-lg"
  priority
/>
```

Next.js optimiza automáticamente:

- Lazy loading
- Responsive images
- WebP cuando es posible
- Cache inteligente

## 📊 Estado Actual

- ✅ **365 flores completas** (implementadas y validadas)
- ✅ **365 imágenes reales** descargadas de Pexels
- ✅ **Python automation** (6 scripts funcionales)
- ✅ **Estructura src/** (código organizado)
- ✅ **pnpm** como package manager
- ✅ **Favicon personalizado** (flower + A)
- ✅ **Tailwind CSS** configurado correctamente
- ✅ **PWA funcional** con Service Worker
- ✅ **Sistema de días aleatorios**
- ✅ **Animaciones** con Framer Motion
- ✅ **SEO optimizado**
- ✅ **Navbar** con instalación PWA
- ✅ **Footer** personalizado

## 📝 Comandos Útiles

### Desarrollo con pnpm

```bash
# Desarrollo
pnpm dev          # Inicia servidor en http://localhost:3001

# Build
pnpm build        # Compila para producción

# Producción
pnpm start        # Inicia servidor de producción

# Linting
pnpm lint         # Ejecuta ESLint

# Instalación
pnpm install      # Instala dependencias (mucho más rápido que npm)
```

### Python Scripts

```bash
# Activar entorno virtual
cd scripts
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

# Generar flores
python generate_flowers.py

# Integrar al proyecto
python integrate_flowers.py

# Validar integridad
python validate_flowers.py

# Descargar imágenes (requiere .env.local con PEXELS_API_KEY)
python download_flower_images.py

# Rescatar descargas fallidas
python retry_failed_flowers.py

# Actualizar TypeScript con imágenes
python update_flower_images.py

# Desactivar entorno
deactivate
```

### Git Workflow

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Commit descriptivo
git commit -m "feat: add 365 real flower images from Pexels API"

# Push
git push origin main
```

## 📄 Licencia

MIT License - Proyecto de código abierto

## 💌 Dedicatoria

> Esta app fue creada especialmente para Alejandra, que ama las flores.  
> Cada día es una oportunidad para descubrir belleza y amor.  
> ¡Disfruta tu Alejardín! 🌸✨

---

## 📚 Changelog de Versiones

### v2.0.0 (Marzo 2024) - 🌸 Actualización Mayor

**Nuevas Características**:

- ✨ 365 flores completas (vs 50 anteriores)
- 🖼️ Imágenes reales de alta calidad desde Pexels API
- 🐍 6 scripts Python de automatización completa
- 📁 Estructura src/ organizada
- ⚡ Migración a pnpm (354 paquetes en 15.8s)
- 🎨 Favicon personalizado (flor + A)
- 🔧 Tailwind CSS fix para src/

**Mejoras Técnicas**:

- TypeScript paths centralizados
- Interfaces organizadas en src/interfaces/
- Optimización de imágenes automática
- Sistema de fallback para descargas

**Bugs Corregidos**:

- Tailwind no procesaba src/ components
- Imágenes 404 por ubicación incorrecta
- npm lento reemplazado por pnpm

### v1.0.0 (Marzo 2024) - 🎉 Lanzamiento Inicial

**Características**:

- 50 flores manuales
- Sistema de días aleatorios
- PWA instalable
- Diseño responsive
- Animaciones Framer Motion

---

**Última actualización**: Marzo 2024  
**Versión**: 2.0.0  
**Autor**: Con amor para Alejandra 💗
