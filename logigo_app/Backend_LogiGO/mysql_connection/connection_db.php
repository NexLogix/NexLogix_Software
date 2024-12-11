<?php
function connect() {
    $host = 'localhost';  // Cambia esto si tu servidor de base de datos está en otro lugar
    $dbname = 'logigo_app';  // Nombre de tu base de datos
    $username = 'root';  // Tu usuario de la base de datos
    $password = '12345';  // Tu contraseña de la base de datos (puede estar vacía si usas el usuario root sin contraseña en XAMPP)

    try {
        // Establecer la conexión con la base de datos utilizando PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        // Configurar para que lance excepciones en caso de error
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        // Si hay un error con la conexión, lo mostramos
        echo "Error de conexión: " . $e->getMessage();
        exit;
    }
}
?>
