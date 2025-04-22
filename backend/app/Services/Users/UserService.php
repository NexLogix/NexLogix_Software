<?php
namespace App\Services\Users;

use App\Models\Interfaces\Users\IUserService;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserService implements IUserService // Implementa la Imterfaz IUserService
{
    // GET SERVICE
    public function getAllUsers():array
    {
        $user = User::with(['estado', 'roles', 'puestos'])->get();
        // Despues quitamos lo comntado porque ya hay areas creadas
        if(!$user) {
            return [
                'success' => false,
                'message' => 'No hay usuarios agregados',
                'status' => 404
            ];
        }
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
        $user = User::with(['estado', 'roles', 'puestos'])->findOrFail($id);
        if(!$user){
            return [
                'success' => false,
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
        }
        return [
            'success' => true,
            'data' => $user,
            'status' => 200
        ];
    }

    // POST
    public function  createUser(array $data):array
    {
        try {
            $data['contrasena']  = bcrypt($data['contrasena']); // se encripta la contrasena
            $user = User::create($data)->fresh(); // se crea el usuario y fresh es para obligar a la DB a traer todos los metodos de la tabla usuarios
            $token = JWTAuth::fromUser($user); // se da un token por cad ausuarios creado
            return [ // se retorna los datos el usuario que venga del useCase
                'success' => true,
                'message' => 'Usuario creado exitosamente',
                'data'    => $user,
                'token'   => $token,
                'status'  => 201
            ];
        } catch (\Exception $e) {
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
        $user = User::findOrFail($id);
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
        }
        $user->update($data);
        return [
            'success' => true,
            'message' => 'Se ha actualizado toda la informacion general el Usuario correctamente!',
            'data' => $user,
            'status' => 200
        ];
    }

    // PATCH service
    public function updateSpecificFields(int $id, array $data): array
    {
        $user = User::findOrFail($id);
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
        }
        $user->update($data);
        return [
            'success' => true,
            'message' => 'Han sido actualizados los campos especificos del usuario',
            'data' => $user,
            'status' => 200
        ];
    }

    // DELETE service
    public function deleteUser(int $id): array
    {
        $user = User::find($id);
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
        }
        $user->delete();
        return [
            'success' => true,
            'message' => 'Usuario eliminado correctamente',
            'status' => 200
        ];
    }
}
