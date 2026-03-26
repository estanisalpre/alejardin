# 🚀 INICIO RÁPIDO

## Para completar Alejardín a 365 flores en 2 minutos

### Opción 1: Script automático (MÁS FÁCIL)

```bash
cd scripts
./run_all.sh
```

### Opción 2: Paso a paso

```bash
cd scripts

# Generar
python3 generate_flowers.py
# → Presiona Enter (opción 1)

# Integrar
python3 integrate_flowers.py
# → Presiona Enter (opción 1)

# Validar
python3 validate_flowers.py
# → Presiona 5, luego 6
```

### Opción 3: Manual

```bash
cd scripts
python3 generate_flowers.py
# → Elige opción 1
# → Abre flores_generadas.ts
# → Copia todo
# → Pega en data/flowers.ts (antes de ];)
```

## Probar la app

```bash
cd ..
npm run dev
```

Abre: http://localhost:3000

## ¿Problemas?

```bash
# Si "python no encontrado"
python3 generate_flowers.py

# Si algo sale mal
cd scripts
python3 validate_flowers.py
# → Opción 3 para verificar
```

## Restaurar backup (si es necesario)

```bash
cp data/flowers.ts.backup data/flowers.ts
```

---

💝 ¡Disfruta tu Alejardín completo! 🌸
