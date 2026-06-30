# 📊 Dashboard Analítico Inmobiliario

**Trabajo Final - Curso Análisis de Datos en Python**  
Proyecto que consolida los conocimientos de análisis de datos con Python (Pandas) presentándolos mediante un Dashboard Web moderno e interactivo (Glassmorphism), integrando backend y frontend.

---

## ✨ Características del Proyecto

- **Motor de Datos (Python + Pandas)**: Lee y depura el dataset `Data_Caso_Propuesto.csv`, agrupando la información clave del sector inmobiliario (cantidad de ofertas, precio promedio, estratos y tipos de inmuebles).
- **API Intermediaria (PHP)**: Permite servir los datos estructurados en JSON y ejecutar bajo demanda el script de Python.
- **Frontend Interactivo (Vanilla JS + Chart.js)**: Renderizado de datos asíncronos (`fetch`) con tarjetas de KPIs y gráficos.
- **UI/UX Moderna (CSS3)**: Interfaz en *Dark Mode* con estilo *Glassmorphism* (efecto cristal translúcido), responsivo y elegante.

---

## 🗂️ Estructura de Archivos

```
trabajo-final-analisis/
├── analisis_dashboard.py      # Script principal de Python (Pandas)
├── api.php                    # Endpoint API que expone los datos
├── dashboard.html             # Interfaz de usuario principal
├── dashboard.css              # Sistema de diseño y estilos visuales
├── dashboard.js               # Lógica de cliente y Chart.js
├── Data_Caso_Propuesto.csv    # Dataset original
├── dashboard_data.json        # Output procesado por Python
└── ... (otros archivos y entregables)
```

---

## 🚀 Requisitos e Instalación

### Requisitos Previos
- **Servidor Web Local**: XAMPP (Apache).
- **Python 3.8+** con la librería `pandas` instalada (`pip install pandas`).

### Instalación Local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/LEYNHERHINESTROZA/trabajo-final-analisis.git
   ```
2. Mueve la carpeta al directorio público de tu servidor web (ej. `C:/xampp/htdocs/`).
3. (Opcional) Ejecuta manualmente el archivo python para asegurar la creación del JSON inicial:
   ```bash
   python analisis_dashboard.py
   ```
4. Abre la vista web desde tu navegador:
   ```
   http://localhost/trabajo-final-analisis/dashboard.html
   ```

---

## 🛠️ Stack Tecnológico

*   **Procesamiento de Datos:** Python 3, Pandas.
*   **Backend:** PHP 8+.
*   **Frontend:** HTML5, CSS3, JavaScript ES6.
*   **Librería Gráfica:** Chart.js.

---

## 👨‍💻 Autor

**Leynher Ferney Hinestroza Mosquera**
*Desarrollador Fullstack & Analista de Datos*
- 💼 [LinkedIn](https://linkedin.com) (En construcción)
- 🐙 [GitHub](https://github.com/LEYNHERHINESTROZA)
- 📧 Email: leynercrs@gmail.com

---

## 📄 Licencia
Proyecto formativo creado para el curso de Análisis de Datos. Todos los derechos reservados.
