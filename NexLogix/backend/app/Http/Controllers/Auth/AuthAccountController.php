<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\AuthAccountService;
use App\UseCases\Auth\AuthAccountUseCase;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthAccountController extends Controller
{
    protected $authAccount_UseCase;
    protected $authAccount_Service;

    public function __construct(AuthAccountUseCase $authAccount_UseCase, AuthAccountService $authAccount_Service)
    {
        $this->authAccount_UseCase = $authAccount_UseCase;
        $this->authAccount_Service = $authAccount_Service;
    }

    // POST method LOGIN controller from usecase of Auth
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Iniciar sesión",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "contrasena"},
     *             @OA\Property(property="email", type="string", example="usuario@ejemplo.com"),
     *             @OA\Property(property="contrasena", type="string", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login exitoso, devuelve el token"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciales inválidas"
     *     )
     * )
     */
    public function login(Request $request)
    {
        $response = $this->authAccount_UseCase->handleLogin($request->all());
        return response()->json($response, $response['status']);
    }

    // POST method LOGOUT controller from usecase of auth
    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Cerrar sesión",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logout exitoso"
     *     )
     * )
     */
    public function logout()
    {
        $response = $this->authAccount_Service->logout();
        return response()->json($response, $response['status']);
    }

    // GET http controller from service of AUTH
    /**
     * @OA\Get(
     *     path="/api/auth/mostrar_perfil_auth",
     *     summary="Obtener perfil autenticado",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil del usuario autenticado"
     *     )
     * )
     */
    public function getProfile():JsonResponse
    {
       try {
            $authUser = $this->authAccount_Service->showProfileAuthorized();
            return response()->json($authUser, 200);
       } catch (\Exception $e) {
            return response()->json([
                'error'=> $e->getMessage(),
            ], $e->getCode() ?: 401);
       }
    }

    // REFRESH TOKEN mettod POST
    /**
     * @OA\Post(
     *     path="/api/auth/refresh_token",
     *     summary="Refrescar token JWT",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Token refrescado exitosamente"
     *     )
     * )
     */
    public function refreshToken():JsonResponse
    {
        try {
            $refreshedToken = $this->authAccount_Service->refreshToken();
            return response()->json($refreshedToken, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 500);
        }
    }
}
