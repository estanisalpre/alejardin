# 🚀 Guía de Deploy en Netlify - Alejardín PWA

## 📋 Resumen

Esta guía te ayuda a desplegar **Alejardín** en Netlify (100% gratis) y hacerlo accesible desde tu celular como PWA instalable.

---

## ✅ Prerequisitos

- ✅ Código del proyecto listo (ya lo tienes)
- ✅ Cuenta de GitHub (necesitas crear una si no tienes)
- ✅ Cuenta de Netlify (gratuita, te registro en el paso 2)

---

## 🔧 PASO 1: Subir Código a GitHub

### 1.1 Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) y crea una cuenta (o inicia sesión)
2. Click en el botón **"New"** (verde) o **"+"** → **"New repository"**
3. Configuración:
   - **Repository name**: `alejardin` (o el nombre que quieras)
   - **Description**: `Progressive Web App de flores para Alejandra 🌸`
   - **Visibility**: 
     - ✅ **Private** (recomendado, solo tú lo ves)
     - ⚠️ Public (todos pueden ver el código)
   - ❌ NO marques "Add a README file" (ya tienes uno)
   - ❌ NO agregues .gitignore (ya tienes uno)
4. Click **"Create repository"**

### 1.2 Conectar tu Proyecto Local con GitHub

Copia los comandos que GitHub te muestra (o usa estos):

```bash
# En la terminal, desde la carpeta /home/agriestanis/others/mi-jardin:

# Verificar que estás en la carpeta correcta
pwd

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit con mensaje descriptivo
git commit -m "feat: complete PWA with 365 flowers, testing system and Netlify config"

# Agregar remote (reemplaza TU_USUARIO con tu nombre de GitHub)
git remote add origin https://github.com/TU_USUARIO/alejardin.git

# Cambiar a rama main (si no estás)
git branch -M main

# Subir código a GitHub
git push -u origin main
```

**💡 Si pide contraseña**, usa un **Personal Access Token** (no tu contraseña real):
- Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token → Marca "repo" → Generate
- Copia el token y úsalo como contraseña

### 1.3 Verificar que se subió correctamente

Ve a `https://github.com/TU_USUARIO/alejardin` y verifica que veas todos los archivos.

---

## 🌐 PASO 2: Deploy en Netlify

### 2.1 Crear Cuenta en Netlify

1. Ve a [netlify.com](https://www.netlify.com/)
2. Click en **"Sign up"**
3. Elige **"Sign up with GitHub"** (conecta tu cuenta de GitHub)
4. Autoriza a Netlify para acceder a tus repositorios

### 2.2 Importar y Desplegar

1. Una vez logueado, click en **"Add new site"** → **"Import an existing project"**
2. Selecciona **"Deploy with GitHub"**
3. Busca y selecciona el repositorio **`alejardin`**
4. Configuración de Build:
   - **Branch to deploy**: `main`
   - **Build command**: `pnpm build` (Netlify lo detecta automáticamente)
   - **Publish directory**: `.next` (ya configurado en netlify.toml)
   - **Base directory**: (dejar vacío)
5. Click **"Deploy site"**

### 2.3 Esperar el Deploy

- Netlify comenzará a construir tu app (toma ~2-5 minutos)
- Verás el progreso en tiempo real
- Cuando termine, verás: ✅ **"Site is live"**

### 2.4 Obtener tu URL

Netlify te asigna una URL automática tipo:
```
https://random-name-123456.netlify.app
```

**Personalizar el nombre** (opcional pero recomendado):

1. En el dashboard del sitio → **"Site settings"**
2. Click en **"Change site name"**
3. Escribe: `alejardin` (o el que quieras)
4. Tu URL será: **`https://alejardin.netlify.app`** ✨

---

## 📱 PASO 3: Instalar PWA en el Celular

### 3.1 Para Android (Chrome)

1. **Abre Chrome** en tu celular Android
2. Ve a **`https://alejardin.netlify.app`** (o tu URL personalizada)
3. Espera a que cargue completamente
4. Verás un **banner de instalación** que dice:
   - "Agregar Alejardín a la pantalla de inicio"
   - O aparecerá un ícono de **"+"** en la barra de navegación
5. Opciones para instalar:

   **Opción A - Banner automático:**
   - Click en **"Agregar"** o **"Instalar"**
   
   **Opción B - Menú manual:**
   - Click en el menú **⋮** (tres puntos arriba a la derecha)
   - Selecciona **"Agregar a pantalla de inicio"** o **"Instalar aplicación"**
   
   **Opción C - Botón en la app:**
   - En la navbar de Alejardín, click en **"📱 Instalar en mi celular"**
   - Aparecerá el prompt de instalación
   
6. Confirma la instalación
7. ¡Listo! Ahora tienes **Alejardín** como una app en tu pantalla de inicio 🌸

### 3.2 Para iPhone/iPad (Safari)

1. **Abre Safari** (importante: debe ser Safari, no Chrome)
2. Ve a **`https://alejardin.netlify.app`**
3. Espera a que cargue completamente
4. Click en el botón de **"Compartir"** (el cuadrado con flecha hacia arriba) en la barra inferior
5. Scroll hacia abajo y selecciona **"Agregar a la pantalla de inicio"**
6. Personaliza el nombre si quieres (por defecto: "Alejardín")
7. Click en **"Agregar"**
8. ¡Listo! Ahora tienes el ícono en tu pantalla de inicio 🌸

### 3.3 Verificar que es una PWA

Una vez instalada, la app debería:
- ✅ Abrir en **pantalla completa** (sin barra de navegador)
- ✅ Tener el **ícono personalizado** con la flor y la "A"
- ✅ Funcionar **offline** (después de la primera carga)
- ✅ Comportarse como una **app nativa**

---

## 🔄 PASO 4: Workflow de Desarrollo Continuo

### 4.1 Hacer Cambios en el Código

```bash
# 1. Hacer cambios en el código (agregar features, corregir bugs, etc.)

# 2. Probar localmente
pnpm dev

# 3. Correr tests
pnpm test

# 4. Hacer commit
git add .
git commit -m "feat: descripción de lo que cambiaste"

# 5. Subir a GitHub
git push origin main
```

### 4.2 Deploy Automático

- ✨ **Netlify detecta automáticamente** el push a GitHub
- 🚀 **Despliega automáticamente** los cambios
- ⏱️ Toma ~2-5 minutos
- 📧 Recibes un **email de confirmación** cuando termina
- 🔄 Tu PWA se actualiza automáticamente en el celular

### 4.3 Workflow con Ramas (Recomendado)

Si quieres usar ramas (dev, feature branches):

```bash
# Crear rama de desarrollo
git checkout -b dev
git push -u origin dev

# Configurar en Netlify:
# 1. Site settings → Build & deploy → Deploy contexts
# 2. Agregar "Deploy Previews" para ramas específicas
# 3. Netlify creará URLs preview tipo: https://deploy-preview-123--alejardin.netlify.app
```

---

## 🎯 Comparación Netlify vs Vercel

| Feature | Netlify ✅ | Vercel |
|---------|-----------|--------|
| **Plan Gratuito** | 100 GB bandwidth/mes | 100 GB bandwidth/mes |
| **Builds** | 300 minutos/mes | Unlimited |
| **Dominios Custom** | ✅ Gratis | ✅ Gratis |
| **HTTPS** | ✅ Automático | ✅ Automático |
| **Deploy Previews** | ✅ Sí | ✅ Sí |
| **Next.js Support** | ✅ Con plugin | ✅ Nativo (mejor) |
| **PWA Support** | ✅ Perfecto | ✅ Perfecto |
| **Logs** | 1 día | 1 día |
| **Functions** | 125k invocations/mes | 100k invocations/mes |

**Para Alejardín**: Ambos funcionan perfecto, Netlify es excelente opción 👍

---

## 🐛 Troubleshooting

### Problema: "Build failed" en Netlify

**Solución**:
```bash
# 1. Verificar que el build funciona localmente
pnpm build

# 2. Si funciona local, revisar logs en Netlify:
# Dashboard → Deploys → Click en el deploy fallido → Ver logs

# 3. Errores comunes:
# - Missing pnpm: Netlify usa npm por defecto, pero netlify.toml lo configura
# - Node version: netlify.toml especifica Node 20
```

### Problema: PWA no se ofrece para instalar en Android

**Soluciones**:
1. Verificar que el sitio es **HTTPS** (Netlify da HTTPS gratis)
2. Verificar que `manifest.json` sea accesible: `https://tu-url.netlify.app/manifest.json`
3. Verificar que `sw.js` sea accesible: `https://tu-url.netlify.app/sw.js`
4. Limpiar caché del navegador
5. Abrir en **modo incógnito** y probar de nuevo

### Problema: PWA no instala en iPhone

**Soluciones**:
1. **Debe ser Safari**, no Chrome u otro navegador
2. iOS requiere permisos: Settings → Safari → Advanced → Experimental Features → "Service Workers" debe estar habilitado
3. Limpiar caché de Safari

### Problema: Los cambios no se reflejan en el celular

**Soluciones**:
1. **Desinstalar la PWA** del celular
2. Limpiar caché del navegador
3. Volver a instalar desde la nueva URL
4. O esperar ~24 horas (el Service Worker se actualiza automáticamente)

### Problema: Imágenes no cargan

**Verificación**:
```bash
# Confirmar que las imágenes están en public/assets/flowers/
ls -la public/assets/flowers/ | wc -l
# Debería mostrar 365 (+2 por . y ..)

# Verificar URLs en el código
grep -r "imagenUrl" src/data/flowers.ts | head -5
```

---

## 🎁 Features Incluidas

### ✅ Ya Configurado Automáticamente

- **HTTPS Gratis**: Certificado SSL automático
- **CDN Global**: Tu app es rápida en todo el mundo
- **CI/CD Automático**: Push → Deploy automático
- **Rollback**: Puedes volver a versiones anteriores
- **Deploy Previews**: PRs generan URLs de preview
- **Analytics**: Básicos incluidos (visitas, etc.)
- **Forms**: Si agregas formularios, Netlify los maneja
- **Headers Optimizados**: Cache para assets, PWA headers

### 🔒 Service Worker y Offline

El Service Worker (`public/sw.js`) cachea:
- Páginas principales
- Manifest
- Íconos
- Assets estáticos

Tu app funciona **offline** después de la primera visita.

---

## 📊 Monitoreo

### Ver Estadísticas

1. Dashboard de Netlify → Tu sitio
2. **Analytics** (tab): Visitas, bandwidth, etc.
3. **Functions** (tab): Si usas serverless functions
4. **Deploy logs**: Historial completo de deploys

### Configurar Notificaciones

1. Site settings → Build & deploy → Deploy notifications
2. Opciones:
   - Email cuando deploy falla
   - Slack/Discord webhooks
   - GitHub commit status

---

## 🚀 Next Steps (Opcional)

### 1. Dominio Personalizado

Si quieres un dominio tipo `alejardin.com`:

1. Compra un dominio (ej: GoDaddy, Namecheap, ~$10/año)
2. En Netlify: Site settings → Domain management → Add custom domain
3. Configura DNS según instrucciones de Netlify
4. Netlify da HTTPS gratis para domini personalizados

### 2. Analytics Avanzados

```bash
# Instalar Netlify Analytics (gratis por 30 días, luego $9/mes)
# O usar Google Analytics gratis:
pnpm add @next/third-parties
```

### 3. Optimizaciones

```bash
# Agregar compression
# Netlify lo hace automático (Brotli/Gzip)

# Optimizar imágenes
pnpm add sharp
# Next.js usa sharp automáticamente para Image optimization
```

---

## 📞 Soporte

### Documentación Oficial
- **Netlify Docs**: https://docs.netlify.com
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/overview/
- **PWA Guide**: https://web.dev/progressive-web-apps/

### Comunidad
- **Netlify Forums**: https://answers.netlify.com
- **Discord**: https://discord.com/invite/netlify

---

## ✨ ¡Listo!

Ahora tienes **Alejardín** desplegado en Netlify, accesible desde cualquier dispositivo, instalable como PWA, y con deploy automático cada vez que hagas cambios.

**Tu URL**: `https://alejardin.netlify.app` (o la que hayas elegido)

**Para Alejandra**: ¡Comparte la URL y que disfrute descubriendo una flor nueva cada día! 🌸💗

---

**Última actualización**: Marzo 2024  
**Versión**: 2.0.0  
**Deploy Platform**: Netlify  
**Autor**: Con mucho amor 💗
