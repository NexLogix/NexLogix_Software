<?php
// archivo: crearEnvio.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Incluir la conexión a la base de datos
include '../logigo_app/Backend_LogiGO/mysql_connection/connection_db.php'; // Asegúrate de tener el archivo con la conexión

// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del formulario
    $nombreDestinatario = $_POST['nombreDestinatario'];
    $num_Contacto_destinatario = $_POST['num_Contacto_destinatario'];
    $nombreRemitente = $_POST['nombreRemitente'];
    $num_Contacto_remitente = $_POST['num_Contacto_remitente'];
    $fechaRecogida = $_POST['fechaRecogida'];
    $nombreCiudad = $_POST['nombreCiudad']; // Esto debería ser un ID, no el nombre
    $lugarEntrega = $_POST['lugarEntrega'];
    $nombreProducto = $_POST['nombreProducto']; // Esto debería ser un ID
    $pesoProducto = $_POST['pesoProducto'];
    $cantidadProducto = $_POST['cantidadProducto'];
    $descripcionProducto = $_POST['descripcionProducto'];
    $metodo = $_POST['metodo']; // Esto debería ser un ID de metodo de pago

    // Calcular el costo total de envío (esto es un ejemplo, ajusta según lo que necesites)
    $costoEnvio = 100; // Aquí deberías realizar algún cálculo basado en los datos

    // Conectar a la base de datos
    $pdo = connect();

    // Insertar el envío en la base de datos
    $query = "INSERT INTO envios 
              (nombreDestinatario, num_Contacto_destinatario, nombreRemitente, num_Contacto_remitente, 
               fechaRecogida, nombreCiudad, lugarEntrega, nombreProducto, pesoProducto, cantidadProducto, 
               descripcionProducto, metodo, costo_Total_Envio)
              VALUES 
              (:nombreDestinatario, :num_Contacto_destinatario, :nombreRemitente, :num_Contacto_remitente, 
               :fechaRecogida, :nombreCiudad, :lugarEntrega, :nombreProducto, :pesoProducto, :cantidadProducto, 
               :descripcionProducto, :metodo, :costoEnvio)";

    $stmt = $pdo->prepare($query);
    
    // Ejecutar la consulta
    $stmt->execute([
        ':nombreDestinatario' => $nombreDestinatario,
        ':num_Contacto_destinatario' => $num_Contacto_destinatario,
        ':nombreRemitente' => $nombreRemitente,
        ':num_Contacto_remitente' => $num_Contacto_remitente,
        ':fechaRecogida' => $fechaRecogida,
        ':nombreCiudad' => $nombreCiudad,
        ':lugarEntrega' => $lugarEntrega,
        ':nombreProducto' => $nombreProducto,
        ':pesoProducto' => $pesoProducto,
        ':cantidadProducto' => $cantidadProducto,
        ':descripcionProducto' => $descripcionProducto,
        ':metodo' => $metodo,
        ':costoEnvio' => $costoEnvio
    ]);

    echo json_encode(["status" => "success", "message" => "Envío creado exitosamente."]);
}
?>
