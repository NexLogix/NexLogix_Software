<?php
// Configuración de cabeceras CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require '../mysql_connection/connection_db.php'; // Asegúrate de que la ruta es correcta

class AuthController {
    // Método para manejar el login
    public function login($email, $password) {
        $pdo = connect(); // Aseguramos que se obtiene la conexión correctamente
        
        // Consulta SQL para verificar el usuario
        $sql = "SELECT u.emailUsuario, u.contrasenaUsuario, r.nombreRole, u.idEstado
                FROM usuarios u 
                JOIN usuario_con_roles ur ON u.idUsuarios = ur.idUsuarios 
                JOIN roles r ON ur.idRoles = r.idRoles 
                WHERE u.emailUsuario = ?";
        
        // Preparar y ejecutar la consulta
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        // Log para verificar los datos recibidos
        file_put_contents('php://stderr', "Datos recibidos: email = {$email}, password = {$password}\n");

        // Verificar si el usuario existe y comparar la contraseña
        if ($user && $password === $user['contrasenaUsuario'] && $user['idEstado'] == 1) {
            session_start();
            $_SESSION['role'] = $user['nombreRole']; // Guardamos el rol en la sesión

            // Log de usuario encontrado
            file_put_contents('php://stderr', "Usuario encontrado: " . json_encode($user) . "\n");

            // Enviar la respuesta en formato JSON
            echo json_encode([
                'status' => 'success',
                'role' => $user['nombreRole']
            ]);
        } else {
            // Si las credenciales son incorrectas o el usuario está bloqueado
            echo json_encode([
                'status' => 'error',
                'message' => 'Credenciales incorrectas o usuario bloqueado.'
            ]);
        }
    }
}

// Instanciamos el controlador y procesamos la petición POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($email) || empty($password)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Debe proporcionar un correo y una contraseña.'
        ]);
        exit;
    }

    $authController = new AuthController();
    $authController->login($email, $password);

    error_log("Recibiendo datos: " . json_encode($_POST)); // Para ver los datos recibidos

}
?>
