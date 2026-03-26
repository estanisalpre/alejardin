# 🚀 Guía de Deploy en Netlify - Alejardín PWA

## 📋 Resumen Rápido

1. **Sube código a GitHub**
2. **Conecta repo en Netlify** (netlify.com)
3. **Deploy automático** (Netlify detecta Next.js)
4. **Accede desde celular** y instala como PWA

---

## 🔧 PASO 1: Subir a GitHub

```bash
# En la carpeta del proyecto:
git add .
git commit -m "feat: ready for Netlify deployment"
git push origin main
```

Si no tienes repo aún:

1. Ve a [github.com](https://github.com) → New repository
2. Nombre: `alejardin` (o el que quieras)
3. Visibility: Private (recomendado)
4. NO agregues README/gitignore (ya los tienes)
5. Copia los comandos de conexión:

```bash
git remote add origin https://github.com/TU_USUARIO/alejardin.git
git branch -M main
git push -u origin main
```

---

## 🌐 PASO 2: Deploy en Netlify

### 2.1 Crear Cuenta

1. Ve a [netlify.com](https://www.netlify.com/)
2. Sign up with GitHub (conecta tu cuenta)
3. Autoriza acceso a repositorios

### 2.2 Importar Proyecto

1. Dashboard → **"Add new site"** → **"Import an existing project"**
2. Selecciona **"Deploy with GitHub"**
3. Busca y selecciona **`alejardin`**
4. Configuración:
   - **Branch**: `main`
   - **Build command**: `pnpm build` (auto-detectado)
   - **Publish directory**: `.next` (auto-detectado)
5. Click **"Deploy site"** 🚀

### 2.3 Esperar Deploy

- Toma ~2-5 minutos
- Verás logs en tiempo real
- Cuando termine: ✅ **"Site is live"**

### 2.4 Personalizar URL

Por defecto: `https://random-name-123456.netlify.app`

Para personalizar:

1. Site settings → **"Change site name"**
2. Escribe: `alejardin`
3. Tu URL: **`https://alejardin.netlify.app`** ✨

---

## 📱 PASO 3: Instalar en Celular

### Android (Chrome)

1. Abre `https://alejardin.netlify.app` en Chrome
2. Espera que cargue completamente
3. **Opción A**: Banner automático → "Agregar"
4. **Opción B**: Menú ⋮ → "Agregar a pantalla de inicio"
5. **Opción C**: Botón en navbar → "📱 Instalar"
6. ¡Listo! 🌸 Ahora tienes el ícono en tu pantalla de inicio

### iOS (Safari)

1. Abre `https://alejardin.netlify.app` en **Safari** (no Chrome)
2. Espera que cargue completamente
3. Botón **"Compartir"** 📤 (abajo)
4. **"Agregar a la pantalla de inicio"**
5. Confirma el nombre
6. ¡Listo! 🌸 Ícono agregado

---

## 🔄 Workflow Continuo

### Deploy Automático

```bash
# Cada vez que hagas cambios:
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# Netlify detecta el push y despliega automáticamente (2-5 min)
# Recibes email de confirmación
# Tu PWA se actualiza automáticamente en el celular
```

### Con Ramas (Recomendado)

```bash
# Crear rama de desarrollo
git checkout -b dev
git push -u origin dev

# Netlify creará Deploy Previews automáticos
# URL preview: https://deploy-preview-123--alejardin.netlify.app
```

---

## 🐛 Troubleshooting

### ❌ Problema: "Build failed" en Netlify

**Causa**: Error en el build o dependencias faltantes

**Solución**:

```bash
# 1. Verificar build local
pnpm build

# 2. Si funciona, revisar logs en Netlify:
# Dashboard → Deploys → Click en deploy fallido → Ver logs

# 3. Verificar que netlify.toml esté en el repo
git add netlify.toml
git commit -m "fix: add netlify config"
git push
```

### ❌ Problema: Imágenes no cargan (Error 502)

**Causa**: Next.js Image Optimization no funciona en Netlify free tier

**Solución**: Ya incluida en el proyecto ✅

- `next.config.ts` tiene `images.unoptimized: true`
- Las imágenes se sirven directamente desde `/assets/flowers/`
- No requiere procesamiento en servidor

Si ves error 502 en imágenes:

```bash
# Verificar que next.config.ts tiene:
images: {
  unoptimized: true,  // ✅ Debe estar presente
  ...
}

# Rebuild y redeploy:
git add next.config.ts
git commit -m "fix: enable unoptimized images for Netlify"
git push
```

### ❌ Problema: PWA no se ofrece para instalar

**Causas posibles**:

1. Sitio no es HTTPS (Netlify da HTTPS gratis ✅)
2. Manifest.json no accesible
3. Service Worker no registrado

**Soluciones**:

```bash
# 1. Verificar manifest accesible
# https://alejardin.netlify.app/manifest.json

# 2. Verificar Service Worker
# https://alejardin.netlify.app/sw.js

# 3. Limpiar caché del navegador
# Chrome: Settings → Privacy → Clear browsing data

# 4. Probar en modo incógnito
```

### ❌ Problema: PWA no instala en iPhone

**Causas**:

1. No usar Safari (debe ser Safari, no Chrome)
2. Permisos de iOS desactivados

**Soluciones**:

```
1. Usar Safari obligatoriamente
2. iOS Settings → Safari → Advanced → Experimental Features
3. Activar "Service Workers"
4. Limpiar caché de Safari
5. Reintentar instalación
```

### ❌ Problema: Cambios no reflejan en celular

**Solución**:

```bash
# Opción A: Esperar 24h (Service Worker se actualiza automáticamente)

# Opción B: Reinstalar PWA
1. Desinstalar app del celular (mantener presionado → Eliminar)
2. Limpiar caché del navegador
3. Volver a instalar desde URL
```

---

## ⚙️ Configuración Incluida

### netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"  # Plugin Next.js oficial
```

### next.config.ts

```typescript
images: {
  unoptimized: true,  // ✅ Crítico para Netlify free
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.pexels.com",
    },
  ],
},
```

---

## 🎁 Features Incluidas

✅ **HTTPS automático** (certificado SSL gratis)  
✅ **CDN global** (rápido en todo el mundo)  
✅ **Deploy automático** desde GitHub  
✅ **Rollback** a versiones anteriores  
✅ **Deploy Previews** en PRs  
✅ **Logs detallados** de builds  
✅ **100 GB bandwidth/mes** gratis  
✅ **Imágenes optimizadas** (pre-optimizadas en build)

---

## 📊 Comparación Netlify vs Vercel

| Feature         | Netlify ✅    | Vercel      |
| --------------- | ------------- | ----------- |
| **Plan Gratis** | 100 GB/mes    | 100 GB/mes  |
| **Builds**      | 300 min/mes   | Unlimited   |
| **Next.js**     | ✅ Con plugin | ✅ Nativo   |
| **Image Opt**   | ⚠️ No (free)  | ✅ Sí       |
| **PWA**         | ✅ Perfecto   | ✅ Perfecto |
| **HTTPS**       | ✅ Auto       | ✅ Auto     |

**Para Alejardín**: Ambos funcionan perfecto. Netlify seleccionado porque el usuario no tiene cuenta de Vercel.

---

## 🚀 Next Steps (Opcional)

### Dominio Personalizado

Si quieres `alejardin.com` en vez de `alejardin.netlify.app`:

1. Compra dominio (~$10/año): GoDaddy, Namecheap, etc.
2. Netlify: Site settings → Domain management → Add custom domain
3. Configura DNS según instrucciones
4. Netlify da HTTPS gratis para dominio custom

### Analytics

```bash
# Netlify Analytics (gratis 30 días, luego $9/mes)
# O usar Google Analytics gratis

pnpm add @next/third-parties
```

---

## 📞 Recursos

- **Netlify Docs**: https://docs.netlify.com
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/
- **Soporte**: https://answers.netlify.com

---

## ✨ ¡Todo Listo!

**Tu app está en**: `https://alejardin.netlify.app` (o tu URL personalizada)

**Comparte con Alejandra** para que disfrute de una flor nueva cada día 🌸💗

---

**Última actualización**: Marzo 2026  
**Versión**: 2.0.0  
**Deploy**: Netlify Free Tier  
**Con mucho amor** 💗
