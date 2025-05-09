<?php
/*
    Este Service es la capa que se encarga de manejar toda la comunicación entre la entidad User y la base de datos,
    ya sea para crear, obtener, actualizar o eliminar un usuario.

    NOTA:
    Explicacion detallada de las variables hacia abajo ;)
*/
namespace App\Services\Users;

use App\Models\Interfaces\Users\IUserService; // Se importa la interfaz que obliga a implementar los métodos definidos
use App\Models\User; // Se importa el modelo User, que representa la tabla 'users' en la base de datos
use Tymon\JWTAuth\Facades\JWTAuth; // Librería JWT para generar el token de autenticación tras crear un usuario

// Aqui Implementamos la interfaz IUserService definida para estandarizar el servicio, siguiendo los principios de las inyecciones de dependecias y la arquitectura de Inyerfaces como contratos
class UserService implements IUserService
{
    // GET SERVICE
    public function getAllUsers():array
    {
        // Se obtiene la lista de todos los usuarios, incluyendo las relaciones con estado, roles y puestos
        $user = User::with(['estado', 'roles', 'puestos'])->get();

        // Si no hay usuarios en la base de datos, se retorna error 404
        if(!$user) {
            return [
                'success' => false,
                'message' => 'No hay usuarios agregados',
                'status' => 404
            ];
        }

        // Si existen usuarios, se devuelve la colección con status 200
        return [
            'success' => true,
            'message' => 'Lista de empleados',
            'data' => $user,
            'status' => 200
        ];
    }

    // GET BY ID SERVICE
    public function getUserById(int $id):array
    {
        // Busca un usuario específico por su ID y carga sus relaciones con estado, roles y puestos
        $user = User::with(['estado', 'roles', 'puestos'])->findOrFail($id);

        // Si no se encuentra el usuario, devuelve 404
        if(!$user){
            return [
                'success' => false,
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
        }

        // Si existe, devuelve los datos del usuario
        return [
            'success' => true,
            'data' => $user,
            'status' => 200
        ];
    }

    // POST SERVICE
    public function  createUser(array $data):array
    {
        try {
            // Antes de guardar la contraseña, se cifra usando bcrypt
            $data['contrasena']  = bcrypt($data['contrasena']);

            // Se crea el usuario y con fresh() se recargan sus relaciones y atributos
            $user = User::create($data)->fresh();

            // Se genera un token JWT para autenticación basado en ese nuevo usuario
            $token = JWTAuth::fromUser($user);

            // Se retorna mensaje de éxito, datos del usuario y el token generado
            return [
                'success' => true,
                'message' => 'Usuario creado exitosamente',
                'data'    => $user,
                'token'   => $token,
                'status'  => 201
            ];
        } catch (\Exception $e) {
            // En caso de excepción (error en base de datos, campos inválidos, etc.), se retorna error 500
            return [
                'success' => false,
                'message' => 'Error al crear el usuario',
                'error'   => $e->getMessage(),
                'status'  => 500
            ];
        }
    }

    // PUT SERVICE
    public function updatePuesto(int $id, array $data): array
    {
        // Busca el usuario por ID para actualizar todos sus campos
        $user = User::findOrFail($id);

        // Si no existe el usuario, se retorna error 404
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
        }

        // Se actualizan todos los campos pasados en el arreglo $data
        $user->update($data);

        // Se devuelve el usuario actualizado
        return [
            'success' => true,
            'message' => 'Se ha actualizado toda la informacion general el Usuario correctamente!',
            'data' => $user,
            'status' => 200
        ];
    }

    // PATCH SERVICE
    public function updateSpecificFields(int $id, array $data): array
    {
        // Busca el usuario por ID para aplicar cambios parciales
        $user = User::findOrFail($id);

        // Si no se encuentra, se retorna error 404
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
        }

        // Se actualizan solo los campos específicos que se envían en el array $data
        $user->update($data);

        // Retorna mensaje de éxito con los campos actualizados
        return [
            'success' => true,
            'message' => 'Han sido actualizados los campos especificos del usuario',
            'data' => $user,
            'status' => 200
        ];
    }

    // DELETE SERVICE
    public function deleteUser(int $id): array
    {
        // Busca al usuario por su ID
        $user = User::find($id);

        // Si no lo encuentra, retorna error 404
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
        }

        // Si existe, se elimina el registro
        $user->delete();

        // Devuelve mensaje de confirmación
        return [
            'success' => true,
            'message' => 'Usuario eliminado correctamente',
            'status' => 200
        ];
    }
}

/*
───────────────────────────────────────────────────────
    ACLARACIONES DE VARIABLES Y COMPONENTES:
───────────────────────────────────────────────────────

- $id: valor entero que representa el ID del usuario a buscar, actualizar o eliminar. Es clave primaria.
- $user: instancia del modelo User, representa a un registro de usuario de la base de datos.
- $data: array asociativo que contiene los campos del usuario que se van a crear o actualizar, viene de la capa de use case.
         Ejemplo: ['nombre' => 'Juan', 'email' => 'correo@example.com', ...]
- En cada return siempre ponemos 'success' => true o false, para manefar estados

- use App\Models\User: se importa el modelo User, necesario para ejecutar consultas Eloquent en la tabla users.
- use JWTAuth: se usa para generar tokens JWT y permitir la autenticación basada en token.
- use IUserService: se importa la interfaz que define la estructura que esta clase debe implementar.

Este Service forma parte de la capa de acceso a datos. No contiene reglas de negocio, maneja las solicitudes puras hacia la base de datos,
ya que la validacion, las reglas de negocio y los filtros los manejará en la capa de UseCase, que se comunica directamente con este Service.
*/
