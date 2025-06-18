<?php
namespace App\Services\Auth;

use App\Models\User;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class AuthAccountService
{
    // LOGIN AUTH
    public function login(array $data_credentials): array
{
    try {
        // Verificar si el email existe
        $user = User::where('email', $data_credentials['email'])->first();

        if (!$user) {
            // Excepción: Usuario no encontrado
            return [
                'success' => false,
                'message' => 'Usuario no encontrado',
                'status' => 405
            ];
        }

        // Verificar si las credenciales son correctas
        if (!$token = Auth::attempt($data_credentials)) {
            // Excepción: Credenciales incorrectas
            return [
                'success' => false,
                'message' => 'Credenciales incorrectas o contraseña inválida',
                'status' => 405
            ];
        }

        $user = Auth::user(); // Usuario autenticado correctamente

        return [
            'success' => true,
            'message' => 'Inicio de sesión exitoso, ¡bienvenido!',
            'user' => $user,
            'token' => $token,
            'status' => 200
        ];

    } catch (JWTException $e) {
        return [
            'success' => false,
            'message' => 'No se pudo crear el token. ' . $e->getMessage(),
            'status' => 500
        ];
    } catch (QueryException $e){
        return [
            'success' => false,
            'message' => 'Error de conexión a la base de datos. Por favor, intente más tarde.',
            'error' => $e->getMessage(),
            'status' => 500
        ];
    }
}

    // AUTH LOGOUT
    public function logout(): array
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return [
                'success' => true,
                'message' => 'Ha salido de la sesión, ¡gracias por estar aquí!',
                'status' => 200
            ];
        } catch (JWTException $e) {
            return [
                'success' => false,
                'message' => 'Error al cerrar sesión',
                'status' => 500
            ];
        }
    }

    // GET PRIFLE VERIFIED
    public function showProfileAuthorized()
    {
        $user = Auth::user();
        $user->load(['estado', 'roles', 'puestos']);
        if (!$user){
            throw new Exception('Peticion no autorizada!', 401);
        }

        return [
            'success'=> true,
            'message'=> 'Bienvenido !',
            'data' => [
                'ID'                        => $user->idusuarios,
                "documentoIdentidad"        => $user->documentoIdentidad,
                "nombreCompleto"            => $user->nombreCompleto,
                "email"                     => $user->email,
                "numContacto"               => $user->numContacto,
                "direccionResidencia"       => $user->direccionResidencia,
                "fechaCreacion"             => $user->fechaCreacion,
                "Role" => [
                    'nombreRole'                 => $user->roles->nombreRole ?? 'no asignado',
                    'descripcionRole'           => $user->roles->descripcionRole ?? ' no asignado',
                    'fechaAsignacionDelRole'  => $user->roles->fechaAsignacionRole ?? ' no asignado'
                ],
                "Puesto" => [
                    "nombrePuesto"  => $user->puestos->nombrePuesto ?? 'no asignado',
                    "descripcionPuesto"  => $user->puestos->descripcionPuesto ?? 'no asignado',
                ]
            ],
        ];
    }

    // REFRESH TOKEN of the authorized user

    public function refreshToken()
    {
        return [ 'token' => Auth::refresh() ];
    }
}
