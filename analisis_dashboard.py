import pandas as pd
import json
import os
import traceback

def generar_datos_dashboard():
    try:
        # Rutas de los archivos
        dir_actual = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(dir_actual, 'Data_Caso_Propuesto.csv')
        json_path = os.path.join(dir_actual, 'dashboard_data.json')

        # Verificar si el archivo existe
        if not os.path.exists(csv_path):
            print(f"Error: No se encontró el archivo {csv_path}")
            return False

        # Leer el CSV
        print("Leyendo dataset...")
        # Ignorar errores de tipo si hay celdas extrañas, se fuerza el tipo luego
        df = pd.read_csv(csv_path, dtype={'Precio': str})

        # Limpieza básica
        # Limpiar la columna de precio (quitar posibles caracteres o espacios) y convertir a numérico
        df['Precio'] = pd.to_numeric(df['Precio'].astype(str).str.replace(r'[^\d.]', '', regex=True), errors='coerce')
        
        # Eliminar filas donde el precio sea NaN
        df = df.dropna(subset=['Precio'])

        # Rellenar valores nulos en texto
        df['Departamento'] = df['Departamento'].fillna('DESCONOCIDO').str.upper()
        df['Ciudad'] = df['Ciudad'].fillna('DESCONOCIDO').str.upper()
        df['Estrato'] = df['Estrato'].fillna('DESCONOCIDO').str.upper()
        df['Tipo de Inmueble'] = df['Tipo de Inmueble'].fillna('OTRO').str.upper()

        print(f"Dataset cargado con {len(df)} registros válidos.")

        # 1. Total Inmuebles
        total_inmuebles = int(len(df))

        # 2. Precio Promedio
        precio_promedio = float(df['Precio'].mean())

        # 3. Ciudad con más ofertas
        ciudad_top = df['Ciudad'].value_counts().idxmax()
        ciudad_top_count = int(df['Ciudad'].value_counts().max())

        # 4. Inmuebles por Departamento (Top 10)
        dept_counts = df['Departamento'].value_counts().head(10)
        grafico_departamentos = {
            "labels": dept_counts.index.tolist(),
            "values": dept_counts.values.tolist()
        }

        # 5. Distribución por Tipo de Inmueble
        tipo_counts = df['Tipo de Inmueble'].value_counts()
        grafico_tipos = {
            "labels": tipo_counts.index.tolist(),
            "values": tipo_counts.values.tolist()
        }

        # 6. Distribución por Estrato (Cantidad)
        estrato_counts = df['Estrato'].value_counts()
        grafico_estratos = {
            "labels": estrato_counts.index.tolist(),
            "values": estrato_counts.values.tolist()
        }

        # Empaquetar todo en un diccionario
        datos_dashboard = {
            "kpis": {
                "total_inmuebles": total_inmuebles,
                "precio_promedio": precio_promedio,
                "ciudad_top": ciudad_top,
                "ciudad_top_count": ciudad_top_count
            },
            "graficos": {
                "departamentos": grafico_departamentos,
                "tipos_inmueble": grafico_tipos,
                "estratos": grafico_estratos
            }
        }

        # Exportar a JSON
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(datos_dashboard, f, ensure_ascii=False, indent=4)
        
        print(f"Éxito: Datos exportados a {json_path}")
        return True

    except Exception as e:
        print(f"Error al procesar los datos: {str(e)}")
        traceback.print_exc()
        return False

if __name__ == "__main__":
    generar_datos_dashboard()
