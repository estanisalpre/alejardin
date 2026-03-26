# Alejardín 🌸 - Contexto del Proyecto

## 📋 Resumen General

**Alejardín** es una Progressive Web App (PWA) personalizada creada con mucho amor para Alejandra. La aplicación permite descubrir una flor nueva cada día durante un año completo (365 días).

## 🎯 Concepto Principal

- Cada día, el usuario puede abrir **una flor aleatoria**
- Las flores se asignan a **días aleatorios** del 1 al 365 (no secuenciales)
- Una vez abierta, la flor queda desbloqueada en el jardín
- El progreso se guarda en **localStorage** del navegador
- Solo se puede abrir **1 flor por día** (validado por fecha)

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **PWA**: Service Worker personalizado
- **Persistencia**: localStorage

### Estructura de Carpetas

```
alejardin/
├── app/
│   ├── layout.tsx          # Layout raíz con metadata SEO
│   ├── page.tsx            # Página principal con lógica
│   └── globals.css         # Estilos globales + Tailwind
├── components/
│   ├── Button.tsx          # Botón reutilizable con variantes
│   ├── FlowerCard.tsx      # Modal de flor con animaciones
│   ├── GardenGrid.tsx      # Grilla de 365 días
│   ├── ScrollToTop.tsx     # Botón flotante scroll-to-top
│   ├── Navbar.tsx          # Navbar fixed con instalación PWA
│   ├── Footer.tsx          # Footer con mensaje especial
│   └── PWAInstaller.tsx    # Registrador de Service Worker
├── data/
│   └── flowers.ts          # Base de datos de flores (50+)
├── lib/
│   └── storage.ts          # Funciones localStorage
├── public/
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service Worker
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
  mensaje: string; // Mensaje romántico/personal
  significado: string; // Significado simbólico
}
```

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
  "mi-jardin-day-flowers": {
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

## 🐛 Soluciones Técnicas

### Problema: Botón PWA no aparece

**Solución**: Removí dependencia de `deferredPrompt`, botón siempre visible

### Problema: Logo no va a home

**Solución**: Agregué callback `onLogoClick` que cambia estado + scroll

### Problema: Overflow en header

**Solución**: Agregué `pb-1`, `pb-2`, y `leading-tight` al h1

### Problema: Flores secuenciales

**Solución**: Algoritmo de día aleatorio en `storage.ts`

## 📊 Estado Actual

- ✅ 50 flores implementadas
- ✅ Sistema de días aleatorios
- ✅ PWA funcional
- ✅ Animaciones con Framer Motion
- ✅ SEO optimizado
- ✅ Navbar con instalación
- ✅ Footer personalizado
- ⏳ Pendiente: 315 flores más (para llegar a 365)

## 🚀 Próximos Pasos

1. **Completar flores**: Llegar a 365 flores únicas
2. **Imágenes reales**: Opcional, usar fotos en lugar de emojis
3. **Categorías**: Organizar por temporada/color
4. **Compartir**: Función para compartir flores desbloqueadas
5. **Estadísticas**: Dashboard con progreso detallado

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Linting
npm run lint
```

## 📄 Licencia

MIT License - Proyecto de código abierto

## 💌 Dedicatoria

> Esta app fue creada especialmente para Alejandra, que ama las flores.  
> Cada día es una oportunidad para descubrir belleza y amor.  
> ¡Disfruta tu Alejardín! 🌸✨

---

**Última actualización**: Marzo 2026  
**Versión**: 1.0.0  
**Autor**: Con amor para Alejandra
