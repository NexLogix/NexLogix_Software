<?php
namespace App\Services\Users;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserService
{
    // GET SERVICE
    public function getAllPuestos():array
    {
        $user = User::all();
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
            'data' => $user,
            'status' => 200
        ];
    }

    // GET BY ID SERVICE
    public function getUserById(int $id):array
    {
        $user = User::find($id);
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
}
