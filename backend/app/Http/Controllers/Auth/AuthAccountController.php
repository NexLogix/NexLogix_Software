<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\AuthAccountService;
use App\UseCases\Auth\AuthAccountUseCase;
use Illuminate\Http\Request;
use App\UseCases\Auth\AuthUseCase;

class AuthAccountController extends Controller
{
    protected $authAccount_UseCase;
    protected $authAccount_Service;

    public function __construct(AuthAccountUseCase $authAccount_UseCase, AuthAccountService $authAccount_Service)
    {
        $this->authAccount_UseCase = $authAccount_UseCase;
        $this->authAccount_Service = $authAccount_Service;
    }

    public function login(Request $request)
    {
        $response = $this->authAccount_UseCase->handleLogin($request->all());
        return response()->json($response, $response['status']);
    }

    public function logout(Request $request)
    {
        $response = $this->authAccount_Service->logout();
        return response()->json($response, $response['status']);
    }
}
