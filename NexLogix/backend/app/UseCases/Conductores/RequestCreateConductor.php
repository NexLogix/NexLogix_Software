<?php
namespace App\UseCases\Conductores;

use App\Services\Users\UserService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class RequestCreateConductor
{
    public static function VerificarRoleStatus(UserService $userService, int $idUsuario): array
    {
        try {
            $usuario = $userService->getUserById($idUsuario);

            if (!$usuario['success']) {
                return [
                    'success' => false,
                    'message' => 'Usuario no encontrado',
                    'status'  => 404
                ];
            }

            $data = [
                'idRole'     => $usuario['data']['roles']['idRole'] ?? null,
                'nombreRole' => $usuario['data']['roles']['nombreRole'] ?? null,
                'estado'     => $usuario['data']['estado']['estado'] ?? null,
            ];

            if (
                (in_array($data['idRole'], [13]) || in_array($data['nombreRole'], ['Conductor']))
                && $data['estado'] === 'ACTIVO'
            ) {
                return [
                    'success' => true,
                    'message' => 'El usuario tiene el role de conductor y se encuentra activo, se puede crear el conductor',
                    'status'  => 200
                ];
            }

            return [
                'success' => false,
                'message' => 'El usuario no tiene el role de conductor o no está activo, por lo cual no se puede crear el conductor',
                'status'  => 403
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status'  => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al verificar el usuario: ' . $e->getMessage(),
                'status'  => 500
            ];
        }
    }
}