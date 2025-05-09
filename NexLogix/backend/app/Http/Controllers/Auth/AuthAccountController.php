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
    public function login(Request $request)
    {
        $response = $this->authAccount_UseCase->handleLogin($request->all());
        return response()->json($response, $response['status']);
    }

    // POST method LOGOUT controller from usecase of auth
    public function logout()
    {
        $response = $this->authAccount_Service->logout();
        return response()->json($response, $response['status']);
    }

    // GET http controller from service of AUTH
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
