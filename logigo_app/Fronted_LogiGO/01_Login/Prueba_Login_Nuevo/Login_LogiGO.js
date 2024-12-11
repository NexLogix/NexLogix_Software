$(document).ready(function () {
    // Cuando se envía el formulario
    $(document).on('click', '#Validar_usuario', function () {
        event.preventDefault(); // Evita la recarga de la página al enviar el formulario

        // Obtener los valores de los campos
        var nombre_usuario = $("#nombre_usuario").val();
        var contrasena_usuario = $("#password_usuario").val();

        // Mostrar los datos que se van a enviar (para depuración)
        console.log("Datos enviados al servidor:");
        console.log("Nombre de usuario:", nombre_usuario);
        console.log("Contraseña:", contrasena_usuario);

        // Realizar la llamada AJAX
        $.ajax({
            url: '../../../Backend_LogiGO/login/auth_controller.php', // Ajusta esta URL según tu configuración
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                username: nombre_usuario,
                password: contrasena_usuario
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                try {
                    // Intentar parsear la respuesta como JSON
                    response = typeof response === "string" ? JSON.parse(response) : response;

                    if (response.status === "success") {
                        // Redirigir según el rol del usuario
                        switch (response.role) {
                            case 'Admin':
                                window.location.href = '../../02_Perfil_Admin/admin_perfil/inicio_Admin.html';
                                break;
                            case 'Auxiliar':
                                window.location.href = '/Fronted LogiGO/03_Auxiliar/ui_auxiliar.html';
                                break;
                            case 'Conductor':
                                window.location.href = '../../04_Perfil_conductor/inicio_conductor.html';
                                break;
                            default:
                                alert("Usuario no válido, inexistente o bloqueado.");
                        }
                    } else {
                        alert(response.message || "Credenciales incorrectas.");
                    }
                } catch (error) {
                    console.error("Error procesando la respuesta:", error, response);
                    alert("Hubo un error procesando la respuesta del servidor.");
                }
            },
            error: function (xhr) {
                console.error("Error de conexión:", xhr);
                alert("No se pudo conectar al servidor.");
            }
        });
    });
});
