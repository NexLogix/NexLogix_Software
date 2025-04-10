<?php
namespace App\UseCases\Auth;

use App\Services\Auth\AuthAccountService;
use Illuminate\Support\Facades\Validator;
class AuthAccountUseCase
{
    protected $auth_account_service;

    public function __construct(AuthAccountService $auth_account_service)
    {
        $this->auth_account_service = $auth_account_service;
    }

    public function handleLogin(array $data): array
    {
        $validator = Validator::make($data, [
            'email' => 'required|string|email|max:255',
            'contrasena' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        $credentials = [
            'email' => $data['email'],
            'password' => $data['contrasena'], // Usamos 'password' porque Auth::attempt espera este campo
        ];

        return $this->auth_account_service->login($credentials);
    }

}
