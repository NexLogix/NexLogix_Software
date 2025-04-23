<?php
namespace App\Services\Auth;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class AuthAccountService
{
    // LOGIN AUTH
    public function login(array $credentials): array
    {
        try {
            if (!$token = Auth::attempt($credentials)) { // AUTH viene de JWT, si no tiene token las credeciales, no se puede logear
                return [
                    'success' => false,
                    'message' => 'Credenciales incorrectas',
                    'status' => 401
                ];
            }

            $user = Auth::user(); // usuario autenticado

            return [
                'success' => true,
                'message' => 'Inicio de sesión exitoso, ¡bienvenido!',
                'token' => $token,
                'user' => $user,
                'status' => 200
            ];
        } catch (JWTException $e) {
            return [
                'success' => false,
                'message' => 'No se pudo crear el token',
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
