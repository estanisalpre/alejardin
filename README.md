# Alejardín 🌸

Una aplicación web PWA (Progressive Web App) que te permite descubrir una flor nueva cada día durante todo un año (365 flores). Creada con mucho 💗 para Alejandra.

## ✨ Características

- 🌷 **Una flor por día**: Descubre una flor diferente cada día
- 🎲 **Días aleatorios**: Las flores se asignan a días aleatorios del 1 al 365
- 💾 **Persistencia local**: Tu progreso se guarda en el navegador
- 🎨 **Diseño hermoso**: Interfaz minimalista con colores pastel y animaciones suaves
- 📱 **PWA instalable**: Instala "Alejardín" en tu dispositivo como una app nativa
- 🌼 **Jardín de 365 días**: Visualiza todos los 365 días y descubre cuáles has desbloqueado
- 🎯 **Hitos especiales**: Mensajes especiales al completar 7, 30, 100 y 365 flores
- 🔝 **Scroll suave**: Botón flotante para volver al inicio
- 🏷️ **Navbar inteligente**: Aparece al hacer scroll con botón de instalación PWA

## 🚀 Comenzar

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

### 🧪 Modo de Desarrollo (Test)

Para testear la aplicación sin restricciones de 1 flor por día, activa el **Modo Test**:

```bash
# En .env.local
NEXT_PUBLIC_DEV_MODE=true
```

Esto permite:

- ✅ Abrir múltiples flores al día
- ✅ Testear todas las 365 flores rápidamente
- ✅ Ver badge visual "MODO TEST" en la app

**Documentación completa**: Ver [DEV-MODE.md](DEV-MODE.md)

⚠️ **Importante**: En producción, establecer `NEXT_PUBLIC_DEV_MODE=false` o eliminar la variable.

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **localStorage** - Persistencia de datos
- **PWA** - Progressive Web App con Service Worker

## 📱 Instalación como PWA

1. Abre la app en tu navegador (Chrome, Edge, Safari)
2. Haz scroll y verás el botón "📱 Instalar en mi celular" en el navbar
3. Haz clic y acepta la instalación
4. ¡Disfruta de Alejardín como si fuera una app nativa!

> El botón de instalación desaparece automáticamente una vez que la app está instalada.

## 🌸 Estructura de datos

Cada flor contiene:

- **id**: Número único (1-365)
- **nombre**: Nombre de la flor
- **imagen**: Emoji representativo
- **mensaje**: Mensaje romántico/emocional
- **significado**: Significado simbólico de la flor

## 📂 Estructura del proyecto

```
alejardin/
├── app/
│   ├── layout.tsx       # Layout principal con metadata
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globales
├── components/
│   ├── Button.tsx       # Componente de botón
│   ├── FlowerCard.tsx   # Tarjeta modal de flor
│   ├── GardenGrid.tsx   # Grilla de 365 días
│   ├── ScrollToTop.tsx  # Botón flotante scroll
│   ├── Navbar.tsx       # Navbar con instalación PWA
│   ├── Footer.tsx       # Footer con mensaje especial
│   └── PWAInstaller.tsx # Registrador de Service Worker
├── data/
│   └── flowers.ts       # Datos de las flores (50+)
├── lib/
│   └── storage.ts       # Funciones de localStorage
└── public/
    ├── manifest.json    # Manifest PWA
    └── sw.js           # Service Worker
```

## 💝 Hecho con amor

Esta app fue creada especialmente para Alejandra, que le encantan las flores. Cada flor tiene su propio significado y mensaje especial pensado con cariño.

¡Disfruta tu Alejardín! 🌸✨
