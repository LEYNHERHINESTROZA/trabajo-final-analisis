<?php
/**
 * API para el Dashboard Analítico
 * Lee el archivo dashboard_data.json generado por Python y lo sirve al Frontend.
 */

// Configuración de cabeceras para permitir CORS y devolver JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$json_file = __DIR__ . '/dashboard_data.json';
$python_script = __DIR__ . '/analisis_dashboard.py';

// Si se recibe el parámetro ?refresh=1, se ejecuta el script de Python
if (isset($_GET['refresh']) && $_GET['refresh'] == '1') {
    // Ejecutar python (ajustar 'python' o 'python3' según el entorno)
    // Usamos shell_exec para capturar salida si se necesita
    $command = escapeshellcmd("python \"$python_script\"");
    $output = shell_exec($command);
    
    // Esperar a que el archivo se actualice
    sleep(1);
}

// Verificar si el archivo JSON existe
if (file_exists($json_file)) {
    // Leer el archivo
    $json_data = file_get_contents($json_file);
    
    // Devolver los datos
    echo $json_data;
} else {
    // Devolver error si no existe
    http_response_code(404);
    echo json_encode(array(
        "error" => "No se encontraron los datos del dashboard. Por favor, ejecuta analisis_dashboard.py primero."
    ));
}
?>
