<?php
namespace App\Services\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class AuthAccountService
{
    // LOGIN AUTH
    public function login(array $credentials): array
    {
        try {
            if (!$token = Auth::attempt($credentials)) {
                return [
                    'success' => false,
                    'message' => 'Credenciales incorrectas',
                    'status' => 401
                ];
            }

            $user = Auth::user();

            return [
                'success' => true,
                'message' => 'Inicio de sesión exitoso, ¡bienvenido!',
                'data' => $user,
                'token' => $token,
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
}
