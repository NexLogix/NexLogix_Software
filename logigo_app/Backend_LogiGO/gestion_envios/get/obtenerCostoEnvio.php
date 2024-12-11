<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
// archivo: obtenerCostoEnvio.php

// Incluir la conexión a la base de datos
include '../logigo_app/Backend_LogiGO/mysql_connection/connection_db.php'; // Asegúrate de tener el archivo con la conexión

// Verificar que la solicitud sea GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener los parámetros enviados por GET
    $ciudad = isset($_GET['ciudad']) ? $_GET['ciudad'] : 'Bogotá'; // Valor por defecto 'Bogotá'
    $pesoProducto = isset($_GET['pesoProducto']) ? floatval($_GET['pesoProducto']) : 1.0; // Valor por defecto 1.0

    // Asegurarse de que el peso sea válido (positivo)
    if ($pesoProducto <= 0) {
        $pesoProducto = 1.0; // Si no es válido, usar un valor por defecto
    }

    // Ejemplo de cálculo de costo de envío (personalizado por ciudad y peso)
    $costoBase = 50.00; // Costo base del envío

    // Sumar un costo adicional según la ciudad
    switch ($ciudad) {
        case 'Bogotá':
            $costoBase += 10000;
            break;
        case 'Medellín':
            $costoBase += 15000;
            break;
        case 'Cali':
            $costoBase += 12000;
            break;
        case 'Barranquilla':
            $costoBase += 18000;
            break;
        case 'Cartagena':
            $costoBase += 20000;
            break;
        case 'Cúcuta':
            $costoBase += 22000;
            break;
        case 'Bucaramanga':
            $costoBase += 17000;
            break;
        case 'Pereira':
            $costoBase += 16000;
            break;
        case 'Santa Marta':
            $costoBase += 19000;
            break;
        case 'Manizales':
            $costoBase += 15000;
            break;
        case 'Ibagué':
            $costoBase += 13000;
            break;
        case 'Neiva':
            $costoBase += 14000;
            break;
        case 'Valledupar':
            $costoBase += 15000;
            break;
        case 'Pasto':
            $costoBase += 17000;
            break;
        case 'Armenia':
            $costoBase += 15000;
            break;
        case 'Popayán':
            $costoBase += 18000;
            break;
        case 'Tunja':
            $costoBase += 13000;
            break;
        case 'Montería':
            $costoBase += 19000;
            break;
        case 'Villavicencio':
            $costoBase += 16000;
            break;
        case 'Quibdó':
            $costoBase += 21000;
            break;
        case 'Riohacha':
            $costoBase += 20000;
            break;
        case 'Leticia':
            $costoBase += 25000;
            break;
        case 'San Andrés':
            $costoBase += 30000;
            break;
        case 'Sincelejo':
            $costoBase += 17000;
            break;
        default:
            $costoBase += 5000; // Costo base adicional para ciudades no específicas
            break;
    }

    // Calcular el costo en base al peso del producto
    $costoPorPeso = $pesoProducto * 5.00; // $5 por cada kilogramo

    // Calcular el costo total
    $costoEnvio = $costoBase + $costoPorPeso;

    // Retornar la respuesta en formato JSON
    echo json_encode(["precioEnvio" => $costoEnvio]);
}
?>
