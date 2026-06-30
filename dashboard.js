// Variables globales de gráficos para poder destruirlos al actualizar
let chartDepts, chartTipos, chartEstratos;

// Configuración global de Chart.js para temas oscuros
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();

    document.getElementById('btn-refresh').addEventListener('click', () => {
        const btn = document.getElementById('btn-refresh');
        btn.innerHTML = '<span class="btn-icon">⏳</span> Generando...';
        btn.style.opacity = '0.7';
        
        cargarDatos(true).then(() => {
            btn.innerHTML = '<span class="btn-icon">🔄</span> Actualizar Datos';
            btn.style.opacity = '1';
        });
    });
});

async function cargarDatos(forzarRefresh = false) {
    try {
        const url = forzarRefresh ? 'api.php?refresh=1' : 'api.php';
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            console.error(data.error);
            alert(data.error);
            return;
        }

        actualizarKPIs(data.kpis);
        renderizarGraficos(data.graficos);

    } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al conectar con la API de PHP. Revisa la consola.");
    }
}

function actualizarKPIs(kpis) {
    // Formateador de moneda
    const formateadorMoneda = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });

    // Animar contadores o simplemente asignar
    document.getElementById('kpi-total').textContent = kpis.total_inmuebles;
    document.getElementById('kpi-precio').textContent = formateadorMoneda.format(kpis.precio_promedio);
    document.getElementById('kpi-ciudad').textContent = kpis.ciudad_top;
    document.getElementById('kpi-ciudad-count').textContent = `${kpis.ciudad_top_count} inmuebles disponibles`;
}

function renderizarGraficos(graficos) {
    // Colores base estilo neón / dashboard
    const coloresBarras = [
        'rgba(59, 130, 246, 0.8)', // Blue
        'rgba(139, 92, 246, 0.8)', // Purple
        'rgba(16, 185, 129, 0.8)', // Green
        'rgba(236, 72, 153, 0.8)', // Pink
        'rgba(245, 158, 11, 0.8)', // Amber
        'rgba(14, 165, 233, 0.8)', // Sky
        'rgba(244, 63, 94, 0.8)',  // Rose
        'rgba(20, 184, 166, 0.8)'  // Teal
    ];
    
    // 1. Gráfico de Departamentos (Barras)
    const ctxDept = document.getElementById('chartDepartamentos').getContext('2d');
    if(chartDepts) chartDepts.destroy();
    
    chartDepts = new Chart(ctxDept, {
        type: 'bar',
        data: {
            labels: graficos.departamentos.labels,
            datasets: [{
                label: 'Cantidad de Inmuebles',
                data: graficos.departamentos.values,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { maxRotation: 45, minRotation: 45 }
                }
            }
        }
    });

    // 2. Gráfico de Tipos de Inmueble (Doughnut)
    const ctxTipos = document.getElementById('chartTipos').getContext('2d');
    if(chartTipos) chartTipos.destroy();
    
    chartTipos = new Chart(ctxTipos, {
        type: 'doughnut',
        data: {
            labels: graficos.tipos_inmueble.labels,
            datasets: [{
                data: graficos.tipos_inmueble.values,
                backgroundColor: coloresBarras,
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // 3. Gráfico de Estratos (Pie)
    const ctxEstratos = document.getElementById('chartEstratos').getContext('2d');
    if(chartEstratos) chartEstratos.destroy();
    
    chartEstratos = new Chart(ctxEstratos, {
        type: 'pie',
        data: {
            labels: graficos.estratos.labels,
            datasets: [{
                data: graficos.estratos.values,
                backgroundColor: coloresBarras.slice(2).concat(coloresBarras.slice(0, 2)), // rotar colores
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}
