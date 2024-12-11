<?php
// Configuración de cabeceras CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require './mysql_connection/connection_db.php'; // Asegúrate de que la ruta es correcta

class RegisterController {
    public function register($email, $password, $fullName, $role) {
        $pdo = connect(); // Aseguramos que se obtiene la conexión correctamente
        
        // Verificar si el correo ya existe en la base de datos
        $sqlCheckEmail = "SELECT COUNT(*) FROM usuarios WHERE emailUsuario = ?";
        $stmt = $pdo->prepare($sqlCheckEmail);
        $stmt->execute([$email]);
        $emailExists = $stmt->fetchColumn();

        if ($emailExists > 0) {
            echo json_encode([
                'status' => 'error',
                'message' => 'El correo electrónico ya está registrado.'
            ]);
            return;
        }

        // Encriptar la contraseña
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        

        // Enviar la respuesta en formato JSON
        echo json_encode([
            'status' => 'success',
            'message' => 'Usuario registrado exitosamente.'
        ]);
    }
}

// Instanciamos el controlador y procesamos la petición POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $fullName = trim($_POST['full_name'] ?? '');
    $role = trim($_POST['role'] ?? ''); // Asignar un rol, por ejemplo 'Admin'

    if (empty($email) || empty($password) || empty($fullName) || empty($role)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Debe proporcionar todos los datos (correo, contraseña, nombre y rol).'
        ]);
        exit;
    }

    $registerController = new RegisterController();
    $registerController->register($email, $password, $fullName, $role);
}
?>
