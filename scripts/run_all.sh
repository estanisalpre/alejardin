#!/bin/bash
# Script de generación e integración completa de flores para Alejardín
# Ejecuta todo el flujo de trabajo en un solo comando

echo "🌸 Alejardín - Generador Completo de Flores"
echo "==========================================="
echo ""

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 no está instalado"
    exit 1
fi

# Verificar que estamos en la carpeta correcta
if [ ! -f "generate_flowers.py" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la carpeta scripts/"
    exit 1
fi

echo "✅ Python 3 encontrado: $(python3 --version)"
echo ""

# Paso 1: Generar flores
echo "📝 Paso 1: Generando 315 flores..."
echo ""
python3 generate_flowers.py <<< "1"

if [ $? -ne 0 ]; then
    echo "❌ Error generando flores"
    exit 1
fi

echo ""
echo "✅ Flores generadas exitosamente"
echo ""

# Preguntar al usuario si quiere integrar automáticamente
echo "¿Deseas integrar las flores automáticamente a data/flowers.ts?"
echo "1. Sí, con backup (recomendado)"
echo "2. Sí, sin backup"
echo "3. No, lo haré manualmente"
echo ""
read -p "Elige una opción (1/2/3) [1]: " opcion
opcion=${opcion:-1}

if [ "$opcion" = "1" ] || [ "$opcion" = "2" ]; then
    echo ""
    echo "📝 Paso 2: Integrando flores a data/flowers.ts..."
    echo ""
    
    if [ "$opcion" = "1" ]; then
        python3 integrate_flowers.py <<< "1"
    else
        python3 integrate_flowers.py <<< "2"
    fi
    
    if [ $? -ne 0 ]; then
        echo "❌ Error integrando flores"
        exit 1
    fi
    
    echo ""
    echo "✅ Flores integradas exitosamente"
    echo ""
    
    # Validar resultado
    echo "📝 Paso 3: Validando resultado..."
    echo ""
    python3 validate_flowers.py <<< "5
6"
    
    echo ""
    echo "=========================================="
    echo "🎉 ¡Proceso completado exitosamente!"
    echo "=========================================="
    echo ""
    echo "📌 SIGUIENTES PASOS:"
    echo "   1. Revisa data/flowers.ts"
    echo "   2. cd .."
    echo "   3. npm run dev"
    echo "   4. Abre http://localhost:3000"
    echo ""
    echo "💾 Backup guardado en: data/flowers.ts.backup"
    echo ""
else
    echo ""
    echo "=========================================="
    echo "✅ Flores generadas"
    echo "=========================================="
    echo ""
    echo "📌 SIGUIENTES PASOS (Integración Manual):"
    echo "   1. Abre scripts/flores_generadas.ts"
    echo "   2. Copia todo el contenido"
    echo "   3. Abre data/flowers.ts"
    echo "   4. Pega al final del array (antes de ];)"
    echo "   5. Guarda el archivo"
    echo ""
fi

echo "💝 ¡Disfruta tu Alejardín con 365 flores! 🌸"
echo ""
