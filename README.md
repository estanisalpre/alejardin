<div align="center">

# 🌸 Alejardín 🌸

### _Una flor nueva cada día_ 💗

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.24-F69220?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

Una Progressive Web App (PWA) que revela una flor diferente cada día durante **365 días completos**. Cada flor incluye una imagen real de alta calidad de Pexels, un mensaje personalizado y su significado simbólico.

[🚀 Demo](#) • [📖 Documentación](#características) • [💻 Instalación](#-instalación-rápida)

</div>

---

## ✨ Características

<table>
<tr>
<td width="50%">

### 🌷 Sistema de Flores

- **365 flores únicas** con imágenes reales
- **Una flor por día** (con modo test)
- **Asignación aleatoria** a días del año
- **Persistencia local** en el navegador
- **Progreso visual** con barra de progreso

</td>
<td width="50%">

### 🎨 Experiencia de Usuario

- **Interfaz hermosa** con colores pastel
- **Animaciones suaves** con Framer Motion
- **PWA instalable** como app nativa
- **Jardín interactivo** de 365 días
- **Hitos especiales** (7, 30, 100, 365 días)

</td>
</tr>
<tr>
<td width="50%">

### 📸 Imágenes de Pexels

- **321 imágenes descargadas** automáticamente
- **Alta calidad** optimizadas para web
- **Orientación vertical** para móviles
- **Fallback a emojis** si falla la carga
- **44 flores** usan emojis personalizados

</td>
<td width="50%">

### 🛠️ Características Técnicas

- **Service Worker** para uso offline
- **Favicon personalizado** con flor + "A"
- **Responsive design** móvil primero
- **Navbar inteligente** con scroll
- **Scripts Python** para automatización

</td>
</tr>
</table>

---

## 🚀 Instalación Rápida

### Requisitos Previos

```bash
✅ Node.js 18+
✅ pnpm 8+ (gestor de paquetes)
```

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd mi-jardin

# 2. Instalar dependencias con pnpm
pnpm install

# 3. Configurar variables de entorno (opcional)
cp .env.example .env.local
# Editar .env.local si necesitas el modo dev

# 4. Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

---

## 🛠️ Stack Tecnológico

<div align="center">

|    Tecnología     | Versión |             Propósito             |
| :---------------: | :-----: | :-------------------------------: |
|    **Next.js**    | 15.5.14 |  Framework React con App Router   |
|     **React**     | 19.2.4  | Biblioteca de interfaz de usuario |
|  **TypeScript**   |  5.9.3  |          Tipado estático          |
| **Tailwind CSS**  | 3.4.19  |       Estilos utility-first       |
| **Framer Motion** | 12.38.0 |     Animaciones declarativas      |
|     **pnpm**      | 10.24.0 |     Gestor de paquetes rápido     |

</div>

---

## 📂 Estructura del Proyecto

```
mi-jardin/
├── 📱 app/
│   ├── icon.svg              # Favicon personalizado (flor + A)
│   ├── layout.tsx            # Layout raíz con metadata SEO
│   ├── page.tsx              # Página principal con lógica
│   └── globals.css           # Estilos globales + Tailwind
│
├── 🎨 src/
│   ├── components/
│   │   ├── Button.tsx        # Botón con variantes (primary/secondary)
│   │   ├── FlowerCard.tsx    # Modal de flor con animaciones
│   │   ├── GardenGrid.tsx    # Grilla responsive de 365 días
│   │   ├── ScrollToTop.tsx   # Botón flotante scroll-to-top
│   │   ├── Navbar.tsx        # Navbar fixed con botón instalación PWA
│   │   ├── Footer.tsx        # Footer con dedicatoria
│   │   └── PWAInstaller.tsx  # Registrador de Service Worker
│   │
│   ├── data/
│   │   └── flowers.ts        # 365 flores con datos completos
│   │
│   ├── lib/
│   │   └── storage.ts        # Funciones localStorage + validación
│   │
│   ├── interfaces/
│   │   ├── data.ts           # Interfaces de datos (Flower, etc.)
│   │   ├── components.ts     # Props de componentes
│   │   ├── pwa.ts            # Tipos PWA
│   │   └── index.ts          # Barrel export
│   │
│   └── assets/
│       └── flowers/
│           └── index.ts      # Mapeo de IDs a rutas de imágenes
│
├── 🖼️ public/
│   ├── assets/
│   │   └── flowers/          # 365 imágenes JPG optimizadas
│   │       ├── 001-rosa.jpg
│   │       ├── 002-tulipan.jpg
│   │       └── ...
│   ├── favicon.svg           # Fallback favicon
│   ├── manifest.json         # PWA manifest
│   └── sw.js                 # Service Worker
│
├── 🐍 scripts/
│   ├── generate_flowers.py        # Genera 315 flores automáticamente
│   ├── integrate_flowers.py       # Integra flores a flowers.ts
│   ├── validate_flowers.py        # Valida datos de flores
│   ├── download_flower_images.py  # Descarga imágenes de Pexels
│   ├── retry_failed_flowers.py    # Rescata imágenes fallidas
│   ├── update_flower_images.py    # Vincula imágenes al código
│   ├── requirements.txt           # Dependencias Python
│   └── venv/                      # Entorno virtual Python
│
├── 📄 Archivos de Configuración
│   ├── package.json           # Dependencias y scripts
│   ├── pnpm-lock.yaml         # Lock file de pnpm
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── tailwind.config.ts     # Configuración Tailwind CSS
│   ├── next.config.ts         # Configuración Next.js
│   ├── eslint.config.mjs      # ESLint
│   └── postcss.config.mjs     # PostCSS
│
└── 📚 Documentación
    ├── README.md              # Este archivo
    ├── CLAUDE.md              # Contexto técnico del proyecto
    ├── DEV-MODE.md            # Documentación modo desarrollo
    ├── EXTEND-TO-365.md       # Guía para extender flores
    ├── PNPM-MIGRATION.md      # Guía de migración a pnpm
    └── LICENSE                # Licencia MIT
```

---

## 🎮 Comandos Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo (con hot reload)
pnpm dev

# Compilar y verificar errores TypeScript
pnpm build

# Ejecutar en modo producción
pnpm start

# Linter y corrección de código
pnpm lint
```

### Gestión de Dependencias

```bash
# Instalar todas las dependencias
pnpm install

# Agregar nueva dependencia
pnpm add <paquete>

# Agregar dependencia de desarrollo
pnpm add -D <paquete>

# Actualizar dependencias
pnpm update

# Eliminar dependencia
pnpm remove <paquete>
```

### Scripts Python (Automatización)

```bash
# Activar entorno virtual
cd scripts
source venv/bin/activate  # Linux/Mac
# o
.\venv\Scripts\activate   # Windows

# Generar nuevas flores
python generate_flowers.py

# Descargar imágenes de Pexels
python download_flower_images.py

# Rescatar imágenes fallidas
python retry_failed_flowers.py

# Validar integridad de datos
python validate_flowers.py
```

---

## 🧪 Modo de Desarrollo (Testing)

Para testear sin restricciones de "1 flor por día":

```bash
# 1. Editar .env.local
NEXT_PUBLIC_DEV_MODE=true

# 2. Reiniciar el servidor
pnpm dev
```

**Beneficios:**

- ✅ Abrir múltiples flores al día
- ✅ Testear las 365 flores rápidamente
- ✅ Probar hitos (7, 30, 100, 365 días)

📖 **Documentación completa**: [DEV-MODE.md](DEV-MODE.md)

⚠️ **Importante**: En producción, establecer `NEXT_PUBLIC_DEV_MODE=false` o eliminar la variable.

---

## 🌸 Sistema de Imágenes

### Fuente: API de Pexels

Todas las imágenes provienen de [Pexels](https://www.pexels.com/), un servicio gratuito de fotos de alta calidad.

### Estadísticas

- **Total de flores**: 365
- **Con imagen real**: 321 (88%)
- **Con emoji fallback**: 44 (12%)
- **Resolución**: Optimizada a máximo 800px
- **Formato**: JPEG con calidad 85
- **Orientación**: Vertical (ideal para móviles)

### Proceso de Descarga Automatizado

```python
# 1. Script principal descarga 365 imágenes
python download_flower_images.py

# 2. Si alguna falla, rescate inteligente con 4 estrategias
python retry_failed_flowers.py

# 3. Vinculación automática al código TypeScript
python update_flower_images.py
```

**Estrategias de búsqueda**:

1. Nombre base sin modificadores (español)
2. Término en inglés del diccionario
3. Color + "flower" genérico
4. "beautiful flower" como último recurso

---

## 📱 Instalación como PWA

La aplicación es instalable como app nativa en cualquier dispositivo:

### Móvil (Android/iOS)

1. Abre la app en Chrome/Safari
2. Haz scroll hacia abajo
3. Toca el botón **"📱 Instalar en mi celular"** en el navbar
4. Acepta la instalación
5. ¡Listo! Tendrás un ícono en tu pantalla de inicio

### Desktop (Chrome/Edge)

1. Icono de instalación ⊕ en la barra de direcciones
2. Clic en "Instalar"
3. La app se abrirá en su propia ventana

> El botón desaparece automáticamente una vez instalada. Para reinstalar, desinstala primero desde la configuración de apps.

---

## 🎨 Paleta de Colores

<div align="center">

|       Color       |    Hex    |           Uso            |
| :---------------: | :-------: | :----------------------: |
| 🌸 **Soft Pink**  | `#FFE4E9` | Fondo principal, acentos |
|  💜 **Lavender**  | `#E8D5F2` |  Degradados, secciones   |
| 🌿 **Soft Green** | `#D4F1D4` |    Detalles naturales    |
|   🍑 **Peach**    | `#FFD6BA` |     Acentos cálidos      |
|  ☁️ **Sky Soft**  | `#E3F2FD` |   Cielo, fondos suaves   |
|  💗 **Pink 400**  | `#F472B6` |   Botones, degradados    |
| 🟣 **Purple 500** | `#A855F7` |   Gradientes, énfasis    |

</div>

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# API de Pexels (para scripts Python)
PEXELS_API_KEY=tu_api_key_aqui

# Configuración de imágenes
IMAGE_RESOLUTION=medium        # original, large, medium, small
IMAGE_ORIENTATION=portrait     # portrait, landscape, square

# Modo de desarrollo (opcional)
NEXT_PUBLIC_DEV_MODE=false     # true para testing sin límites
```

**Obtener API Key de Pexels**: [https://www.pexels.com/api/](https://www.pexels.com/api/)

---

## 🚀 Despliegue

### Netlify (Recomendado) 🌐

La forma más fácil de desplegar **Alejardín** y hacerla accesible desde cualquier celular:

```bash
# 1. Subir código a GitHub
git add .
git commit -m "feat: ready for deployment"
git push origin main

# 2. Deploy en Netlify (guía completa)
# Ver: DEPLOY_NETLIFY.md
```

📖 **Guía Completa de Deploy**: [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md)

**Características de Netlify**:

- ✅ **100% Gratis** (100 GB bandwidth/mes)
- ✅ **HTTPS automático** (certificado SSL gratis)
- ✅ **Deploy automático** desde GitHub
- ✅ **PWA optimizado** con plugin de Next.js
- ✅ **CDN global** (rápido en todo el mundo)
- ✅ **Deploy Previews** automáticos en PRs

> **📸 Nota sobre imágenes**: El proyecto está configurado con `images.unoptimized: true` en `next.config.ts` para que las imágenes se sirvan directamente sin procesamiento. Esto es necesario porque Netlify no soporta Next.js Image Optimization en el plan gratuito. Las imágenes se sirven desde `/assets/flowers/` como archivos estáticos optimizados.

### Vercel (Alternativa)

```bash
# 1. Instalar Vercel CLI
pnpm add -g vercel

# 2. Desplegar
vercel

# 3. Producción
vercel --prod
```

### Otras Plataformas

- **Railway**: Soporte para pnpm
- **Cloudflare Pages**: Compatible con App Router
- **Docker**: Incluir Dockerfile para contenedorización

⚠️ **Recordar**: No incluir `NEXT_PUBLIC_DEV_MODE=true` en producción.

---

## 📊 Estructura de Datos

### Interfaz de Flor

```typescript
interface Flower {
  id: number; // 1-365 (único)
  nombre: string; // "Rosa", "Tulipán", etc.
  imagen: string; // Emoji: 🌹, 🌷, etc.
  imagenUrl?: string; // Ruta a imagen real (opcional)
  mensaje: string; // Mensaje personalizado
  significado: string; // Significado simbólico
}
```

### Almacenamiento Local

```typescript
// localStorage keys
{
  "alejardin-day-flowers": {    // Mapeo día → flor ID
    47: 12,                      // Día 47 tiene flor #12
    203: 5,                      // Día 203 tiene flor #5
    ...
  },
  "alejardin-last-date": "2026-03-26"  // Última fecha de apertura
}
```

---

## 🎯 Hitos y Mensajes Especiales

| Flores |       Hito        | Mensaje                                        |
| :----: | :---------------: | :--------------------------------------------- |
|   7    | 🌟 Primera Semana | "¡Primera semana completa! 🌟"                 |
|   30   |     🌺 Un Mes     | "¡Un mes de flores! 🌺"                        |
|  100   |  🎊 Cien Flores   | "¡100 flores descubiertas! 🎊"                 |
|  365   |  🎉 Año Completo  | "¡Año completo! Tu jardín está en flor 🌸🌼🌻" |

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026

[![Contributors](https://img.shields.io/badge/contributors-1-brightgreen?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)]()
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

</div>
