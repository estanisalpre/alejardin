# 🧪 Modo de Desarrollo - Alejardín

## ¿Qué es el Modo Test?

El **Modo Test** permite abrir **múltiples flores al día** sin restricciones, ideal para:

- 🧪 Testear la aplicación
- 🎨 Ver todas las imágenes de flores
- 🐛 Debuggear funcionalidades
- 📱 Probar la PWA

En **producción** (modo normal), solo se permite **1 flor por día**.

---

## 🚀 Cómo Activar el Modo Test

### 1. Editar `.env.local`

```bash
# En la raíz del proyecto
nano .env.local
```

### 2. Habilitar la Variable

```env
# Development Mode
# Set to 'true' to allow opening multiple flowers per day for testing
# Set to 'false' or remove for production (1 flower per day limit)
NEXT_PUBLIC_DEV_MODE=true
```

### 3. Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl+C) y reiniciar
npm run dev
```

---

## 📌 Verificación Visual

Cuando el **Modo Test** está activo, verás un badge amarillo en la parte superior:

```
🧪 MODO TEST - Sin límite de flores
```

Este badge **NO aparece** en producción cuando `DEV_MODE=false`.

---

## 🔒 Desactivar para Producción

### Opción 1: Cambiar a `false`

```env
NEXT_PUBLIC_DEV_MODE=false
```

### Opción 2: Comentar o Eliminar

```env
# NEXT_PUBLIC_DEV_MODE=true
```

### ⚠️ Importante

No olvides **reiniciar el servidor** (`npm run dev`) después de cambiar las variables de entorno.

---

## 🎯 Comparación

| Característica              | Modo Producción | Modo Test        |
| --------------------------- | --------------- | ---------------- |
| **Flores por día**          | 1               | Ilimitadas       |
| **Badge visual**            | ❌ No           | ✅ Sí (amarillo) |
| **Mensaje "vuelve mañana"** | ✅ Sí           | ❌ No            |
| **localStorage validación** | ✅ Sí           | ⏭️ Omitida       |

---

## 💡 Casos de Uso

### Testear Todas las Flores

```bash
# Habilitar modo test
NEXT_PUBLIC_DEV_MODE=true

# Abrir http://localhost:3001
# Click en "Abrir flor del día" múltiples veces
# Se pueden abrir todas las 365 flores sin esperar
```

### Probar Milestones

```bash
# Con modo test activo:
# - Abrir 7 flores → Ver mensaje "¡Primera semana completa! 🌟"
# - Abrir 30 flores → Ver mensaje "¡Un mes de flores! 🌺"
# - Abrir 100 flores → Ver mensaje "¡100 flores descubiertas! 🎊"
# - Abrir 365 flores → Ver mensaje "¡Año completo! 🌸🌼🌻"
```

### Verificar Imágenes de Pexels

```bash
# Abrir múltiples flores rápidamente para verificar:
# - Que las imágenes cargan correctamente
# - Que no hay imágenes rotas
# - Que el fallback a emoji funciona
```

---

## 🛠️ Implementación Técnica

### Archivos Modificados

1. **`.env.local`**: Variable `NEXT_PUBLIC_DEV_MODE`
2. **`src/lib/storage.ts`**: Función `canOpenToday()` con check de dev mode
3. **`app/page.tsx`**: Badge visual y estado de dev mode

### Lógica

```typescript
// src/lib/storage.ts
export function canOpenToday(): boolean {
  // Si DEV_MODE está activo, siempre permite abrir flores
  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  if (isDevMode) return true;

  // En producción, valida fecha
  const lastDate = getLastOpenDate();
  const today = new Date().toISOString().split("T")[0];
  return lastDate !== today;
}
```

---

## ⚠️ Seguridad

- La variable `NEXT_PUBLIC_*` es **visible en el cliente** (navegador)
- Para producción real (deploy), **eliminar o comentar** `NEXT_PUBLIC_DEV_MODE`
- En Vercel/Netlify, **NO configurar** esta variable en las variables de entorno del proyecto

---

## 🚀 Deploy en Producción

### Vercel

```bash
# NO agregar NEXT_PUBLIC_DEV_MODE en las variables de entorno
# O establecer explícitamente:
NEXT_PUBLIC_DEV_MODE=false
```

### Netlify

```bash
# En Netlify UI > Site settings > Environment variables
# NO agregar NEXT_PUBLIC_DEV_MODE
```

### Build Manual

```bash
# Asegurar que .env.local tenga DEV_MODE=false o esté comentado
npm run build
npm start
```

---

## 📝 Resumen

- ✅ **Desarrollo**: `NEXT_PUBLIC_DEV_MODE=true` → Testear libremente
- ✅ **Producción**: `NEXT_PUBLIC_DEV_MODE=false` o sin variable → 1 flor/día
- ✅ **Visual**: Badge amarillo indica modo test activo
- ✅ **Simple**: Solo cambiar 1 variable

---

**Creado con 💗 para Alejandra**
